import React from 'react';
import { Metadata } from 'next';
import { BookOpen, Search, MousePointer2, CreditCard, Home, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'বুকিং গাইড | HostelPro',
    description: 'HostelPro-তে হোস্টেল বুকিং করার সঠিক নিয়মাবলী এবং গাইড।',
};

export default function GuidePage() {
    const steps = [
        {
            title: "সার্চ করুন",
            desc: "আপনার পছন্দের এলাকা বা হোস্টেলের ধরণ দিয়ে সার্চ বারে খুঁজুন।",
            icon: <Search size={28} />,
            color: "bg-blue-100 text-blue-600"
        },
        {
            title: "ডিটেইলস দেখুন",
            desc: "হোস্টেলের ছবি, সুযোগ-সুবিধা এবং ইউজার রিভিউ ভালোমতো দেখে নিন।",
            icon: <MousePointer2 size={28} />,
            color: "bg-purple-100 text-purple-600"
        },
        {
            title: "সিট সিলেক্ট করুন",
            desc: "আপনার প্রয়োজনীয় রুম এবং সিট সিলেক্ট করে বুকিং বাটনে ক্লিক করুন।",
            icon: <Home size={28} />,
            color: "bg-emerald-100 text-emerald-600"
        },
        {
            title: "পেমেন্ট করুন",
            desc: "বিকাশ, নগদ বা ব্যাংক কার্ডের মাধ্যমে ছোট একটি বুকিং ফি দিয়ে সিট কনফার্ম করুন।",
            icon: <CreditCard size={28} />,
            color: "bg-amber-100 text-amber-600"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 text-primary mb-6">
                        <BookOpen size={40} />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">সহজ ৪টি ধাপে <br /> বুকিং সম্পন্ন করুন</h1>
                    <p className="text-xl text-slate-500 font-medium">HostelPro-তে হোস্টেল বুকিং করা এখন একদম সহজ</p>
                </div>

                {/* Steps */}
                <div className="relative">
                    {/* Vertical Line for progress */}
                    <div className="absolute left-8 top-10 bottom-10 w-1 bg-slate-200 hidden md:block" />

                    <div className="space-y-12">
                        {steps.map((step, idx) => (
                            <div key={idx} className="relative flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
                                <div className={`shrink-0 w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center text-2xl font-black shadow-lg relative z-10 scale-110 md:scale-100`}>
                                    {step.icon}
                                </div>
                                <div className="flex-1 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:translate-x-2 transition-all">
                                    <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                                        <span className="text-primary">ধাপ {idx + 1}:</span>
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-600 text-lg leading-relaxed font-outfit font-medium">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-20 p-1 bg-linear-to-r from-primary/20 via-primary/50 to-secondary/20 rounded-[3rem]">
                    <div className="bg-white rounded-[2.8rem] p-10 md:p-16 text-center shadow-xl">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8">সবাই কি বুঝেছেন?</h2>
                        <p className="text-slate-500 text-lg mb-12 font-medium">আর দেরি না করে আপনার জন্য সেরা হোস্টেলটি খুঁজে নিন আজই।</p>
                        <a href="/hostels" className="inline-flex items-center justify-center gap-3 px-12 py-5 rounded-2xl bg-primary text-white font-black text-2xl hover:bg-primary-dip transition-all shadow-xl shadow-primary/20 group">
                            সার্চ শুরু করুন
                            <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
