"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function ProfileSection() {
    const { currentUser } = useAuth();
    const [isSaving, setIsSaving] = useState(false);

    if (!currentUser) return null;

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-700">
            <header className="mb-10">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">অ্যাডমিন প্রোফাইল</h2>
                <p className="text-slate-500 font-medium">আপনার পার্সোনাল ইনফরমেশন এবং সিকিউরিটি সেটিংস পরিবর্তন করুন।</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <Card className="lg:col-span-1 p-10 border-none shadow-2xl shadow-slate-200/60 rounded-[3rem] bg-white text-center">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-linear-to-br from-slate-800 to-slate-950 flex items-center justify-center text-5xl font-black text-white mb-6 mx-auto shadow-2xl shadow-slate-900/20">
                        {currentUser.name[0]}
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-1">{currentUser.name}</h3>
                    <p className="text-sm font-bold text-slate-400 mb-6">{currentUser.email}</p>
                    <Badge variant="success" className="px-6 py-2 rounded-xl font-black tracking-widest uppercase text-xs">
                        System Administrator
                    </Badge>

                    <div className="mt-10 pt-10 border-t border-slate-50 text-left space-y-4">
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Access Level</span>
                            <span className="text-xs font-black text-emerald-600 uppercase">Tier 1</span>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</span>
                            <span className="text-xs font-black text-blue-600 uppercase">Verified</span>
                        </div>
                    </div>
                </Card>

                <Card className="lg:col-span-2 p-10 border-none shadow-2xl shadow-slate-200/60 rounded-[3rem] bg-white">
                    <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                        <span className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">🔐</span>
                        নিরাপত্তা এবং পাসওয়ার্ড
                    </h3>

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block px-2">বর্তমান পাসওয়ার্ড</label>
                                <input
                                    type="password"
                                    className="w-full h-14 px-6 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-blue-500 fill-blue-500 outline-none transition-all font-bold"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block px-2">নতুন পাসওয়ার্ড</label>
                                <input
                                    type="password"
                                    className="w-full h-14 px-6 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-blue-500 outline-none transition-all font-bold"
                                    placeholder="নতুন পাসওয়ার্ড দিন"
                                />
                            </div>
                        </div>

                        <div className="pt-6">
                            <Button
                                type="button"
                                disabled={isSaving}
                                className="h-14 px-10 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest shadow-xl shadow-slate-900/10"
                            >
                                আপডেট পাসওয়ার্ড
                            </Button>
                        </div>
                    </form>

                    <div className="mt-12 p-8 bg-amber-50 rounded-[2.5rem] border border-amber-100 flex gap-6 items-start">
                        <div className="text-4xl">🛡️</div>
                        <div>
                            <h4 className="font-black text-amber-900 mb-1">টু-ফ্যাক্টর অথেন্টিকেশন</h4>
                            <p className="text-sm text-amber-700 font-medium leading-relaxed">আপনার অ্যাকাউন্ট আরো সুরক্ষিত রাখতে টু-ফ্যাক্টর অথেন্টিকেশন (2FA) চালু করুন। এটি শীঘ্রই যুক্ত করা হবে।</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
