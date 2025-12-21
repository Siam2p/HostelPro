"use client";

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { HostelCard } from '@/components/HostelCard';
import { Button } from '@/components/ui/Button';
import JsonLd from '@/components/JsonLd';

export default function Home() {
  const { hostels } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'price_low' | 'rating'>('all');

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
    .filter(h =>
      h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (filterType === 'price_low') return a.price - b.price;
      if (filterType === 'rating') return b.rating - a.rating;
      return 0; // Default ID order
    });

  return (
    <div className="pb-20">
      <JsonLd data={jsonLd} />
      {/* Hero Section */}
      <section className="py-24 text-center bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.1),transparent_40%)]">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in">
            আমরা খুঁজে দেব আপনার <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              নিরাপদ ঠিকানা
            </span>
          </h1>
          <p className="text-lg text-text-muted mb-10 max-w-2xl mx-auto">
            সেরা মানের ছাত্র হোস্টেল খুঁজুন সহজে।verified রিভিউ, সেরা দাম এবং নিরাপদ পরিবেশ।
          </p>

          <div className="bg-white p-3 rounded-full shadow-lg max-w-2xl mx-auto flex flex-col md:flex-row gap-2 border border-border">
            <input
              type="text"
              placeholder="লোকেশন বা হোস্টেলের নাম খুঁজুন..."
              className="flex-grow px-6 py-3 rounded-full focus:outline-none text-text-main"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button className="rounded-full px-8 py-3">
              খুঁজুন
            </Button>
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
