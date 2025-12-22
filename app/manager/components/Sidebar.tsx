import React from 'react';
import { useRouter } from 'next/navigation';

type DashboardView = 'overview' | 'hostels' | 'bookings' | 'residents';

interface SidebarProps {
    activeView: DashboardView;
    setActiveView: (view: DashboardView) => void;
}

export default function Sidebar({ activeView, setActiveView }: SidebarProps) {
    const router = useRouter();

    return (
        <div className="w-full lg:w-64 bg-white lg:min-h-screen border-r border-gray-100 p-6 flex flex-col gap-2 shadow-sm shrink-0 z-10 sticky top-0 h-screen overflow-y-auto hidden lg:flex">
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

            <div className="mt-8 border-t border-gray-100 pt-4">
                <p className="px-4 text-xs font-bold text-gray-400 mb-2">OTHERS</p>
                <button onClick={() => router.push('/contact')} className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:text-blue-600 transition-colors">Contact Us</button>
                <button onClick={() => router.push('/about')} className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:text-blue-600 transition-colors">About Us</button>
            </div>
        </div>
    );
}
