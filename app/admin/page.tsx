"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { AdminDashboardView } from '@/lib/types';

// New Components
import Sidebar from './components/Sidebar';
import OverviewSection from './components/OverviewSection';
import UsersSection from './components/UsersSection';
import HostelsSection from './components/HostelsSection';
import BookingsSection from './components/BookingsSection';
import SettingsSection from './components/SettingsSection';
import ProfileSection from './components/ProfileSection';
import GlobalNoticeSection from './components/GlobalNoticeSection';

export default function AdminDashboard() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center font-black text-slate-300 animate-pulse uppercase tracking-[0.3em] text-sm">Initialising Secure Access...</div>}>
            <AdminDashboardContent />
        </Suspense>
    );
}

function AdminDashboardContent() {
    const { currentUser, isLoading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeView, setActiveView] = useState<AdminDashboardView>('overview');

    useEffect(() => {
        const view = searchParams.get('view') as AdminDashboardView;
        if (view && ['overview', 'users', 'hostels', 'bookings', 'settings', 'profile'].includes(view)) {
            setActiveView(view);
        }
    }, [searchParams]);

    if (isLoading) {
        return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-black text-slate-300 animate-pulse uppercase tracking-[0.3em] text-sm">Authenticating...</div>;
    }

    if (!currentUser || currentUser.role !== 'admin') {
        if (typeof window !== 'undefined') router.push('/login');
        return null;
    }

    const renderView = () => {
        switch (activeView) {
            case 'overview': return <OverviewSection />;
            case 'users': return <UsersSection />;
            case 'hostels': return <HostelsSection />;
            case 'bookings': return <BookingsSection />;
            case 'settings': return <SettingsSection />;
            case 'profile': return <ProfileSection />;
            default: return <OverviewSection />;
        }
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50">
            {/* Admin Sidebar */}
            <Sidebar activeView={activeView} setActiveView={setActiveView} />

            {/* Mobile Navigation */}
            <div className="lg:hidden fixed bottom-0 left-0 w-full bg-slate-950 text-white z-50 p-4 flex justify-around items-center border-t border-white/10">
                <button aria-label="Overview" onClick={() => setActiveView('overview')} className={`p-2 rounded-xl transition-colors ${activeView === 'overview' ? 'text-primaryLight bg-slate-900' : 'text-slate-400 hover:text-slate-200'}`}><span aria-hidden="true">📊</span></button>
                <button aria-label="Users" onClick={() => setActiveView('users')} className={`p-2 rounded-xl transition-colors ${activeView === 'users' ? 'text-primaryLight bg-slate-900' : 'text-slate-400 hover:text-slate-200'}`}><span aria-hidden="true">👥</span></button>
                <button aria-label="Hostels" onClick={() => setActiveView('hostels')} className={`p-2 rounded-xl transition-colors ${activeView === 'hostels' ? 'text-primaryLight bg-slate-900' : 'text-slate-400 hover:text-slate-200'}`}><span aria-hidden="true">🏨</span></button>
                <button aria-label="Bookings" onClick={() => setActiveView('bookings')} className={`p-2 rounded-xl transition-colors ${activeView === 'bookings' ? 'text-primaryLight bg-slate-900' : 'text-slate-400 hover:text-slate-200'}`}><span aria-hidden="true">📅</span></button>
                <button aria-label="Profile" onClick={() => setActiveView('profile')} className={`p-2 rounded-xl transition-colors ${activeView === 'profile' ? 'text-primaryLight bg-slate-900' : 'text-slate-400 hover:text-slate-200'}`}><span aria-hidden="true">👤</span></button>
            </div>

            {/* Main Viewport */}
            <main className="grow p-6 lg:p-10 pb-24 lg:pb-12 w-full overflow-x-hidden">
                {activeView === 'settings' && <GlobalNoticeSection />}
                {renderView()}
            </main>
        </div>
    );
}
