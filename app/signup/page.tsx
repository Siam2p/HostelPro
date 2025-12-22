"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function UserSignupPage() {
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Prototype logic: Login as user
        login('user');
        router.push('/profile');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="max-w-md w-full space-y-8 p-10 bg-white shadow-xl rounded-2xl">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        সাইন আপ
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        হোস্টেলপ্রো-তে স্বাগতম! আপনার অ্যাকাউন্ট তৈরি করুন।
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="আপনার নাম"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="ইমেইল অ্যাড্রেস"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="পাসওয়ার্ড"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                            <input
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                required
                                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="পাসওয়ার্ড নিশ্চিত করুন"
                            />
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            fullWidth
                            className="bg-primary hover:bg-primary-dark"
                        >
                            অ্যাকাউন্ট তৈরি করুন
                        </Button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
                        <Link href="/login" className="font-medium text-primary hover:text-primary-dark">
                            লগইন করুন
                        </Link>
                    </p>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                    <Link href="/manager/signup" className="text-sm text-gray-500 hover:text-primary transition-colors">
                        ম্যানেজার হিসেবে সাইন আপ করুন
                    </Link>
                </div>
            </Card>
        </div>
    );
}
