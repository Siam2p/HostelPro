"use client";

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { HostelCard } from '@/components/HostelCard';
import { Button } from '@/components/ui/Button';

export default function HostelListClient() {
    const { hostels } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'price_low' | 'rating'>('all');

    // Filter & Sort Logic
    const filteredHostels = hostels
        .filter(h =>
            h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            h.location.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (filterType === 'price_low') return a.price - b.price;
            if (filterType === 'rating') return b.rating - a.rating;
            return 0;
        });

    return (
        <div className="min-h-screen bg-bg-body pb-20">
            {/* Hero Section */}
            <section className="relative py-24 text-center overflow-hidden bg-slate-900 text-white">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/30 rounded-full filter blur-[100px] animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/30 rounded-full filter blur-[100px] animate-pulse delay-700"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                        খুঁজে নিন আপনার <br />
                        <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                            সেরা হোস্টেল
                        </span>
                    </h1>
                    <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
                        আমাদের ভেরিফাইড হোস্টেল তালিকা থেকে আপনার পছন্দের সিট বা রুম বেছে নিন। নিরাপদ, সাশ্রয়ী এবং আরামদায়ক।
                    </p>

                    {/* Search & Filter Bar */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
                        <div className="grow relative group">
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">🔍</span>
                            <input
                                type="text"
                                placeholder="হোস্টেলের নাম বা লোকেশন লিখুন..."
                                className="w-full pl-12 pr-6 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:bg-white focus:text-slate-900 focus:ring-2 focus:ring-primary transition-all duration-300"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="min-w-[200px] relative">
                            <select
                                className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:bg-white focus:text-slate-900 focus:ring-2 focus:ring-primary transition-all duration-300 appearance-none cursor-pointer"
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value as any)}
                            >
                                <option value="all" className="text-slate-900">সব দেখুন</option>
                                <option value="price_low" className="text-slate-900">দাম (কম থেকে বেশি)</option>
                                <option value="rating" className="text-slate-900">সেরা রেটিং</option>
                            </select>
                            <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none">▼</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <div className="container mx-auto px-6 py-16">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-text-main">
                        মোট হোস্টেল পাওয়া গেছে: <span className="text-primary">{filteredHostels.length}</span> টি
                    </h2>
                </div>

                {filteredHostels.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredHostels.map((hostel, index) => (
                            <div key={hostel.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                                <HostelCard hostel={hostel} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-border">
                        <div className="text-6xl mb-4">🏠❌</div>
                        <h3 className="text-2xl font-bold text-text-muted mb-2">কোন হোস্টেল পাওয়া যায়নি</h3>
                        <p className="text-text-muted mb-6">আপনার সার্চ ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন</p>
                        <Button
                            variant="outline"
                            onClick={() => { setSearchTerm(''); setFilterType('all'); }}
                        >
                            ফিল্টার রিসেট করুন
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
