"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { AuthInput } from '@/components/ui/AuthInput';
import { isValidBangladeshiPhone, isSecurePassword } from '@/lib/validation';

export const SignupForm: React.FC = () => {
    const { login } = useAuth();
    const router = useRouter();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isSameContact, setIsSameContact] = useState(true);
    const [contactPhone, setContactPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!name.trim()) newErrors.name = 'আপনার নাম লিখুন';

        if (!isValidBangladeshiPhone(phone)) {
            newErrors.phone = 'সঠিক বাংলাদেশী মোবাইল নাম্বার দিন (যেমন: 01XXXXXXXXX)';
        }

        if (!isSameContact && !isValidBangladeshiPhone(contactPhone)) {
            newErrors.contactPhone = 'সঠিক যোগাযোগ নাম্বার দিন (যেমন: 01XXXXXXXXX)';
        }

        if (!email.includes('@')) {
            newErrors.email = 'সঠিক ইমেইল অ্যাড্রেস দিন';
        }

        const passwordCheck = isSecurePassword(password);
        if (!passwordCheck.isValid) {
            newErrors.password = passwordCheck.message || 'পাসওয়ার্ড আরও শক্তিশালী করুন';
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'পাসওয়ার্ড দুটি মিলেনি';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setIsLoading(true);
        // Prototype logic: Login as user
        await new Promise(resolve => setTimeout(resolve, 1000));
        login('user');
        router.push('/profile');
        setIsLoading(false); // Ensure loading state is reset
    };

    return (
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
                <AuthInput
                    id="name"
                    label="আপনার নাম"
                    placeholder="e.g. আবরার আহমেদ"
                    required
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    error={errors.name}
                />

                <div className="space-y-2">
                    <AuthInput
                        id="phone"
                        label="মোবাইল নাম্বার (অ্যাকাউন্ট ভেরিফিকেশন)"
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        required
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value);
                            if (errors.phone) setErrors({ ...errors, phone: '' });
                        }}
                        error={errors.phone}
                    />
                    <div className="flex items-center gap-2 px-1">
                        <input
                            type="checkbox"
                            id="same-contact"
                            checked={isSameContact}
                            onChange={(e) => {
                                setIsSameContact(e.target.checked);
                                if (e.target.checked) setErrors({ ...errors, contactPhone: '' });
                            }}
                            className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary cursor-pointer"
                        />
                        <label htmlFor="same-contact" className="text-xs text-gray-600 cursor-pointer select-none">
                            এই নাম্বারটিই যোগাযোগের জন্য ব্যবহার করুন
                        </label>
                    </div>
                </div>

                {!isSameContact && (
                    <AuthInput
                        id="contact-phone"
                        label="যোগাযোগের জন্য বিকল্প নাম্বার"
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        required
                        value={contactPhone}
                        onChange={(e) => {
                            setContactPhone(e.target.value);
                            if (errors.contactPhone) setErrors({ ...errors, contactPhone: '' });
                        }}
                        error={errors.contactPhone}
                        className="animate-in fade-in slide-in-from-top-1 duration-200"
                    />
                )}

                <AuthInput
                    id="email"
                    label="ইমেইল"
                    type="email"
                    placeholder="example@email.com"
                    required
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    error={errors.email}
                />
                <AuthInput
                    id="password"
                    label="পাসওয়ার্ড"
                    type="password"
                    title="কমপক্ষে ৮ অক্ষর হতে হবে"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors({ ...errors, password: '' });
                    }}
                    error={errors.password}
                />
                <AuthInput
                    id="confirm-password"
                    label="পাসওয়ার্ড নিশ্চিত করুন"
                    type="password"
                    title="পাসওয়ার্ড নিশ্চিত করুন"
                    placeholder="••••••••"
                    required
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                    }}
                    error={errors.confirmPassword}
                />
            </div>

            <div className="pt-2">
                <Button
                    type="submit"
                    fullWidth
                    disabled={isLoading}
                    className="group relative flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg transition-all active:scale-[0.98]"
                >
                    {isLoading ? 'প্রসেস করা হচ্ছে...' : 'সাইন আপ করুন'}
                </Button>
            </div>
        </form>
    );
};

