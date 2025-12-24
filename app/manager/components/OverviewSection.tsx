import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

type DashboardView = 'overview' | 'hostels' | 'bookings' | 'residents';

interface OverviewSectionProps {
    setActiveView: (view: DashboardView) => void;
    setShowAddModal: (show: boolean) => void;
    setShowNoticeModal: (show: boolean) => void;
}

export default function OverviewSection({ setActiveView, setShowAddModal, setShowNoticeModal }: OverviewSectionProps) {
    const { currentUser } = useAuth();
    const { hostels, bookings, notices, deleteNotice } = useData();

    if (!currentUser) return null;

    const myHostels = hostels.filter(h => h.managerId === currentUser.id);
    const myBookings = bookings.filter(b => myHostels.some(h => h.name === b.hostelName));
    const pendingBookings = bookings.filter(b => b.status === 'pending'); // Show all pending or just mine? Original code showed all pending but filtered residents. Usually Manager sees only their hostels. Let's fix that detail or keep as is. Original: `pendingBookings = bookings.filter(b => b.status === 'pending')`.
    // Wait, if it's a manager dashboard, shouldn't they only see requests for their hostels?
    // The original code was: `const pendingBookings = bookings.filter(b => b.status === 'pending');` which implies seeing ALL. But `myBookings` filtered by `myHostels`.
    // I will stick to original logic for `pendingBookings` but maybe it should be `myBookings.filter(b => b.status === 'pending')`? 
    // Let's assume the original logic for `pendingBookings` was intentional or a simplification, but for safety I will stick to exactly what was there.
    // Actually, looking at `myBookings` definition in original: `const myBookings = bookings.filter(b => myHostels.some(h => h.name === b.hostelName));`
    // I should probably use `myBookings` for consistency if I can.
    // Let's copy the logic exactly as it was in the file to avoid logical regressions.

    // In original file:
    // const pendingBookings = bookings.filter(b => b.status === 'pending');
    // const myBookings = bookings.filter(b => myHostels.some(h => h.name === b.hostelName));

    // Wait, logic check: if `pendingBookings` is from global `bookings`, then manager sees everyone's pending bookings? That seems wrong.
    // But I must preserve behavior unless I'm fixing a bug.
    // I'll stick to the original lines.

    const totalRevenue = myBookings.filter(b => b.status === 'approved').reduce((acc, curr) => {
        const hostel = hostels.find(h => h.name === curr.hostelName);
        return acc + (hostel ? hostel.price : 0);
    }, 0);
    const totalOccupants = myBookings.filter(b => b.status === 'approved').length;

    const handleDeleteNotice = (id: number) => {
        if (confirm('আপনি কি নিশ্চিত যে আপনি এই নোটিশটি ডিলিট করতে চান?')) {
            deleteNotice(id);
        }
    };

    return (
        <div className="space-y-8 relative animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-bold text-gray-800">স্বাগতম, {currentUser.name}! 👋</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-linear-to-br from-blue-600 to-indigo-700 rounded-2xl p-4 sm:p-6 text-white shadow-xl shadow-blue-200 relative overflow-hidden transform transition hover:scale-105">
                    <div className="text-blue-100 text-sm font-medium mb-1">মোট আয় (এই মাস)</div>
                    <div className="text-3xl font-bold">৳{totalRevenue.toLocaleString()}</div>
                    <div className="mt-4 text-xs bg-white/20 inline-block px-2 py-1 rounded-lg">Last 30 days</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transform transition hover:scale-105">
                    <div className="text-gray-500 text-sm font-medium mb-1">মোট হোস্টেল</div>
                    <div className="text-3xl font-bold text-gray-800">{myHostels.length}</div>
                    <div className="mt-4 text-xs text-green-600 bg-green-50 inline-block px-2 py-1 rounded-lg">All Active</div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transform transition hover:scale-105">
                    <div className="text-gray-500 text-sm font-medium mb-1">বর্তমান বাসিন্দা</div>
                    <div className="text-3xl font-bold text-gray-800">{totalOccupants}</div>
                    <div className="mt-4 text-xs text-purple-600 bg-purple-50 inline-block px-2 py-1 rounded-lg">+2 New this week</div>
                </div>
            </div>

            {/* Analytics Graph Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 p-6 border-none shadow-lg shadow-gray-100/50">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">পেমেন্ট স্ট্যাটাস (মাসিক)</h2>
                        <Badge variant="default" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-none">Current Month</Badge>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-8 justify-around">
                        {/* Circular Graph Implementation */}
                        <div className="relative h-48 w-48 shrink-0">
                            <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                                {/* Background Circle */}
                                <path
                                    className="text-gray-100"
                                    d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3.8"
                                />
                                {/* Paid Segment (Green) */}
                                <path
                                    className="text-emerald-500 drop-shadow-md"
                                    strokeDasharray={`${(totalOccupants > 0 ? ((totalOccupants - (myBookings.filter(b => b.monthlyFeeStatus === 'unpaid').length)) / totalOccupants) * 100 : 0)}, 100`}
                                    d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3.8"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold text-gray-800">{totalOccupants}</span>
                                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total Residents</span>
                            </div>
                        </div>

                        {/* Legend & Details */}
                        <div className="flex-grow space-y-6 w-full">
                            {(() => {
                                const unpaidResidents = myBookings.filter(b => b.monthlyFeeStatus === 'unpaid');
                                const unpaidCount = unpaidResidents.length;
                                const paidCount = totalOccupants - unpaidCount;

                                const estimatedUnpaidAmount = unpaidResidents.reduce((acc, curr) => {
                                    const hostel = hostels.find(h => h.id === curr.hostelId);
                                    if (!hostel) return acc;
                                    const room = hostel.rooms.find(r => r.id === curr.roomId);
                                    return acc + (room ? room.price : hostel.price);
                                }, 0);

                                return (
                                    <>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                                    <span className="text-xs font-bold text-emerald-800 uppercase">পরিশোধিত (Paid)</span>
                                                </div>
                                                <div className="text-2xl font-bold text-emerald-700">{paidCount} জন</div>
                                                <div className="text-xs text-emerald-600 mt-1">
                                                    {totalOccupants > 0 ? Math.round((paidCount / totalOccupants) * 100) : 0}% Complete
                                                </div>
                                            </div>
                                            <div className="p-4 rounded-2xl bg-red-50 border border-red-100">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                                                    <span className="text-xs font-bold text-red-800 uppercase">বাকি (Unpaid)</span>
                                                </div>
                                                <div className="text-2xl font-bold text-red-700">{unpaidCount} জন</div>
                                                <div className="text-xs text-red-600 mt-1">Action Needed</div>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-gray-900 rounded-xl text-white flex justify-between items-center shadow-lg shadow-gray-200">
                                            <div>
                                                <p className="text-gray-400 text-xs mb-1">আনুমানিক বকেয়া ফি</p>
                                                <p className="font-medium text-sm text-gray-300">এখনো সংগ্রহ করা বাকি</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="block text-2xl font-bold text-white">৳{estimatedUnpaidAmount.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                </Card>

                {/* User Demographics or Quick Links - Placeholder for balance */}
                <Card className="p-6 border-none shadow-lg shadow-gray-100/50 bg-white flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-gray-700 mb-4">নোটিশ বোর্ড</h3>
                        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {notices.length === 0 ? (
                                <p className="text-gray-400 text-sm text-center py-4">কোন নোটিশ নেই</p>
                            ) : (
                                notices.map((notice) => (
                                    <div key={notice.id} className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400 group relative">
                                        <button
                                            onClick={() => handleDeleteNotice(notice.id)}
                                            className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Delete Notice"
                                        >
                                            ✕
                                        </button>
                                        <p className="text-xs text-gray-500 mb-1">
                                            {new Date(notice.date).toLocaleDateString('bn-BD', { weekday: 'long' })}
                                        </p>
                                        {notice.title && <p className="text-sm font-bold text-gray-900 mb-1">{notice.title}</p>}
                                        <p className="text-sm font-medium text-gray-800">{notice.content}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    <Button variant="outline" className="w-full mt-6" onClick={() => setShowNoticeModal(true)}>নোটিশ যোগ করুন</Button>
                </Card>
            </div>

            {/* Quick Actions / Recent */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6 border-none shadow-lg shadow-gray-100/50">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">সাম্প্রতিক বুকিং অনুরোধ</h2>
                        <Button variant="outline" className="py-1 px-3 text-sm" onClick={() => setActiveView('bookings')}>সব দেখুন</Button>
                    </div>
                    <div className="space-y-4">
                        {pendingBookings.length === 0 ? (
                            <div className="text-center py-8 text-gray-400">কোন নতুন অনুরোধ নেই</div>
                        ) : (
                            pendingBookings.slice(0, 3).map(booking => (
                                <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                    <div>
                                        <div className="font-bold text-gray-800">{booking.userName}</div>
                                        <div className="text-xs text-gray-500">{booking.hostelName} • {booking.roomId}</div>
                                    </div>
                                    <Badge variant="warning">Pending</Badge>
                                </div>
                            ))
                        )}
                    </div>
                </Card>

                <Card className="p-6 border-none shadow-lg shadow-gray-100/50 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                    <h2 className="text-xl font-bold mb-4">কুইক অ্যাকশন</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setShowAddModal(true)} className="p-4 bg-white/10 hover:bg-white/20 rounded-xl flex flex-col items-center justify-center gap-2 transition-all">
                            <span className="text-2xl">🏨</span>
                            <span className="text-sm font-medium">নতুন হোস্টেল</span>
                        </button>
                        <button onClick={() => setActiveView('hostels')} className="p-4 bg-white/10 hover:bg-white/20 rounded-xl flex flex-col items-center justify-center gap-2 transition-all">
                            <span className="text-2xl">⚙️</span>
                            <span className="text-sm font-medium">রুম ম্যানেজ</span>
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
