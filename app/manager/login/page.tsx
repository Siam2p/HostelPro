import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { ManagerLoginForm } from '@/components/auth/ManagerLoginForm';
import { ClientRouterButton } from '@/components/ui/ClientRouterButton';

export const metadata: Metadata = {
    title: 'ম্যানেজার লগইন | হোস্টেলপ্রো',
    description: 'আপনার হোস্টেল ম্যানেজড করতে ম্যানেজার অ্যাকাউন্টে লগইন করুন।',
};

export default function ManagerLoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-subtle py-12 px-4 sm:px-3 lg:px-8">
            <Card className="max-w-md w-full space-y-8 p-10 bg-white shadow-xl rounded-2xl border-t-4 border-primary-dip">
                <div className="text-center">
                    <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
                        ম্যানেজার লগইন
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        আপনার হোস্টেল ম্যানেজড করতে লগইন করুন
                    </p>
                </div>

                <ManagerLoginForm />

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
                        <ClientRouterButton
                            variant="outline"
                            href="/manager/signup"
                            fullWidth
                            className="border-emerald-200 hover:bg-emerald-50 text-emerald-700"
                        >
                            নতুন ম্যানেজার একাউন্ট খুলুন
                        </ClientRouterButton>
                    </div>
                </div>

                <div className="mt-6 text-center text-sm">
                    <Link href="/login" className="text-gray-500 hover:text-primary-dip transition-colors">
                        ← ব্যবহারকারী লগইন-এ ফিরে যান
                    </Link>
                </div>
            </Card>
        </div>
    );
}
