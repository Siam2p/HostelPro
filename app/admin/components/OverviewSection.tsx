"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import { useData } from '@/context/DataContext';

export default function OverviewSection() {
    const { users, hostels, bookings } = useData();

    const stats = [
        { label: 'মোট ব্যবহারকারী', value: users.length, icon: '👥', color: 'bg-primary-light', trend: '+12%' },
        { label: 'মোট হোস্টেল', value: hostels.length, icon: '🏨', color: 'bg-primary', trend: '+3%' },
        { label: 'সক্রিয় বুকিং', value: bookings.filter(b => b.status === 'approved').length, icon: '📅', color: 'bg-primary', trend: '+8%' },
        { label: 'বকেয়া পেমেন্ট', value: '৫', icon: '💰', color: 'bg-rose-500', trend: '-2%' },
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-10">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">সিস্টেম ওভারভিউ</h2>
                <p className="text-slate-500 font-medium">আজকের সিস্টেম স্ট্যাটাস এবং অ্যাক্টিভিটি চেক করুন।</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, idx) => (
                    <Card key={idx} className="p-6 border-none shadow-xl shadow-slate-200/50 rounded-4xl bg-white relative overflow-hidden group">
                        <div className={`absolute top-0 right-0 w-24 h-24 ${stat.color} opacity-5 rounded-bl-[4rem] transition-transform duration-500 group-hover:scale-110`}></div>
                        <div className="flex justify-between items-start mb-4">
                            <div className={`${stat.color} p-4 rounded-2xl text-white text-2xl shadow-lg ${stat.color === 'bg-primary-light' ? 'shadow-primary-light/20' : 'shadow-primary/20'}`}>
                                {stat.icon}
                            </div>
                            <span className={`text-xs font-black px-2 py-1 rounded-lg ${stat.trend.startsWith('+') ? 'bg-bg-subtle text-primary' : 'bg-rose-50 text-rose-600'}`}>
                                {stat.trend}
                            </span>
                        </div>
                        <div>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 p-8 border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] bg-white">
                    <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                        <span className="h-6 w-1.5 bg-primary-dip rounded-full"></span>
                        সাম্প্রতিক নিবন্ধন
                    </h3>
                    <div className="space-y-4">
                        {users.slice(-5).reverse().map((user) => (
                            <div key={user.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100/50 hover:bg-white hover:shadow-lg transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-bg-highlight flex items-center justify-center text-primary-dip font-black text-lg">
                                        {user.name[0]}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">{user.name}</p>
                                        <p className="text-xs text-slate-500 font-medium">{user.email}</p>
                                    </div>
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-600' :
                                    user.role === 'manager' ? 'bg-amber-100 text-amber-600' : 'bg-slate-200 text-slate-600'
                                    }`}>
                                    {user.role}
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-8 border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary-dip blur-[80px] opacity-20 -mr-24 -mt-24"></div>
                    <h3 className="text-xl font-black mb-6 relative z-10">সিস্টেম টিপস</h3>
                    <div className="space-y-6 relative z-10">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                            <p className="text-sm font-bold text-blue-400 mb-2">নিরাপত্তা সতর্কতা</p>
                            <p className="text-xs text-slate-300 leading-relaxed font-medium">সিস্টেমের নিরাপত্তা বজায় রাখতে নিয়মিত অ্যাডমিন পাসওয়ার্ড পরিবর্তন করুন এবং লগ খতিয়ান চেক করুন।</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                            <p className="text-sm font-bold text-emerald-400 mb-2">হোস্টেল অনুমোদন</p>
                            <p className="text-xs text-slate-300 leading-relaxed font-medium">নতুন হোস্টেল নিবন্ধিত হলে বিস্তারিত তথ্য যাচাই করে তবেই অনুমোদন দিন।</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
