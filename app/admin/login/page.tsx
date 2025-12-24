import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { AdminLoginForm } from '@/components/auth/AdminLoginForm';

export const metadata: Metadata = {
    title: 'অ্যাডমিন প্যানেল | হোস্টেলপ্রো',
    description: 'সিস্টেম ম্যানেজ করতে অ্যাডমিন প্যানেলে লগইন করুন।',
    robots: 'noindex, nofollow', // Admin panel should not be indexed
};

export default function AdminLoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="max-w-md w-full space-y-8 p-10 bg-white shadow-xl rounded-2xl border-t-4 border-gray-800">
                <div className="text-center">
                    <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
                        অ্যাডমিন প্যানেল
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        সিস্টেম ম্যানেজ করতে লগইন করুন
                    </p>
                </div>

                <AdminLoginForm />

                <div className="mt-6 text-center text-sm">
                    <Link href="/login" className="text-gray-400 hover:text-gray-600 transition-colors">
                        ← ওয়েবসাইটে ফিরে যান
                    </Link>
                </div>
            </Card>
        </div>
    );
}
