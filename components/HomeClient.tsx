"use client";

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { HostelCard } from '@/components/HostelCard';
import { Button } from '@/components/ui/Button';
import JsonLd from '@/components/JsonLd';

import { BANGLADESH_LOCATIONS } from '@/lib/locations';

export default function HomeClient() {
    const { hostels } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'price_low' | 'rating'>('all');

    // New Filter States
    const [category, setCategory] = useState<'all' | 'Male' | 'Female'>('all');
    const [division, setDivision] = useState('');
    const [district, setDistrict] = useState('');
    const [upazila, setUpazila] = useState('');

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Hostel Pro',
        url: 'https://hostel-pro.vercel.app',
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://hostel-pro.vercel.app/?q={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
        },
    };

    // Filter & Sort Logic
    const filteredHostels = hostels
        .filter(h => {
            const matchesSearch =
                h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                h.location.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory = category === 'all' || h.category === category;
            const matchesDivision = !division || h.division === division;
            const matchesDistrict = !district || h.district === district;
            const matchesUpazila = !upazila || h.upazila === upazila;

            return matchesSearch && matchesCategory && matchesDivision && matchesDistrict && matchesUpazila;
        })
        .sort((a, b) => {
            if (filterType === 'price_low') return a.price - b.price;
            if (filterType === 'rating') return b.rating - a.rating;
            return 0; // Default ID order
        });

    const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDivision(e.target.value);
        setDistrict('');
        setUpazila('');
    };

    const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDistrict(e.target.value);
        setUpazila('');
    };

    const availableDistricts = division && BANGLADESH_LOCATIONS[division] ? Object.keys(BANGLADESH_LOCATIONS[division]) : [];
    const availableUpazilas = division && district && BANGLADESH_LOCATIONS[division][district] ? BANGLADESH_LOCATIONS[division][district] : [];

    return (
        <div className="pb-20">
            <JsonLd data={jsonLd} />
            {/* Hero Section */}
            <section className="py-24 text-center bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.1),transparent_40%)]">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in">
                        আমরা খুঁজে দেব আপনার <br />
                        <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                            নিরাপদ ঠিকানা
                        </span>
                    </h1>
                    <p className="text-lg text-text-muted mb-10 max-w-2xl mx-auto">
                        সেরা মানের ছাত্র হোস্টেল খুঁজুন সহজে।verified রিভিউ, সেরা দাম এবং নিরাপদ পরিবেশ।
                    </p>

                    <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl max-w-4xl mx-auto border border-white/50 space-y-4">
                        <div className="flex flex-col md:flex-row gap-2">
                            <input
                                type="text"
                                placeholder="লোকেশন বা হোস্টেলের নাম খুঁজুন..."
                                className="grow px-6 py-3 rounded-full bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-main text-lg"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button className="rounded-full px-8 py-3 w-full md:w-auto text-lg">
                                খুঁজুন
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
                            {/* Category Filter */}
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 ml-2">ক্যাটাগরি</label>
                                <select
                                    className="w-full p-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-primary"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value as any)}
                                >
                                    <option value="all">সকল</option>
                                    <option value="Male">ছাত্র (Male)</option>
                                    <option value="Female">ছাত্রী (Female)</option>
                                </select>
                            </div>

                            {/* Division Filter */}
                            <div className="space-y-1">
                                <label htmlFor="division" className="text-xs font-semibold text-gray-500 ml-2">বিভাগ</label>
                                <select
                                    className="w-full p-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-primary"
                                    value={division}
                                    onChange={handleDivisionChange}
                                >
                                    <option value="">বিভাগ নির্বাচন</option>
                                    {Object.keys(BANGLADESH_LOCATIONS).map(div => (
                                        <option key={div} value={div}>{div}</option>
                                    ))}
                                </select>
                            </div>

                            {/* District Filter */}
                            <div className="space-y-1">
                                <label htmlFor="district" className="text-xs font-semibold text-gray-500 ml-2">জেলা</label>
                                <select
                                    className="w-full p-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-primary disabled:bg-gray-50 disabled:text-gray-400"
                                    value={district}
                                    onChange={handleDistrictChange}
                                    disabled={!division}
                                >
                                    <option value="">জেলা নির্বাচন</option>
                                    {availableDistricts.map(dist => (
                                        <option key={dist} value={dist}>{dist}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Upazila Filter */}
                            <div className="space-y-1">
                                <label htmlFor="upazila" className="text-xs font-semibold text-gray-500 ml-2">উপজেলা</label>
                                <select
                                    className="w-full p-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-primary disabled:bg-gray-50 disabled:text-gray-400"
                                    value={upazila}
                                    onChange={(e) => setUpazila(e.target.value)}
                                    disabled={!district}
                                >
                                    <option value="">উপজেলা নির্বাচন</option>
                                    {availableUpazilas.map(upz => (
                                        <option key={upz} value={upz}>{upz}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hostel Grid Section */}
            <section id="hostels" className="container mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                    <h2 className="text-3xl font-bold">জনপ্রিয় হোস্টেলসমূহ</h2>
                    <div className="flex gap-2">
                        <select
                            className="px-4 py-2 rounded-lg border border-border bg-white focus:outline-none focus:border-primary"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value as any)}
                        >
                            <option value="all">সব দেখুন</option>
                            <option value="price_low">দাম (কম থেকে বেশি)</option>
                            <option value="rating">সেরা রেটিং</option>
                        </select>
                    </div>
                </div>

                {filteredHostels.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredHostels.map(hostel => (
                            <HostelCard key={hostel.id} hostel={hostel} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h3 className="text-xl font-bold text-text-muted">কোন হোস্টেল পাওয়া যায়নি</h3>
                        <p className="text-text-muted mt-2">অন্য কিছু লিখে অনুসন্ধান করুন</p>
                    </div>
                )}
            </section>
        </div>
    );
}
