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
    const totalUsers = users.length;
    const totalHostels = hostels.length;
    const totalBookings = bookings.length;

    return (
        <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row gap-8 pb-24 lg:pb-12">
            {/* Mobile Bottom Navigation */}
            <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 px-6 py-3 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <button className="flex flex-col items-center gap-1 text-primary">
                    <span className="text-xl">📊</span>
                    <span className="text-[10px] font-medium">Overview</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-gray-400">
                    <span className="text-xl">👥</span>
                    <span className="text-[10px] font-medium">Users</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-gray-400">
                    <span className="text-xl">🏨</span>
                    <span className="text-[10px] font-medium">Hostels</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-gray-400">
                    <span className="text-xl">⚙️</span>
                    <span className="text-[10px] font-medium">Settings</span>
                </button>
            </div>

            {/* Sidebar Mock */}
            <div className="w-full lg:w-64 shrink-0 hidden lg:block">
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
            <div className="grow">
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
                    <Card className="border-l-4 border-l-warning flex items-center p-4 sm:p-6">
                        <div className="rounded-full bg-yellow-100 p-4 mr-4 text-warning font-bold text-xl">📅</div>
                        <div>
                            <p className="text-text-muted text-sm uppercase font-bold">বুকিংসমূহ</p>
                            <p className="text-3xl font-bold">{totalBookings}</p>
                        </div>
                    </Card>
                </div>

                {/* Recent Users Table */}
                <Card>
                    <h2 className="text-xl font-bold mb-4">নিবন্ধিত ব্যবহারকারী</h2>
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
                                {users.map(user => (
                                    <tr key={user.id} className="border-b border-border hover:bg-gray-50">
                                        <td className="p-4 text-text-muted">#{user.id}</td>
                                        <td className="p-4 font-bold">{user.name}</td>
                                        <td className="p-4">{user.email}</td>
                                        <td className="p-4">
                                            <Badge variant={
                                                user.role === 'admin' ? 'success' :
                                                    user.role === 'manager' ? 'warning' : 'default'
                                            }>
                                                {user.role}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
}
