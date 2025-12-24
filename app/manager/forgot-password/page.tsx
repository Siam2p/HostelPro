import React from 'react';
import { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';

export const metadata: Metadata = {
    title: 'ম্যানেজার পাসওয়ার্ড রিসেট | হোস্টেলপ্রো',
    description: 'আপনার হোস্টেল ম্যানেজার অ্যাকাউন্টের পাসওয়ার্ড রিসেট করুন।',
};

export default function ManagerForgotPasswordPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="max-w-md w-full space-y-8 p-10 bg-white shadow-xl rounded-2xl">
                <div className="text-center">
                    <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
                        পাসওয়ার্ড রিসেট
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        হোস্টেল ম্যানেজার অ্যাকাউন্ট
                    </p>
                </div>

                <ForgotPasswordForm userType="manager" backLink="/manager/login" />
            </Card>
        </div>
    );
}
