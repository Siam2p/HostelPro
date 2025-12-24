"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useData } from '@/context/DataContext';

export default function BookingsSection() {
    const { bookings, updateBookingStatus, deleteBooking } = useData();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBookings = bookings.filter(booking =>
        booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.hostelName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-700">
            <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">গ্লোবাল বুকিং খতিয়ান</h2>
                    <p className="text-slate-500 font-medium">পুরো সিস্টেমের সকল বুকিং স্ট্যাটাস এবং হিস্টোরি মনিটর করুন।</p>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="ইউজার বা হোস্টেল খুঁজুন..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-80 h-12 pl-12 pr-6 rounded-2xl bg-white border border-slate-200 outline-none transition-all font-medium text-sm"
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2">🔍</span>
                </div>
            </header>

            <Card className="border-none shadow-2xl shadow-slate-200/60 rounded-[2.5rem] bg-white overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="p-6 font-black text-slate-400 uppercase tracking-widest text-[10px]">ইউজার ও তারিখ</th>
                                <th className="p-6 font-black text-slate-400 uppercase tracking-widest text-[10px]">হোস্টেল ও রুম</th>
                                <th className="p-6 font-black text-slate-400 uppercase tracking-widest text-[10px]">পেমেন্ট ও স্ট্যাটাস</th>
                                <th className="p-6 font-black text-slate-400 uppercase tracking-widest text-[10px]">অ্যাকশন</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredBookings.slice().reverse().map(booking => (
                                <tr key={booking.id} className="hover:bg-slate-50/30 transition-colors">
                                    <td className="p-6">
                                        <p className="font-black text-slate-900 text-sm">{booking.userName}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{booking.date}</p>
                                    </td>
                                    <td className="p-6">
                                        <p className="text-sm font-bold text-slate-700">{booking.hostelName}</p>
                                        <p className="text-xs text-blue-500 font-black">রুম: {booking.roomId} | বেড: {booking.bedId}</p>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex flex-col gap-2">
                                            <Badge variant={
                                                booking.status === 'approved' ? 'success' :
                                                    booking.status === 'pending' ? 'warning' : 'default'
                                            } className="w-fit px-3 py-1 rounded-lg font-black tracking-widest uppercase text-[9px]">
                                                {booking.status}
                                            </Badge>
                                            <Badge variant={booking.monthlyFeeStatus === 'paid' ? 'success' : 'default'} className="w-fit text-[9px] font-bold">
                                                পেমেন্ট: {booking.monthlyFeeStatus || 'unpaid'}
                                            </Badge>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-2">
                                            {booking.status === 'pending' && (
                                                <button
                                                    onClick={() => updateBookingStatus(booking.id, 'approved')}
                                                    className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                                                    title="Approve"
                                                >
                                                    ✅
                                                </button>
                                            )}
                                            <button
                                                onClick={() => {
                                                    if (confirm('বুকিংটি ডিলিট করতে চান?')) deleteBooking(booking.id);
                                                }}
                                                className="p-2.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                                                title="Delete"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
