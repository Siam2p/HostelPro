"use client";

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { HostelCard } from '@/components/HostelCard';
import { Button } from '@/components/ui/Button';
import JsonLd from '@/components/JsonLd';
import { Search, MapPin, Filter, Home, Users, ArrowRight } from 'lucide-react';

import { BANGLADESH_LOCATIONS } from '@/lib/locations';

export default function HomeClient() {
    const { hostels } = useData();
    const [filterType, setFilterType] = useState<'all' | 'price_low' | 'rating'>('all');

    // Draft Filter States (before clicking search)
    const [draftSearchTerm, setDraftSearchTerm] = useState('');
    const [draftCategory, setDraftCategory] = useState<'all' | 'Male' | 'Female'>('all');
    const [draftDivision, setDraftDivision] = useState('');
    const [draftDistrict, setDraftDistrict] = useState('');
    const [draftUpazila, setDraftUpazila] = useState('');

    // Active Filter States (after clicking search)
    const [activeFilters, setActiveFilters] = useState({
        searchTerm: '',
        category: 'all',
        division: '',
        district: '',
        upazila: ''
    });

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
                h.name.toLowerCase().includes(activeFilters.searchTerm.toLowerCase()) ||
                h.location.toLowerCase().includes(activeFilters.searchTerm.toLowerCase());

            const matchesCategory = activeFilters.category === 'all' || h.category === activeFilters.category;
            const matchesDivision = !activeFilters.division || h.division === activeFilters.division;
            const matchesDistrict = !activeFilters.district || h.district === activeFilters.district;
            const matchesUpazila = !activeFilters.upazila || h.upazila === activeFilters.upazila;

            return matchesSearch && matchesCategory && matchesDivision && matchesDistrict && matchesUpazila;
        })
        .sort((a, b) => {
            if (filterType === 'price_low') return a.price - b.price;
            if (filterType === 'rating') return b.rating - a.rating;
            return 0; // Default ID order
        });

    // State for Mobile Filter Menu
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const handleSearch = () => {
        setActiveFilters({
            searchTerm: draftSearchTerm,
            category: draftCategory,
            division: draftDivision,
            district: draftDistrict,
            upazila: draftUpazila
        });
        setIsMobileFilterOpen(false); // Close menu after search

        // Scroll to results
        const element = document.getElementById('hostels');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDraftDivision(e.target.value);
        setDraftDistrict('');
        setDraftUpazila('');
    };

    const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDraftDistrict(e.target.value);
        setDraftUpazila('');
    };

    const availableDistricts = draftDivision && BANGLADESH_LOCATIONS[draftDivision] ? Object.keys(BANGLADESH_LOCATIONS[draftDivision]) : [];
    const availableUpazilas = draftDivision && draftDistrict && BANGLADESH_LOCATIONS[draftDivision][draftDistrict] ? BANGLADESH_LOCATIONS[draftDivision][draftDistrict] : [];

    return (
        <div className="pb-6 md:pb-16">
            <JsonLd data={jsonLd} />
            {/* Hero Section */}
            <section className="relative pt-10 pb-10 md:pt-24 md:pb-16 overflow-hidden">
                {/* Abstract Background */}
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-secondary/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="container mx-auto px-3 relative">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-tight">
                            আপনার পছন্দের <br />
                            <span className="bg-linear-to-r from-primary via-primary-dip to-secondary bg-clip-text text-transparent">
                                সেরা হোস্টেলটি
                            </span> খুঁজে নিন
                        </h1>
                    </div>

                    <div className="bg-white/70 backdrop-blur-2xl p-4 md:p-8 rounded-4xl md:rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] max-w-5xl mx-auto border border-white/50 ring-1 ring-black/5 animate-fade-in-up">
                        <div className="space-y-4 md:space-y-6">
                            {/* Primary Search Bar */}
                            <div className="flex flex-row gap-2 md:gap-3">
                                <div className="relative grow group">
                                    <div className="absolute inset-y-0 left-0 pl-4 md:pl-5 flex items-center pointer-events-none group-focus-within:text-primary transition-colors text-gray-400">
                                        <Search size={18} className="md:w-[22px] md:h-[22px]" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="হোস্টেলের নাম বা লোকেশন..."
                                        className="w-full pl-10 md:pl-13 pr-4 md:pr-6 py-3 md:py-4 rounded-xl md:rounded-full bg-white border border-gray-100 shadow-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-text-main text-sm md:text-lg placeholder:text-gray-400"
                                        value={draftSearchTerm}
                                        onChange={(e) => setDraftSearchTerm(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    />
                                </div>
                                <Button
                                    onClick={handleSearch}
                                    className="shrink-0 rounded-xl md:rounded-full px-5 md:px-10 py-3 md:py-4 text-sm md:text-lg group bg-linear-to-r from-primary to-primary-dip hover:shadow-glow transition-all active:scale-95"
                                >
                                    <span className="hidden sm:inline">খুঁজুন</span>
                                    <Search size={20} className="sm:hidden" />
                                    <ArrowRight className="hidden sm:inline ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                                </Button>
                            </div>

                            {/* Mobile Filter/Sort Row - Only on Phone */}
                            <div className="flex md:hidden justify-between items-center gap-4 py-1">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                                    className={`grow flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all ${isMobileFilterOpen ? 'bg-primary/5 border-primary text-primary' : 'bg-gray-50/50'}`}
                                >
                                    <Filter size={14} />
                                    ফিল্টার
                                    <span className={`ml-auto transition-transform duration-300 ${isMobileFilterOpen ? 'rotate-180' : ''}`}>
                                        <ArrowRight size={12} className="rotate-90" />
                                    </span>
                                </Button>
                                <div className="relative grow">
                                    <select
                                        title='srot'
                                        className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-100 bg-gray-50/50 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all appearance-none cursor-pointer"
                                        value={filterType}
                                        onChange={(e) => setFilterType(e.target.value as 'all' | 'price_low' | 'rating')}
                                    >
                                        <option value="all">সব দেখুন</option>
                                        <option value="price_low">কম দাম</option>
                                        <option value="rating">সেরা রেটিং</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                                        <ArrowRight size={12} className="rotate-90" />
                                    </div>
                                </div>
                            </div>

                            {/* Desktop Filters Grid & Mobile Expandable Menu */}
                            <div className={`${isMobileFilterOpen ? 'flex flex-col animate-fade-in' : 'hidden'} md:grid md:grid-cols-4 gap-3 md:gap-4`}>
                                {/* Category Picker */}
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                                        <Users size={18} />
                                    </div>
                                    <select
                                        title='category'
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-100 bg-white/50 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all appearance-none cursor-pointer"
                                        value={draftCategory}
                                        onChange={(e) => setDraftCategory(e.target.value as 'all' | 'Male' | 'Female')}
                                    >
                                        <option value="all">সকল ক্যাটাগরি</option>
                                        <option value="Male">ছাত্র (Male)</option>
                                        <option value="Female">ছাত্রী (Female)</option>
                                    </select>
                                </div>

                                {/* Division */}
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                                        <MapPin size={18} />
                                    </div>
                                    <select
                                        title='division'
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-100 bg-white/50 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all appearance-none cursor-pointer"
                                        value={draftDivision}
                                        onChange={handleDivisionChange}
                                    >
                                        <option value="">বিভাগ নির্বাচন</option>
                                        {Object.keys(BANGLADESH_LOCATIONS).map(div => (
                                            <option key={div} value={div}>{div}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* District */}
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                                        <MapPin size={18} />
                                    </div>
                                    <select
                                        title='district'
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-100 bg-white/50 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all appearance-none cursor-pointer disabled:bg-gray-50/50 disabled:text-gray-400"
                                        value={draftDistrict}
                                        onChange={handleDistrictChange}
                                        disabled={!draftDivision}
                                    >
                                        <option value="">জেলা নির্বাচন</option>
                                        {availableDistricts.map(dist => (
                                            <option key={dist} value={dist}>{dist}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Upazila */}
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                                        <MapPin size={18} />
                                    </div>
                                    <select
                                        title='upazila'
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-100 bg-white/50 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all appearance-none cursor-pointer disabled:bg-gray-50/50 disabled:text-gray-400"
                                        value={draftUpazila}
                                        onChange={(e) => setDraftUpazila(e.target.value)}
                                        disabled={!draftDistrict}
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
                </div>
            </section>

            {/* Hostel Grid Section */}
            <section id="hostels" className="container mx-auto px-3 py-3 md:py-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:pb-6 gap-4">
                    <h2 className="text-2xl md:text-3xl font-black flex items-center gap-3">
                        <Home className="text-primary" />
                        {activeFilters.searchTerm || activeFilters.category !== 'all' || activeFilters.division ? 'অনুসন্ধান ফলাফল' : 'জনপ্রিয় হোস্টেলসমূহ'}
                    </h2>
                    <div className="hidden md:flex items-center gap-3">
                        <span className="text-sm font-bold text-text-muted whitespace-nowrap">সর্ট করুন:</span>
                        <select
                            title='sort'
                            className="px-4 py-2 rounded-xl border border-gray-100 bg-white shadow-sm focus:outline-none focus:border-primary text-sm font-medium"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value as 'all' | 'price_low' | 'rating')}
                        >
                            <option value="all">সব দেখুন</option>
                            <option value="price_low">দাম (কম থেকে বেশি)</option>
                            <option value="rating">সেরা রেটিং</option>
                        </select>
                    </div>
                </div>

                {filteredHostels.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {filteredHostels.map(hostel => (
                            <HostelCard key={hostel.id} hostel={hostel} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-100">
                        <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm ring-1 ring-black/5">
                            <Search className="text-gray-300" size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-text-main">কোন হোস্টেল পাওয়া যায়নি</h3>
                        <p className="text-text-muted mt-2 max-w-sm mx-auto">আমরা আপনার অনুসন্ধানের সাথে মিলে যায় এমন কোনো হোস্টেল খুঁজে পাইনি। দয়া করে অন্য কিছু লিখে চেষ্টা করুন।</p>
                        <Button
                            variant="outline"
                            className="mt-8 px-8"
                            onClick={() => {
                                setDraftSearchTerm('');
                                setDraftCategory('all');
                                setDraftDivision('');
                                setDraftDistrict('');
                                setDraftUpazila('');
                                setActiveFilters({ searchTerm: '', category: 'all', division: '', district: '', upazila: '' });
                            }}
                        >
                            সব হোস্টেল দেখুন
                        </Button>
                    </div>
                )}
            </section>
        </div>
    );
}
