import React from 'react';
import { Metadata } from 'next';
import { Undo2, Banknote, ShieldX, Clock } from 'lucide-react';

export const metadata: Metadata = {
    title: 'রিফান্ড পলিসি | HostelPro',
    description: 'HostelPro-এর রিফান্ড এবং বুকিং বাতিল সংক্রান্ত নীতিমালা।',
};

export default function RefundPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 mb-10 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="relative z-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 text-red-500 mb-6">
                            <Undo2 size={32} />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">রিফান্ড পলিসি</h1>
                        <p className="text-slate-500 font-medium">সর্বশেষ আপডেট: জানুয়ারি ২০২৪</p>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 space-y-12">
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Clock size={20} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900">বুকিং বাতিল</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            আপনি যদি বুকিং বাতিল করতে চান, তবে অবশ্যই চেক-ইন করার অন্তত ৪৮ ঘণ্টা আগে আমাদের জানাতে হবে। সময়মতো না জানালে বুকিং ফি অফেরতযোগ্য হতে পারে।
                        </p>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                                <Banknote size={20} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900">রিফান্ড প্রসেস</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            যোগ্য রিফান্ডের ক্ষেত্রে, বাতিল করার ৩-৭ কার্যদিবসের মধ্যে আপনার মূল পেমেন্ট মেথড (বিকাশ, নগদ বা ব্যাংক অ্যাকাউন্ট) এ টাকা ফেরত দেওয়া হবে।
                        </p>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                                <ShieldX size={20} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900">অফেরতযোগ্য ক্ষেত্র</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            চেক-ইন করার পর বা ৪৮ ঘণ্টার কম সময়ে বুকিং বাতিল করলে বেশিরভাগ ক্ষেত্রে সার্ভিস চার্জ এবং বুকing ফি অফেরতযোগ্য হবে।
                        </p>
                    </section>

                    <section className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                        <h3 className="font-bold text-slate-900 mb-4">সাহায্য প্রয়োজন?</h3>
                        <p className="text-slate-600">
                            রিফান্ড সংক্রান্ত যে কোনো ফিডব্যাক বা সমস্যার জন্য ইমেইল করুন:
                            <br />
                            <span className="font-bold text-red-500">refund@hostelpro.com</span>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
