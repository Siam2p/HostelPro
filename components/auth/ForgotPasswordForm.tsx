"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { AuthInput } from '@/components/ui/AuthInput';
import { CheckCircle2, ArrowLeft, Timer, RefreshCw } from 'lucide-react';
import { isSecurePassword } from '@/lib/validation';

type Step = 'EMAIL' | 'OTP' | 'RESET' | 'SUCCESS';

interface ForgotPasswordFormProps {
    userType: 'user' | 'manager';
    backLink: string;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ userType, backLink }) => {
    const [step, setStep] = useState<Step>('EMAIL');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
    const [isTimerActive, setIsTimerActive] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isTimerActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isTimerActive, timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        if (!email.includes('@')) {
            setErrors({ email: 'সঠিক ইমেইল অ্যাড্রেস দিন' });
            return;
        }

        setIsLoading(true);
        // Simulate sending OTP
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStep('OTP');
        setTimeLeft(180);
        setIsTimerActive(true);
        setIsLoading(false);
    };

    const resendOtp = () => {
        setTimeLeft(180);
        setIsTimerActive(true);
        setOtp('');
        setErrors({});
        // Simulate resending
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        if (timeLeft === 0) {
            setErrors({ otp: 'OTP কোডের মেয়াদ শেষ হয়ে গেছে। আবার চেষ্টা করুন।' });
            return;
        }

        setIsLoading(true);
        // Simulate OTP verification
        if (otp === '123456') { // Mock OTP for prototype
            await new Promise(resolve => setTimeout(resolve, 1000));
            setStep('RESET');
            setIsTimerActive(false);
        } else {
            setErrors({ otp: 'সঠিক OTP কোড দিন (ডিমো কোড: 123456)' });
        }
        setIsLoading(false);
    };

    const handleResetSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

        const passwordCheck = isSecurePassword(newPassword);
        if (!passwordCheck.isValid) {
            newErrors.newPassword = passwordCheck.message || 'পাসওয়ার্ড আরও শক্তিশালী করুন';
        }

        if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = 'পাসওয়ার্ড দুটি মিলেনি';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        // Simulate password update
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStep('SUCCESS');
        setIsLoading(false);
    };

    if (step === 'SUCCESS') {
        return (
            <div className="text-center space-y-6 py-4">
                <div className="flex justify-center">
                    <div className="p-4 rounded-full bg-green-50 text-green-500 animate-bounce">
                        <CheckCircle2 size={56} />
                    </div>
                </div>
                <div className="space-y-2">
                    <h3 className="text-2xl font-black text-gray-900">পাসওয়ার্ড পরিবর্তন হয়েছে!</h3>
                    <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                        আপনার পাসওয়ার্ড সফলভাবে আপডেট করা হয়েছে। এখন আপনি নতুন পাসওয়ার্ড দিয়ে লগইন করুন।
                    </p>
                </div>
                <div className="pt-6">
                    <Link href={backLink}>
                        <Button fullWidth className="py-4 text-lg font-bold">
                            লগইন করুন
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-8">
            {step === 'EMAIL' && (
                <form className="space-y-6" onSubmit={handleEmailSubmit}>
                    <div className="space-y-4">
                        <p className="text-gray-600 text-sm leading-relaxed text-center">
                            আপনার অ্যাকাউন্টের ইমেইল দিন। আমরা আপনাকে একটি OTP কোড পাঠাবো।
                        </p>
                        <AuthInput
                            id="email"
                            label="ইমেইল অ্যাড্রেস"
                            type="email"
                            placeholder="example@gmail.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={errors.email}
                        />
                    </div>
                    <Button type="submit" fullWidth disabled={isLoading} className={`${userType === 'manager' ? 'bg-primary-dip hover:bg-primary-hover' : ''} py-3 shadow-lg active:scale-[0.98] transition-all`}>
                        {isLoading ? 'পাঠানো হচ্ছে...' : 'OTP কোড পাঠান'}
                    </Button>
                </form>
            )}

            {step === 'OTP' && (
                <form className="space-y-6" onSubmit={handleOtpSubmit}>
                    <div className="space-y-4">
                        <div className="text-center space-y-2">
                            <p className="text-gray-600 text-sm leading-relaxed">
                                আপনার Gmail এ পাঠানো ৬ ডিজিটের OTP কোডটি লিখুন।
                            </p>
                            <p className="text-xs font-mono text-gray-400">Sent to: {email}</p>

                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold ${timeLeft < 30 ? 'bg-red-50 text-red-500' : 'bg-bg-subtle text-primary-dip'}`}>
                                <Timer size={14} />
                                {formatTime(timeLeft)}
                            </div>
                        </div>
                        <AuthInput
                            id="otp"
                            label="OTP কোড"
                            type="text"
                            placeholder="123456"
                            maxLength={6}
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            error={errors.otp}
                        />
                    </div>
                    <Button type="submit" fullWidth disabled={isLoading || (timeLeft === 0 && otp === '')} className={`${userType === 'manager' ? 'bg-primary-dip hover:bg-primary-hover' : ''} py-3 shadow-lg active:scale-[0.98] transition-all`}>
                        {isLoading ? 'ভেরিফাই করা হচ্ছে...' : 'ভেরিফাই করুন'}
                    </Button>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={resendOtp}
                            disabled={isTimerActive && timeLeft > 0}
                            className={`inline-flex items-center gap-2 text-sm font-bold ${isTimerActive && timeLeft > 0 ? 'text-gray-300 cursor-not-allowed' : 'text-primary hover:text-primary-dark transition-colors'}`}
                        >
                            <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
                            কোড পাননি? আবার পাঠান
                        </button>
                    </div>
                </form>
            )}

            {step === 'RESET' && (
                <form className="space-y-6" onSubmit={handleResetSubmit}>
                    <div className="space-y-4">
                        <p className="text-gray-600 text-sm leading-relaxed text-center font-bold">
                            নতুন পাসওয়ার্ড সেট করুন
                        </p>
                        <AuthInput
                            id="new-password"
                            label="নতুন পাসওয়ার্ড"
                            type="password"
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            error={errors.newPassword}
                        />
                        <AuthInput
                            id="confirm-password"
                            label="পাসওয়ার্ড নিশ্চিত করুন"
                            type="password"
                            placeholder="পাসওয়ার্ড আবার লিখুন"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={errors.confirmPassword}
                        />
                    </div>
                    <Button type="submit" fullWidth disabled={isLoading} className={`${userType === 'manager' ? 'bg-primary-dip hover:bg-primary-hover' : ''} py-3 shadow-lg active:scale-[0.98] transition-all`}>
                        {isLoading ? 'আপডেট হচ্ছে...' : 'পাসওয়ার্ড সেট করুন'}
                    </Button>
                </form>
            )}

            <div className="mt-8 pt-4 border-t border-gray-100 text-center">
                <Link href={backLink} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors font-medium">
                    <ArrowLeft size={16} />
                    লগইন পেজে ফিরে যান
                </Link>
            </div>
        </div>
    );
};
