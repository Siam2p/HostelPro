import React from 'react';
import { Metadata } from 'next';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export const metadata: Metadata = {
    title: 'প্রাইভেসি পলিসি | HostelPro',
    description: 'HostelPro-এর প্রাইভেসি পলিসি। আমরা কীভাবে আপনার তথ্য সংগ্রহ এবং সুরক্ষা করি সে সম্পর্কে বিস্তারিত জানুন।',
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 mb-10 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="relative z-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
                            <Shield size={32} />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">প্রাইভেসি পলিসি</h1>
                        <p className="text-slate-500 font-medium">সর্বশেষ আপডেট: জানুয়ারি ২০২৪</p>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 space-y-12">
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Eye size={20} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900">তথ্য সংগ্রহ</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            HostelPro-তে আপনার অভিজ্ঞতা উন্নত করতে আমরা বিভিন্ন ধরণের তথ্য সংগ্রহ করি। এর মধ্যে রয়েছে:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                            <li>আপনার নাম, ইমেইল এবং ফোন নম্বর।</li>
                            <li>আপনার এনআইডি (NID) বা ছাত্র আইডি ভেরিফিকেশনের জন্য।</li>
                            <li>আপনার ডিভাইসের তথ্য এবং আইপি অ্যাড্রেস।</li>
                        </ul>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                <Lock size={20} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900">তথ্যের সুরক্ষা</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            আমরা আপনার তথ্যের সর্বোচ্চ নিরাপত্তা নিশ্চিত করতে আধুনিক এনক্রিপশন প্রযুক্তি ব্যবহার করি। আপনার ব্যক্তিগত তথ্য কখনোই কোনো তৃতীয় পক্ষের কাছে অনুমতি ছাড়া বিক্রি বা শেয়ার করা হয় না।
                        </p>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                <FileText size={20} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900">কুকি পলিসি</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            আমাদের ওয়েবসাইটটি সঠিকভাবে পরিচালনার জন্য আমরা কুকিজ ব্যবহার করি। এটি আমাদের বুঝতে সাহায্য করে যে আপনি কীভাবে আমাদের সাইট ব্যবহার করছেন এবং আমরা কীভাবে আপনার জন্য আরও ভালো সেবা প্রদান করতে পারি।
                        </p>
                    </section>

                    <section className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                        <h3 className="font-bold text-slate-900 mb-4">যোগাযোগ</h3>
                        <p className="text-slate-600">
                            আমাদের প্রাইভেসি পলিসি সম্পর্কে আপনার কোনো প্রশ্ন থাকলে, দয়া করে যোগাযোগ করুন:
                            <br />
                            <span className="font-bold text-primary">privacy@hostelpro.com</span>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
