"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function AdminDashboard() {
    const { currentUser } = useAuth();
    const { hostels, bookings, users } = useData(); // Note: users is mocked in DataContext static
    const router = useRouter();

    if (!currentUser || currentUser.role !== 'admin') {
        if (typeof window !== 'undefined') router.push('/login');
        return null;
    }

    // Stats
    const totalUsers = 3; // Mock static count or from context
    const totalHostels = hostels.length;
    const totalBookings = bookings.length;

    return (
        <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row gap-8">
            {/* Sidebar Mock */}
            <div className="w-full lg:w-64 flex-shrink-0">
                <div className="bg-slate-900 text-white rounded-xl p-6 h-full min-h-[500px]">
                    <h2 className="text-2xl font-bold mb-8">হোস্টেল<span className="text-primary">অ্যাডমিন</span></h2>
                    <nav className="flex flex-col gap-4">
                        <div className="p-3 bg-primary rounded-lg font-bold">ওভারভিউ</div>
                        <div className="p-3 hover:bg-slate-800 rounded-lg text-gray-400 cursor-pointer">ব্যবহারকারী</div>
                        <div className="p-3 hover:bg-slate-800 rounded-lg text-gray-400 cursor-pointer">হোস্টেলসমূহ</div>
                        <div className="p-3 hover:bg-slate-800 rounded-lg text-gray-400 cursor-pointer mt-auto">সেটিংস</div>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow">
                <h1 className="text-3xl font-bold mb-8">সিস্টেম ওভারভিউ</h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="border-l-4 border-l-primary flex items-center p-6">
                        <div className="rounded-full bg-blue-100 p-4 mr-4 text-primary font-bold text-xl">👥</div>
                        <div>
                            <p className="text-text-muted text-sm uppercase font-bold">মোট ব্যবহারকারী</p>
                            <p className="text-3xl font-bold">{totalUsers}</p>
                        </div>
                    </Card>
                    <Card className="border-l-4 border-l-success flex items-center p-6">
                        <div className="rounded-full bg-green-100 p-4 mr-4 text-success font-bold text-xl">🏨</div>
                        <div>
                            <p className="text-text-muted text-sm uppercase font-bold">মোট হোস্টেল</p>
                            <p className="text-3xl font-bold">{totalHostels}</p>
                        </div>
                    </Card>
                    <Card className="border-l-4 border-l-warning flex items-center p-6">
                        <div className="rounded-full bg-yellow-100 p-4 mr-4 text-warning font-bold text-xl">📅</div>
                        <div>
                            <p className="text-text-muted text-sm uppercase font-bold">বুকিংসমূহ</p>
                            <p className="text-3xl font-bold">{totalBookings}</p>
                        </div>
                    </Card>
                </div>

                {/* Recent Users Table */}
                <Card>
                    <h2 className="text-xl font-bold mb-4">সাম্প্রতিক ব্যবহারকারী</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="p-4 font-bold text-text-muted">ID</th>
                                    <th className="p-4 font-bold text-text-muted">নাম</th>
                                    <th className="p-4 font-bold text-text-muted">ইমেইল</th>
                                    <th className="p-4 font-bold text-text-muted">রোল</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Mock Users from Context (actually initialData.users) */}
                                {/* Since we don't expose users in DataContext yet, I'll mock render or update Context. 
                    Actually, DataContext persistence logic saved users but didn't expose them in value.
                    I'll implement a static list for now or assume DataContext needs update.
                    For prototype speed, I'll just render a few static rows matching data.ts
                */}
                                <tr className="border-b border-border">
                                    <td className="p-4 text-text-muted">#1</td>
                                    <td className="p-4 font-bold">Alice Student</td>
                                    <td className="p-4">user@test.com</td>
                                    <td className="p-4"><Badge variant="default">user</Badge></td>
                                </tr>
                                <tr className="border-b border-border">
                                    <td className="p-4 text-text-muted">#2</td>
                                    <td className="p-4 font-bold">Bob Manager</td>
                                    <td className="p-4">manager@test.com</td>
                                    <td className="p-4"><Badge variant="default">manager</Badge></td>
                                </tr>
                                <tr className="border-b border-border">
                                    <td className="p-4 text-text-muted">#3</td>
                                    <td className="p-4 font-bold">Super Admin</td>
                                    <td className="p-4">admin@test.com</td>
                                    <td className="p-4"><Badge variant="success">admin</Badge></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
}
