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
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!isValidBangladeshiPhone(phone)) {
            setError('সঠিক বাংলাদেশী মোবাইল নাম্বার দিন (যেমন: 01XXXXXXXXX)');
            return;
        }

        const passwordCheck = isSecurePassword(password);
        if (!passwordCheck.isValid) {
            setError(passwordCheck.message || 'পাসওয়ার্ড আরও শক্তিশালী করুন');
            return;
        }

        // Prototype logic: Login as manager
        login('manager');
        router.push('/manager');
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
                    id="hostelName"
                    label="হোস্টেলের নাম"
                    placeholder="e.g. রূপসী বাংলা হোস্টেল"
                    value={hostelName}
                    onChange={(e) => setHostelName(e.target.value)}
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
                    iconColor="text-blue-400"
                />
            </div>

            <div className="pt-2">
                <Button
                    type="submit"
                    fullWidth
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all active:scale-[0.98] py-3 font-medium rounded-lg"
                >
                    রেজিস্ট্রেশন করুন
                </Button>
            </div>
        </form>
    );
};
