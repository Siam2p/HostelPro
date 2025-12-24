"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { AuthInput } from '@/components/ui/AuthInput';

export const LoginForm: React.FC = () => {
    const { login } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Prototype logic: Directly login as user
        login('user');
        router.push('/profile');
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm space-y-4">
                <AuthInput
                    id="email-address"
                    label="ইমেইল অ্যাড্রেস"
                    type="email"
                    autoComplete="email"
                    placeholder="ইমেইল অ্যাড্রেস"
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
                />
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 cursor-pointer">
                        মনে রাখুন
                    </label>
                </div>

                <div className="text-sm">
                    <Link href="/forgot-password" title="পাসওয়ার্ড ভুলে গেছেন" className="font-medium text-primary hover:text-primary-dark transition-colors">
                        পাসওয়ার্ড ভুলে গেছেন?
                    </Link>
                </div>
            </div>

            <div>
                <Button
                    type="submit"
                    fullWidth
                    className="group relative flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg transition-all active:scale-[0.98]"
                >
                    লগইন করুন
                </Button>
            </div>
        </form>
    );
};
