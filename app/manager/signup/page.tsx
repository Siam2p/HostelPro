import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { ManagerSignupForm } from '@/components/auth/ManagerSignupForm';

export const metadata: Metadata = {
    title: 'ম্যানেজার রেজিস্ট্রেশন | হোস্টেলপ্রো',
    description: 'আপনার হোস্টেল ব্যবসা শুরু করুন হোস্টেলপ্রো-র সাথে। আজই ম্যানেজার হিসেবে সাইন আপ করুন।',
};

export default function ManagerSignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="max-w-md w-full space-y-8 p-10 bg-white shadow-xl rounded-2xl border-t-4 border-blue-600">
                <div className="text-center">
                    <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
                        ম্যানেজার রেজিস্ট্রেশন
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        আপনার হোস্টেল ব্যবসা শুরু করুন
                    </p>
                </div>

                <ManagerSignupForm />

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
                        <Link href="/manager/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                            লগইন করুন
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
}
