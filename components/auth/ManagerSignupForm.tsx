"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { AuthInput } from '@/components/ui/AuthInput';
import { isValidBangladeshiPhone, isSecurePassword } from '@/lib/validation';

export const ManagerSignupForm: React.FC = () => {
    const { login } = useAuth();
    const router = useRouter();
    const [name, setName] = useState('');
    const [hostelName, setHostelName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!name.trim()) newErrors.name = 'আপনার নাম লিখুন';
        if (!hostelName.trim()) newErrors.hostelName = 'হোস্টেলের নাম লিখুন';

        if (!isValidBangladeshiPhone(phone)) {
            newErrors.phone = 'সঠিক বাংলাদেশী মোবাইল নাম্বার দিন (যেমন: 01XXXXXXXXX)';
        }

        if (!email.includes('@')) {
            newErrors.email = 'সঠিক ইমেইল অ্যাড্রেস দিন';
        }

        const passwordCheck = isSecurePassword(password);
        if (!passwordCheck.isValid) {
            newErrors.password = passwordCheck.message || 'পাসওয়ার্ড আরও শক্তিশালী করুন';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setIsLoading(true);
        // Prototype logic: Login as manager
        await new Promise(resolve => setTimeout(resolve, 1000));
        login('manager');
        router.push('/manager');
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
                <AuthInput
                    id="hostelName"
                    label="হোস্টেলের নাম"
                    placeholder="e.g. রূপসী বাংলা হোস্টেল"
                    required
                    value={hostelName}
                    onChange={(e) => {
                        setHostelName(e.target.value);
                        if (errors.hostelName) setErrors({ ...errors, hostelName: '' });
                    }}
                    error={errors.hostelName}
                />
                <AuthInput
                    id="phone"
                    label="মোবাইল নাম্বার"
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
                    iconColor="text-blue-400"
                />
            </div>

            <div className="pt-2">
                <Button
                    type="submit"
                    fullWidth
                    disabled={isLoading}
                    className="bg-primaryDip hover:bg-blue-700 text-white shadow-lg transition-all active:scale-[0.98] py-3 font-medium rounded-lg"
                >
                    {isLoading ? 'প্রসেস করা হচ্ছে...' : 'রেজিস্ট্রেশন করুন'}
                </Button>
            </div>
        </form>
    );
};
