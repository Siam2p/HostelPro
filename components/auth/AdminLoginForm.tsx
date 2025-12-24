"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { AuthInput } from '@/components/ui/AuthInput';

export const AdminLoginForm: React.FC = () => {
    const { login } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Prototype logic: Login as admin
        login('admin');
        router.push('/admin');
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
                <AuthInput
                    id="email"
                    label="অ্যাডমিন ইমেইল"
                    type="email"
                    autoComplete="email"
                    placeholder="অ্যাডমিন ইমেইল"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <AuthInput
                    id="password"
                    label="পাসওয়ার্ড"
                    type="password"
                    autoComplete="current-password"
                    placeholder="পাসওয়ার্ড"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    iconColor="text-gray-800"
                />
            </div>

            <div>
                <Button
                    type="submit"
                    fullWidth
                    className="bg-gray-800 hover:bg-black text-white shadow-lg transition-all active:scale-[0.98] py-3 font-medium rounded-lg"
                >
                    সিস্টেমে প্রবেশ করুন
                </Button>
            </div>
        </form>
    );
};
