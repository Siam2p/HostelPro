import React from 'react';
import { useRouter } from 'next/navigation';
import { DashboardView } from '@/lib/types';

// Redundant type removed

interface SidebarProps {
    activeView: DashboardView;
    setActiveView: (view: DashboardView) => void;
}

export default function Sidebar({ activeView, setActiveView }: SidebarProps) {
    const router = useRouter();

    return (
        <div className="hidden lg:flex lg:flex-col w-full lg:w-64 bg-white lg:min-h-screen border-r border-gray-100 p-6 gap-2 shadow-sm shrink-0 z-10 sticky top-0 h-screen overflow-y-auto">
            <div className="mb-8 px-2">
                <h2 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Manager<span className="text-gray-900">Pro</span></h2>
                <p className="text-xs text-gray-400 font-medium">ড্যাশবোর্ড প্যানেল</p>
            </div>

            <button onClick={() => setActiveView('overview')} className={`text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-3 ${activeView === 'overview' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}>
                📊 ওভারভিউ
            </button>
            <button onClick={() => setActiveView('hostels')} className={`text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-3 ${activeView === 'hostels' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}>
                🏨 আমার হোস্টেল
            </button>
            <button onClick={() => setActiveView('bookings')} className={`text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-3 ${activeView === 'bookings' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}>
                📝 বুকিং শিট
            </button>
            <button onClick={() => setActiveView('residents')} className={`text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-3 ${activeView === 'residents' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}>
                👥 রেসিডেন্টস
            </button>
            <button onClick={() => setActiveView('profile')} className={`text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-3 ${activeView === 'profile' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}>
                👤 প্রোফাইল
            </button>
        </div>
    );
}
