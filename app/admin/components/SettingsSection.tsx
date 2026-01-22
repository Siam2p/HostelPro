"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function SettingsSection() {
    const [siteName, setSiteName] = useState('HostelPro');
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert('সিস্টেম সেটিংস সফলভাবে আপডেট করা হয়েছে!');
        }, 1000);
    };

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-700">
            <header className="mb-10">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">সিস্টেম সেটিংস</h2>
                <p className="text-slate-500 font-medium">পুরো প্ল্যাটফর্মের কনফিগারেশন এবং নিরাপত্তা নিয়ন্ত্রণ করুন।</p>
            </header>

            <div className="max-w-4xl space-y-8">
                <Card className="p-10 border-none shadow-2xl shadow-slate-200/60 rounded-[3rem] bg-white">
                    <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                        <span className="p-2.5 bg-slate-100 rounded-xl text-slate-600">⚙️</span>
                        সাধারণ কনফিগারেশন
                    </h3>

                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label htmlFor='name' className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block px-2">ওয়েবসাইট নাম</label>
                                <input
                                    type="text"
                                    id='name'
                                    value={siteName}
                                    onChange={(e) => setSiteName(e.target.value)}
                                    className="w-full h-14 px-3 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-primaryLight outline-none transition-all font-black text-slate-900"
                                />
                            </div>
                            <div>
                                <label htmlFor='email' className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block px-2">অ্যাডমিন ইমেইল</label>
                                <input
                                    type="email"
                                    id='email'
                                    defaultValue="admin@hostelpro.com"
                                    className="w-full h-14 px-3 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-primaryLight outline-none transition-all font-black text-slate-900"
                                />
                            </div>
                        </div>

                        <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-center justify-between">
                            <div>
                                <h4 className="font-black text-slate-900 mb-1 leading-none">মেইনটেন্যান্স মোড</h4>
                                <p className="text-xs text-slate-500 font-medium">নির্ধারিত সময়ের জন্য ওয়েবসাইট বন্ধ রাখতে এটি চালু করুন।</p>
                            </div>
                            <button
                                onClick={() => setMaintenanceMode(!maintenanceMode)}
                                className={`w-16 h-8 rounded-full transition-all duration-300 relative ${maintenanceMode ? 'bg-primaryDip' : 'bg-slate-300'}`}
                            >
                                <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300 ${maintenanceMode ? 'left-9' : 'left-1'}`}></div>
                            </button>
                        </div>
                    </div>

                    <div className="mt-10 pt-10 border-t border-slate-50">
                        <Button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="h-14 px-12 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest shadow-xl shadow-slate-900/10 hover:-translate-y-1 active:translate-y-0 transition-all"
                        >
                            {isSaving ? 'সেভ হচ্ছে...' : 'সেটিংস আপডেট করুন'}
                        </Button>
                    </div>
                </Card>

                <Card className="p-10 border-none shadow-2xl shadow-slate-200/60 rounded-[3rem] bg-rose-50 border-rose-100">
                    <h3 className="text-xl font-black text-rose-900 mb-4 flex items-center gap-3">
                        <span className="p-2.5 bg-rose-100 rounded-xl text-rose-600">⚠️</span>
                        ডেঞ্জার জোন
                    </h3>
                    <p className="text-sm text-rose-700 font-medium mb-8">সিস্টেম রিসেট বা বড় কোনো পরিবর্তনের ক্ষেত্রে সাবধানতা অবলম্বন করুন।</p>

                    <button className="px-8 py-4 bg-white text-rose-600 border border-rose-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all shadow-sm">
                        সিস্টেম ডাটা ক্লিয়ার করুন (Factory Reset)
                    </button>
                </Card>
            </div>
        </div>
    );
}
