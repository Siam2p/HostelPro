"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AuthInput } from '@/components/ui/AuthInput';
import { User } from '@/lib/types';

export default function ProfileSection() {
    const { currentUser, updateCurrentUser } = useAuth();
    const { updateUser } = useData();
    const [currentP, setCurrentP] = useState('');
    const [newP, setNewP] = useState('');
    const [confirmP, setConfirmP] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    if (!currentUser) return null;

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!currentP || !newP || !confirmP) {
            setError('সব ঘর পূরণ করা প্রয়োজন');
            return;
        }

        if (currentP !== currentUser.password) {
            setError('বর্তমান পাসওয়ার্ডটি সঠিক নয়');
            return;
        }

        if (newP !== confirmP) {
            setError('নতুন পাসওয়ার্ডগুলো মিলছে না');
            return;
        }

        if (newP.length < 3) {
            setError('পাসওয়ার্ড অন্তত ৩ অক্ষরের হতে হবে');
            return;
        }

        setIsSaving(true);
        try {
            const updatedUser: User = {
                ...currentUser,
                password: newP
            };

            updateUser(updatedUser);
            if (updateCurrentUser) {
                updateCurrentUser(updatedUser);
            }

            setSuccess('পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে!');
            setCurrentP('');
            setNewP('');
            setConfirmP('');
        } catch (err) {
            setError('পাসওয়ার্ড পরিবর্তন করতে সমস্যা হয়েছে');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <span className="p-2 bg-blue-100 rounded-xl text-blue-600">👤</span>
                ম্যানেজার প্রোফাইল
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="md:col-span-1">
                    <Card className="p-8 text-center rounded-3xl shadow-sm border-gray-100 flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-linear-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-lg shadow-blue-200">
                            {currentUser.name[0]}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{currentUser.name}</h3>
                        <p className="text-sm text-gray-500 mb-4">{currentUser.email}</p>
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
                            Hostel Manager
                        </div>
                    </Card>
                </div>

                {/* Password Change Form */}
                <div className="md:col-span-2">
                    <Card className="p-8 rounded-3xl shadow-sm border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                            পাসওয়ার্ড পরিবর্তন করুন
                        </h3>

                        <form onSubmit={handleChangePassword} className="space-y-4">
                            {error && (
                                <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl flex items-center gap-3 text-sm animate-in fade-in duration-300">
                                    <span className="text-lg">⚠️</span>
                                    <span className="font-medium">{error}</span>
                                </div>
                            )}
                            {success && (
                                <div className="p-4 bg-green-50 border border-green-100 text-green-700 rounded-2xl flex items-center gap-3 text-sm animate-in fade-in duration-300">
                                    <span className="text-lg">✅</span>
                                    <span className="font-medium">{success}</span>
                                </div>
                            )}

                            <AuthInput
                                label="বর্তমান পাসওয়ার্ড"
                                id="current-p"
                                type="password"
                                value={currentP}
                                onChange={(e) => setCurrentP(e.target.value)}
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <AuthInput
                                    label="নতুন পাসওয়ার্ড"
                                    id="new-p"
                                    type="password"
                                    value={newP}
                                    onChange={(e) => setNewP(e.target.value)}
                                />
                                <AuthInput
                                    label="পাসওয়ার্ড নিশ্চিত করুন"
                                    id="confirm-p"
                                    type="password"
                                    value={confirmP}
                                    onChange={(e) => setConfirmP(e.target.value)}
                                />
                            </div>

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    disabled={isSaving}
                                    className="w-full sm:w-auto px-10 h-12 rounded-2xl font-bold shadow-lg shadow-blue-100"
                                >
                                    {isSaving ? 'আপডেট হচ্ছে...' : 'পাসওয়ার্ড আপডেট করুন'}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
}
