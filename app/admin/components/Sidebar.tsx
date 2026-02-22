"use client";

import React from 'react';
import { AdminDashboardView } from '@/lib/types';

interface SidebarProps {
    activeView: AdminDashboardView;
    setActiveView: (view: AdminDashboardView) => void;
}

export default function Sidebar({ activeView, setActiveView }: SidebarProps) {
    const menuItems: { id: AdminDashboardView; label: string; icon: string }[] = [
        { id: 'overview', label: 'ওভারভিউ', icon: '📊' },
        { id: 'users', label: 'ব্যবহারকারী', icon: '👥' },
        { id: 'hostels', label: 'হোস্টেলসমূহ', icon: '🏨' },
        { id: 'bookings', label: 'বুকিং', icon: '📅' },
        { id: 'settings', label: 'সেটিংস', icon: '⚙️' },
        { id: 'profile', label: 'প্রোফাইল', icon: '👤' },
    ];

    return (
        <aside className="hidden lg:flex flex-col w-72 bg-slate-950 text-slate-300 min-h-screen p-6 pt-10 gap-2 sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto">
            <div className="mb-10 px-2 pt-2">
                <h1 className="text-2xl font-black text-primary-light tracking-tight">
                    Admin
                </h1>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mt-2">
                    System Control Center
                </p>
            </div>

            <nav className="flex flex-col gap-1.5 grow">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveView(item.id)}
                        aria-label={`Navigate to ${item.label}`}
                        className={`group flex items-center gap-3.5 px-5 py-4 rounded-2xl font-bold transition-all duration-300 text-sm ${activeView === item.id
                            ? 'bg-primary-dip text-white shadow-lg shadow-primary-light/20'
                            : 'hover:bg-slate-900 border border-transparent hover:border-slate-800'
                            }`}
                    >
                        <span aria-hidden="true" className={`text-xl transition-transform duration-300 ${activeView === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                            {item.icon}
                        </span>
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-slate-900">
                <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">System Status</p>
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-xs font-bold text-slate-300">All Systems Operational</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
