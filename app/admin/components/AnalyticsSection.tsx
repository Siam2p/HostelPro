"use client";

import { Card } from '@/components/ui/Card';
import { useData } from '@/context/DataContext';

export default function AnalyticsSection() {
    const { users, hostels, bookings } = useData();

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-700">
            <header className="mb-10">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">অ্যানালিটিক্স ও রিপোর্ট</h2>
                <p className="text-slate-500 font-medium">সিস্টেমের গ্রোথ এবং ইউজার এনগেজমেন্ট ট্র্যাক করুন।</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <Card className="p-10 border-none shadow-2xl shadow-slate-200/60 rounded-[3rem] bg-white h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute top-10 left-10 flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-primaryLight"></div>
                        <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest">ইউজার গ্রোথ</h4>
                    </div>
                    <div className="text-6xl mb-4">📈</div>
                    <p className="text-slate-400 font-bold">গ্রাফিক্যাল ডাটা শীঘ্রই আসছে...</p>
                </Card>

                <Card className="p-10 border-none shadow-2xl shadow-slate-200/60 rounded-[3rem] bg-white h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute top-10 left-10 flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                        <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest">বুকিং রেশিও</h4>
                    </div>
                    <div className="text-6xl mb-4">📊</div>
                    <p className="text-slate-400 font-bold">রিপোর্ট জেনারেট হচ্ছে...</p>
                </Card>
            </div>

            <div className="grid grid-cols-3 gap-6">
                <div className="p-8 bg-white rounded-[2.5rem] shadow-lg shadow-slate-200/50 border border-slate-50 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">কনভার্সন রেট</p>
                    <p className="text-3xl font-black text-slate-900">৪৫.৮%</p>
                </div>
                <div className="p-8 bg-white rounded-[2.5rem] shadow-lg shadow-slate-200/50 border border-slate-50 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">অ্যাভারেজ সেশন</p>
                    <p className="text-3xl font-black text-slate-900">১২ মি.</p>
                </div>
                <div className="p-8 bg-white rounded-[2.5rem] shadow-lg shadow-slate-200/50 border border-slate-50 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">বউন্স রেট</p>
                    <p className="text-3xl font-black text-rose-500">২৪%</p>
                </div>
            </div>
        </div>
    );
}
