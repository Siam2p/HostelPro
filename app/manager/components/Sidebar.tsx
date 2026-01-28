import { DashboardView } from '@/lib/types';
import { useData } from '@/context/DataContext';

interface SidebarProps {
    activeView: DashboardView;
    setActiveView: (view: DashboardView) => void;
}

export default function Sidebar({ activeView, setActiveView }: SidebarProps) {
    const { bookings } = useData();
    const pendingCount = bookings.filter(b => b.status === 'pending').length;

    return (
        <div className="hidden lg:flex lg:flex-col w-full lg:w-72 bg-white lg:min-h-screen border-r border-gray-100 p-6 gap-2 shadow-sm shrink-0 z-10 sticky top-0 h-screen overflow-y-auto">
            <div className="mb-10 px-2 pt-2">
                <h2 className="text-2xl font-extrabold bg-linear-to-r from-primary-dip to-primary-dipto bg-clip-text text-transparent tracking-tight">Manager</h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Management Console</p>
            </div>

            <nav className="flex flex-col gap-1.5 grow">
                <button
                    onClick={() => setActiveView('overview')}
                    className={`text-left px-5 py-3.5 rounded-2xl font-bold transition-all duration-300 flex items-center gap-3.5 ${activeView === 'overview' ? 'bg-bg-subtle text-primary-dip shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                    <span className="text-xl">📊</span> ওভারভিউ
                </button>
                <button
                    onClick={() => setActiveView('hostels')}
                    className={`text-left px-5 py-3.5 rounded-2xl font-bold transition-all duration-300 flex items-center gap-3.5 ${activeView === 'hostels' ? 'bg-bg-subtle text-primary-dip shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                    <span className="text-xl">🏨</span> আমার হোস্টেল
                </button>
                <button
                    onClick={() => setActiveView('bookings')}
                    className={`text-left px-5 py-3.5 rounded-2xl font-bold transition-all duration-300 flex items-center gap-3.5 justify-between ${activeView === 'bookings' ? 'bg-bg-subtle text-primary-dip shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                    <div className="flex items-center gap-3.5">
                        <span className="text-xl">📝</span> বুকিং শিট
                    </div>
                    {pendingCount > 0 && (
                        <span className="bg-red-500 text-white text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-full shadow-md shadow-red-200 animate-pulse">
                            {pendingCount}
                        </span>
                    )}
                </button>
                <button
                    onClick={() => setActiveView('residents')}
                    className={`text-left px-5 py-3.5 rounded-2xl font-bold transition-all duration-300 flex items-center gap-3.5 ${activeView === 'residents' ? 'bg-bg-subtle text-primary-dip shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                    <span className="text-xl">👥</span> রেসিডেন্টস
                </button>
                <button
                    onClick={() => setActiveView('profile')}
                    className={`text-left px-5 py-3.5 rounded-2xl font-bold transition-all duration-300 flex items-center gap-3.5 ${activeView === 'profile' ? 'bg-bg-subtle text-primary-dip shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                    <span className="text-xl">👤</span> প্রোফাইল
                </button>
            </nav>

            <div className="mt-auto pt-6 border-t border-gray-100/50">
                <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary-light animate-pulse"></span>
                        <span className="text-xs font-bold text-gray-600">Manager Mode Active</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
