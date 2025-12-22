import React from 'react';
import { Button } from '@/components/ui/Button';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us | HostelPro',
    description: 'Learn about HostelPro, our mission to help students find safe and affordable hostels in Bangladesh.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen pb-20">
            {/* Hero Section */}
            <section className="relative py-24 text-center overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full filter blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                        আমাদের সম্পর্কে <br />
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            কিছু কথা
                        </span>
                    </h1>
                    <p className="text-lg text-text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
                        HostelPro একটি আধুনিক প্ল্যাটফর্ম যা শিক্ষার্থীদের জন্য নিরাপদ এবং সাশ্রয়ী আবাসন খুঁজে পেতে সাহায্য করে। আমাদের লক্ষ্য হলো হোস্টেল বুকিং প্রক্রিয়াকে সহজ এবং ডিজিটাল করা।
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 bg-white/50 backdrop-blur-sm">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 space-y-6">
                            <h2 className="text-3xl font-bold text-text-main">
                                আমাদের <span className="text-primary">লক্ষ্য</span>
                            </h2>
                            <p className="text-text-muted text-lg leading-relaxed">
                                আমরা বিশ্বাস করি প্রতিটি ছাত্রের একটি নিরাপদ এবং আরামদায়ক পরিবেশ পাওয়ার অধিকার আছে। আমাদের প্ল্যাটফর্মের মাধ্যমে আমরা ছাত্র এবং হোস্টেল মালিকদের মধ্যে একটি স্বচ্ছ সংযোগ স্থাপন করতে চাই।
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                {[
                                    { title: "১০০০+ শিক্ষার্থী", desc: "আমাদের উপর ভরসা করেন" },
                                    { title: "৫০+ হোস্টেল", desc: "ভেরিফাইড লিস্টেড" },
                                    { title: "২৪/৭ সাপোর্ট", desc: "যে কোনো প্রয়োজনে" },
                                    { title: "নিরাপদ পেমেন্ট", desc: "সম্পূর্ণ ক্যাশলেস" }
                                ].map((stat, idx) => (
                                    <div key={idx} className="p-4 rounded-xl bg-white shadow-sm border border-border hover:shadow-md transition-shadow">
                                        <h3 className="font-bold text-xl text-secondary">{stat.title}</h3>
                                        <p className="text-sm text-text-muted">{stat.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-2xl opacity-10 transform rotate-3 scale-105"></div>
                            <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-border">
                                <div className="space-y-4">
                                    <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                                    <div className="h-4 bg-slate-100 rounded w-full"></div>
                                    <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                                    <div className="h-32 bg-slate-100 rounded w-full mt-6 flex items-center justify-center text-text-muted">
                                        [Image Placeholder: Team Working]
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">কেন <span className="text-secondary">আমরা সেরা?</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "সম্পূর্ণ স্বচ্ছতা", icon: "✨", desc: "কোন লুকানো চার্জ নেই, সব তথ্য পরিষ্কার এবং সঠিক।" },
                            { title: "দ্রুত সাপোর্ট", icon: "🚀", desc: "আমাদের কাস্টমার কেয়ার টিম সর্বদা আপনাকে সাহায্য করতে প্রস্তুত।" },
                            { title: "ভেরিফাইড হোস্টেল", icon: "🛡️", desc: "প্রতিটি হোস্টেল আমাদের টিম দ্বারা সরেজমিনে পরিদর্শন করা হয়।" }
                        ].map((item, idx) => (
                            <div key={idx} className="group p-8 rounded-2xl bg-white border border-border hover:border-primary/30 hover:shadow-glow transition-all duration-300">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-text-muted">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 container mx-auto px-6">
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary to-secondary p-12 text-center text-white">
                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <h2 className="text-3xl font-bold">আজই জয়েন করুন!</h2>
                        <p className="text-white/90 text-lg">
                            আপনার পছন্দের হোস্টেল বুক করতে দেরি করবেন না। এখনই সাইন আপ করুন।
                        </p>
                        <Button variant="ghost" className="bg-white text-primary hover:bg-slate-100 border-none px-8 py-3 mt-4">
                            অ্যাকাউন্ট খুলুন
                        </Button>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 p-12 opacity-10 transform translate-x-1/2 -translate-y-1/2">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-96 h-96 fill-white">
                            <path d="M42.7,-62.9C50.9,-52.8,50.1,-34.4,51.7,-19.2C53.4,-4,57.4,8,54,17.7C50.6,27.4,39.9,34.8,29.1,41.4C18.3,47.9,7.5,53.6,-4.1,59.2C-15.7,64.9,-28.1,70.4,-39.7,64.5C-51.4,58.6,-62.3,41.2,-64.3,22.9C-66.3,4.6,-59.4,-14.7,-50.2,-29.6C-41,-44.5,-29.5,-55,-18,-57.4C-6.5,-59.9,4.9,-54.3,16,-50C27.1,-45.7,37.8,-42.7,42.7,-62.9Z" transform="translate(100 100)" />
                        </svg>
                    </div>
                </div>
            </section>
        </div>
    );
}
