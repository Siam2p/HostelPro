import React from 'react';
import { Metadata } from 'next';
import { AlertCircle, Send, MessageSquareWarning, ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
    title: 'রিপোর্ট ইস্যু | HostelPro',
    description: 'HostelPro-তে কোনো রিপোর্ট বা অভিযোগ করার জন্য এই পেজটি ব্যবহার করুন।',
};

export default function ReportPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 mb-10 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -ml-32 -mt-32" />
                    <div className="relative z-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-50 text-orange-600 mb-6">
                            <ShieldAlert size={32} />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">রিপোর্ট ইস্যু</h1>
                        <p className="text-slate-500 font-medium font-outfit">Submit your complaints or issues</p>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100">
                    <form className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="text-sm font-black text-slate-900 uppercase tracking-widest">আপনার নাম</label>
                                <input type="text" placeholder="নাম লিখুন" className="w-full h-14 px-6 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-sm font-black text-slate-900 uppercase tracking-widest">ইমেইল / ফোন</label>
                                <input type="text" placeholder="যোগাযোগের মাধ্যম" className="w-full h-14 px-6 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-black text-slate-900 uppercase tracking-widest">সমস্যার ধরণ</label>
                            <select className="w-full h-14 px-6 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium">
                                <option>বুকিং সমস্যা</option>
                                <option>পেমেন্ট সমস্যা</option>
                                <option>হোস্টেল মালিকের অভিযোগ</option>
                                <option>টেকনিক্যাল বাগ</option>
                                <option>অন্যান্য</option>
                            </select>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-black text-slate-900 uppercase tracking-widest">বিস্তারিত বিবরণ</label>
                            <textarea rows={5} placeholder="আপনার সমস্যাটি বিস্তারিত লিখুন..." className="w-full p-6 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium" />
                        </div>

                        <button type="submit" className="w-full h-16 bg-primary text-white rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-primary-dip transition-all shadow-xl shadow-primary/20">
                            রিপোর্ট সাবমিট করুন
                            <Send size={24} />
                        </button>
                    </form>
                </div>

                <div className="mt-10 flex items-center gap-4 p-6 rounded-3xl bg-blue-50 border border-blue-100 text-blue-800">
                    <AlertCircle size={24} className="shrink-0" />
                    <p className="text-sm font-medium leading-relaxed">
                        জরুরি সাহায্যের প্রয়োজন হলে সরাসরি আমাদের হেল্পলাইনে কল করুন। আপনার অভিযোগটি অত্যন্ত গুরুত্বের সাথে দেখা হবে এবং ২৪ ঘণ্টার মধ্যে ব্যবস্থা নেয়া হবে।
                    </p>
                </div>
            </div>
        </div>
    );
}
