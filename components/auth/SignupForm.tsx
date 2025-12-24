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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Phone Validation
        if (!isValidBangladeshiPhone(phone)) {
            setError('সঠিক বাংলাদেশী মোবাইল নাম্বার দিন (যেমন: 01XXXXXXXXX)');
            return;
        }

        // Password Validation
        const passwordCheck = isSecurePassword(password);
        if (!passwordCheck.isValid) {
            setError(passwordCheck.message || 'পাসওয়ার্ড আরও শক্তিশালী করুন');
            return;
        }

        if (password !== confirmPassword) {
            setError('পাসওয়ার্ড দুটি মিলেনি');
            return;
        }

        // Prototype logic: Login as user
        login('user');
        router.push('/profile');
    };

    return (
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md animate-shake">
                    <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
            )}

            <div className="rounded-md shadow-sm space-y-4">
                <AuthInput
                    id="name"
                    label="আপনার নাম"
                    placeholder="e.g. আবরার আহমেদ"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <AuthInput
                    id="phone"
                    label="মোবাইল নাম্বার"
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <AuthInput
                    id="email"
                    label="ইমেইল"
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <AuthInput
                    id="password"
                    label="পাসওয়ার্ড"
                    type="password"
                    title="কমপক্ষে ৮ অক্ষর হতে হবে"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <AuthInput
                    id="confirm-password"
                    label="পাসওয়ার্ড নিশ্চিত করুন"
                    type="password"
                    title="পাসওয়ার্ড নিশ্চিত করুন"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            <div className="pt-2">
                <Button
                    type="submit"
                    fullWidth
                    className="group relative flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg transition-all active:scale-[0.98]"
                >
                    সাইন আপ করুন
                </Button>
            </div>
        </form>
    );
};
