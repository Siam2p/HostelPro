import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { SignupForm } from '@/components/auth/SignupForm';

export const metadata: Metadata = {
    title: 'সাইন আপ | হোস্টেলপ্রো',
    description: 'হোস্টেলপ্রো-তে আজই সাইন আপ করুন এবং আপনার জন্য সেরা হোস্টেল খুঁজে নিন।',
};

export default function UserSignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="max-w-md w-full space-y-8 p-10 bg-white shadow-xl rounded-2xl">
                <div className="text-center">
                    <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
                        সাইন আপ
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        হোস্টেলপ্রো-তে স্বাগতম! আপনার অ্যাকাউন্ট তৈরি করুন।
                    </p>
                </div>

                <SignupForm />

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
                        <Link href="/login" className="font-medium text-primary hover:text-primary-dark transition-colors">
                            লগইন করুন
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
}
