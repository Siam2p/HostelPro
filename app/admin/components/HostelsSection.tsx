"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useData } from '@/context/DataContext';
import { Hostel } from '@/lib/types';

export default function HostelsSection() {
    const { hostels, deleteHostel, updateHostel } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'active' | 'inactive' | 'rejected'>('all');

    const filteredHostels = hostels.filter(hostel => {
        const matchesSearch = hostel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hostel.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || hostel.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleStatusUpdate = (hostel: Hostel, newStatus: Hostel['status']) => {
        updateHostel({ ...hostel, status: newStatus });
    };

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-700">
            <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">হোস্টেল ব্যবস্থাপনা</h2>
                    <p className="text-slate-500 font-medium">হোস্টেলসমূহ অনুমোদন করুন এবং সিস্টেম-ওয়াইড ম্যানেজ করুন।</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="হোস্টেল বা এলাকা খুঁজুন..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-80 h-12 pl-12 pr-6 rounded-2xl bg-white border border-slate-200 focus:border-blue-500 outline-none transition-all font-medium text-sm"
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2">🔍</span>
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                        className="h-12 px-6 rounded-2xl bg-white border border-slate-200 outline-none font-bold text-sm"
                    >
                        <option value="all">সব স্ট্যাটাস</option>
                        <option value="pending">পেন্ডিং</option>
                        <option value="active">সক্রিয়</option>
                        <option value="inactive">নিষ্ক্রিয়</option>
                        <option value="rejected">প্রত্যাখ্যাত</option>
                    </select>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredHostels.map(hostel => (
                    <Card key={hostel.id} className="p-0 border-none shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 rounded-[2.5rem] bg-white overflow-hidden flex flex-col">
                        <div className="relative h-48 group">
                            <img src={hostel.image} alt={hostel.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute top-4 right-4">
                                <Badge variant={
                                    hostel.status === 'active' ? 'success' :
                                        hostel.status === 'pending' ? 'warning' :
                                            hostel.status === 'rejected' ? 'danger' : 'default'
                                } className="px-4 py-1.5 rounded-xl font-black tracking-widest uppercase text-[10px] shadow-lg">
                                    {hostel.status === 'pending' ? 'Pending' :
                                        hostel.status === 'active' ? 'Active' :
                                            hostel.status === 'rejected' ? 'Rejected' : 'Inactive'}
                                </Badge>
                            </div>
                        </div>
                        <div className="p-8 grow flex flex-col">
                            <h3 className="text-xl font-black text-slate-900 mb-2 truncate">{hostel.name}</h3>
                            <p className="text-slate-400 text-xs font-bold flex items-center gap-1.5 mb-6">
                                📍 {hostel.location}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ভাড়া</p>
                                    <p className="text-sm font-black text-slate-900">৳{hostel.price}</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">রেটিং</p>
                                    <p className="text-sm font-black text-blue-600">⭐ {hostel.rating}</p>
                                </div>
                            </div>

                            <div className="mt-auto flex items-center justify-between gap-2">
                                {hostel.status === 'pending' && (
                                    <div className="flex grow gap-2">
                                        <Button
                                            onClick={() => handleStatusUpdate(hostel, 'active')}
                                            className="grow py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black uppercase tracking-widest"
                                        >
                                            অনুমোদন
                                        </Button>
                                        <Button
                                            onClick={() => handleStatusUpdate(hostel, 'rejected')}
                                            className="grow py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-black uppercase tracking-widest"
                                        >
                                            বর্জন
                                        </Button>
                                    </div>
                                )}
                                {hostel.status === 'active' && (
                                    <Button
                                        onClick={() => handleStatusUpdate(hostel, 'inactive')}
                                        variant="outline"
                                        className="grow py-3 rounded-2xl text-xs font-black uppercase tracking-widest border-slate-200"
                                    >
                                        নিষ্ক্রিয় করুন
                                    </Button>
                                )}
                                {hostel.status === 'inactive' && (
                                    <Button
                                        onClick={() => handleStatusUpdate(hostel, 'active')}
                                        className="grow py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-widest"
                                    >
                                        সক্রিয় করুন
                                    </Button>
                                )}
                                <button
                                    onClick={() => {
                                        if (confirm('আপনি কি নিশ্চিত যে এই হোস্টেলটি ডিলিট করতে চান?')) {
                                            deleteHostel(hostel.id);
                                        }
                                    }}
                                    className="p-3.5 rounded-2xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all duration-300"
                                    title="Delete Hostel"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {filteredHostels.length === 0 && (
                <div className="p-20 text-center bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50">
                    <div className="text-6xl mb-4">🏨</div>
                    <h4 className="text-xl font-black text-slate-900 mb-2">কোনো হোস্টেল পাওয়া যায়নি</h4>
                    <p className="text-slate-400 font-medium">আপনার সার্চ বা ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।</p>
                </div>
            )}
        </div>
    );
}
