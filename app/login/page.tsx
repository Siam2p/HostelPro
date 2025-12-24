import { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { LoginForm } from '@/components/auth/LoginForm';
import { ClientRouterButton } from '@/components/ui/ClientRouterButton';

export const metadata: Metadata = {
    title: 'লগইন | হোস্টেলপ্রো',
    description: 'আপনার হোস্টেলপ্রো অ্যাকাউন্টে লগইন করুন এবং আপনার বুকিং বা হোস্টেল ম্যানেজ করুন।',
};

export default function UserLoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="max-w-md w-full space-y-8 p-10 bg-white shadow-xl rounded-2xl">
                <div className="text-center">
                    <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
                        লগইন
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        ছাত্র/ব্যাচেলর হিসেবে লগইন করুন
                    </p>
                </div>

                <LoginForm />

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
                            href="/signup"
                            fullWidth
                        >
                            নতুন একাউন্ট তৈরি করুন
                        </ClientRouterButton>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-2 text-center text-sm">
                    <Link href="/manager/login" className="text-gray-500 hover:text-primary transition-colors">
                        হোস্টেল ম্যানেজার লগইন
                    </Link>
                    <Link href="/admin/login" className="text-gray-500 hover:text-primary transition-colors">
                        অ্যাডমিন লগইন
                    </Link>
                </div>
            </Card>
        </div>
    );
}
