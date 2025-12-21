"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = (role: 'user' | 'manager' | 'admin') => {
        login(role);
        if (role === 'admin') router.push('/admin');
        else if (role === 'manager') router.push('/manager');
        else router.push('/');
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-primary to-secondary text-white p-12 text-center">
                <h1 className="text-4xl font-extrabold mb-4 animate-fade-in">স্বাগতম!</h1>
                <p className="text-lg opacity-90">হোস্টেলপ্রো-র সাথে আপনার পরবর্তী ঠিকানা খুঁজুন।</p>
            </div>

            <div className="flex items-center justify-center p-8 bg-bg-body">
                <Card className="w-full max-w-md border-none shadow-none bg-transparent md:bg-white md:shadow-md md:border">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-primary">লগইন</h2>
                        <p className="text-text-muted">লগইন সিমুলেট করতে একটি রোল নির্বাচন করুন</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Button onClick={() => handleLogin('user')} fullWidth>
                            ব্যবহারকারী / ছাত্র
                        </Button>
                        <Button onClick={() => handleLogin('manager')} variant="outline" fullWidth>
                            হোস্টেল ম্যানেজার
                        </Button>
                        <Button onClick={() => handleLogin('admin')} variant="outline" fullWidth className="border-text-main text-text-main hover:border-black hover:text-black">
                            সুপার অ্যাডমিন
                        </Button>
                    </div>

                    <div className="mt-6 text-center text-sm text-text-muted">
                        <Button variant="ghost" onClick={() => router.push('/')} className="underline">
                            নিড় পাতায় ফিরে যান
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
