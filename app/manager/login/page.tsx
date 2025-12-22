"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ManagerLoginPage() {
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Prototype logic: Login as manager
        login('manager');
        router.push('/manager');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="max-w-md w-full space-y-8 p-10 bg-white shadow-xl rounded-2xl border-t-4 border-blue-600">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        ম্যানেজার লগইন
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        আপনার হোস্টেল ম্যানেজড করতে লগইন করুন
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">Manager Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="ম্যানেজার ইমেইল"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="পাসওয়ার্ড"
                            />
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            fullWidth
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            ড্যাশবোর্ডে প্রবেশ করুন
                        </Button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                                অথবা
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-3">
                        <Button
                            variant="outline"
                            onClick={() => router.push('/manager/signup')}
                            fullWidth
                        >
                            নতুন ম্যানেজার একাউন্ট খুলুন
                        </Button>
                    </div>
                </div>

                <div className="mt-6 text-center text-sm">
                    <Link href="/login" className="text-gray-500 hover:text-blue-600">
                        ← ব্যবহারকারী লগইন-এ ফিরে যান
                    </Link>
                </div>
            </Card>
        </div>
    );
}
