import React from 'react';
import { Metadata } from 'next';
import { Cookie, Settings, BarChart3, Fingerprint } from 'lucide-react';

export const metadata: Metadata = {
    title: 'কুকি পলিসি | HostelPro',
    description: 'HostelPro কীভাবে কুকিজ ব্যবহার করে সে সম্পর্কে বিস্তারিত জানুন।',
};

export default function CookiePage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 mb-10 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="relative z-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 mb-6">
                            <Cookie size={32} />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">কুকি পলিসি</h1>
                        <p className="text-slate-500 font-medium">সর্বশেষ আপডেট: জানুয়ারি ২০২৪</p>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 space-y-12">
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Settings size={20} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900">প্রয়োজনীয় কুকিজ</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            এই কুকিজগুলো আমাদের ওয়েবসাইটের মূল কার্যকারিতা যেমন লগইন, পেমেন্ট এবং সিকিউরিটির জন্য অপরিহার্য। এগুলো ছাড়া ওয়েবসাইটটি সঠিকভাবে কাজ করবে না।
                        </p>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                                <BarChart3 size={20} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900">অ্যানালিটিক্স কুকিজ</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            আমরা গুগল অ্যানালিটিক্স ব্যবহার করি এটা বোঝার জন্য যে ইউজাররা আমাদের সাইটটি কীভাবে ব্যবহার করছে। এর মাধ্যমে আমরা আমাদের সেবা আরও উন্নত করতে পারি।
                        </p>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                                <Fingerprint size={20} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900">ব্যক্তিগত পছন্দ</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            আপনার পছন্দের সেটিংস (যেমন- ভাষা বা ফিল্টার) মনে রাখার জন্য আমরা কিছু কুকিজ ব্যবহার করি যাতে আপনাকে বারবার একই কাজ করতে না হয়।
                        </p>
                    </section>

                    <section className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                        <h3 className="font-bold text-slate-900 mb-4">কুকি সেটিংস</h3>
                        <p className="text-slate-600">
                            আপনি আপনার ব্রাউজার সেটিংস থেকে যে কোনো সময় কুকিজ ব্লক বা ডিলিট করতে পারেন। তবে এতে ওয়েবসাইটের কিছু ফিচারে সমস্যা হতে পারে।
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
