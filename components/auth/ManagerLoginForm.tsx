"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { AuthInput } from '@/components/ui/AuthInput';

export const ManagerLoginForm: React.FC = () => {
    const { login } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Prototype logic: Login as manager
        login('manager');
        router.push('/manager');
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
                <AuthInput
                    id="email"
                    label="ম্যানেজার ইমেইল"
                    type="email"
                    autoComplete="email"
                    placeholder="ম্যানেজার ইমেইল"
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
                    iconColor="text-blue-400"
                />
            </div>

            <div className="flex justify-end">
                <div className="text-sm text-right">
                    <Link href="/manager/forgot-password" title="পাসওয়ার্ড ভুলে গেছেন" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                        পাসওয়ার্ড ভুলে গেছেন?
                    </Link>
                </div>
            </div>

            <div>
                <Button
                    type="submit"
                    fullWidth
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all active:scale-[0.98] py-3 font-medium rounded-lg"
                >
                    ড্যাশবোর্ডে প্রবেশ করুন
                </Button>
            </div>
        </form>
    );
};
