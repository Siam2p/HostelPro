"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function AdminLoginPage() {
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Prototype logic: Login as admin
        login('admin');
        router.push('/admin');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="max-w-md w-full space-y-8 p-10 bg-white shadow-xl rounded-2xl border-t-4 border-gray-800">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        অ্যাডমিন প্যানেল
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        সিস্টেম ম্যানেজ করতে লগইন করুন
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">Admin Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-800 focus:border-gray-800 focus:z-10 sm:text-sm"
                                placeholder="অ্যাডমিন ইমেইল"
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
                                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-800 focus:border-gray-800 focus:z-10 sm:text-sm"
                                placeholder="পাসওয়ার্ড"
                            />
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            fullWidth
                            className="bg-gray-800 hover:bg-black text-white"
                        >
                            সিস্টেমে প্রবেশ করুন
                        </Button>
                    </div>
                </form>

                <div className="mt-6 text-center text-sm">
                    <Link href="/login" className="text-gray-400 hover:text-gray-600">
                        ← ওয়েবসাইটে ফিরে যান
                    </Link>
                </div>
            </Card>
        </div>
    );
}
