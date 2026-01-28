import React from 'react';
import { Metadata } from 'next';
import { Gavel, ScrollText, AlertTriangle, CheckSquare } from 'lucide-react';

export const metadata: Metadata = {
    title: 'টার্মস এন্ড কন্ডিশন | HostelPro',
    description: 'HostelPro ব্যবহারের নিয়মাবলী এবং শর্তসমূহ।',
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 mb-10 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -ml-32 -mt-32" />
                    <div className="relative z-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/10 text-secondary mb-6">
                            <Gavel size={32} />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">টার্মস এন্ড কন্ডিশন</h1>
                        <p className="text-slate-500 font-medium">সর্বশেষ আপডেট: জানুয়ারি ২০২৪</p>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 space-y-12">
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <ScrollText size={20} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900">বুকিং শর্তাবলী</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            HostelPro-এর মাধ্যমে কোনো হোস্টেল বা মেস বুক করার ক্ষেত্রে নিচের শর্তাবলী প্রযোজ্য হবে:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                            <li>ইউজারকে অবশ্যই সঠিক এনআইডি বা স্টুডেন্ট আইডি প্রদান করতে হবে।</li>
                            <li>বুকিং কনফার্ম করার জন্য নির্দিষ্ট পরিমাণ বুকিং ফি অগ্রিম প্রদান করতে হবে।</li>
                            <li>হোস্টেল মালিকের নিয়মাবলী অনুযায়ী আপনাকে চলতে হবে।</li>
                        </ul>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                                <AlertTriangle size={20} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900">জরিমানা ও দায়বদ্ধতা</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            ব্যবহৃত আসবাবপত্র বা রুমের কোনো ক্ষতি করলে হোস্টেলের নিয়ম অনুযায়ী ক্ষতিপূরণ দিতে হবে। HostelPro কেবল বুকিং মিডিয়া হিসেবে কাজ করে, হোস্টেলের অভ্যন্তরীণ বিষয়াদির জন্য মালিক দায়বদ্ধ থাকবেন।
                        </p>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                                <CheckSquare size={20} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900">অ্যাকাউন্ট বাতিল</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            কোনো জাল তথ্য প্রদান বা অসামাজিক কার্যকলাপে লিপ্ত থাকলে HostelPro আপনার অ্যাকাউন্ট স্থায়ীভাবে বাতিল করার অধিকার রাখে।
                        </p>
                    </section>

                    <section className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                        <h3 className="font-bold text-slate-900 mb-4">আইনি পরামর্শ</h3>
                        <p className="text-slate-600">
                            যেকোনো বিরোধের ক্ষেত্রে বাংলাদেশের আইন অনুযায়ী মীমাংসা করা হবে। আরও তথ্যের জন্য ইমেইল করুন:
                            <br />
                            <span className="font-bold text-secondary">legal@hostelpro.com</span>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
