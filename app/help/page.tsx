import React from 'react';
import { Metadata } from 'next';
import { HelpCircle, Search, MessageSquare, PhoneCall, BookOpen, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
    title: 'হেল্প সেন্টার | HostelPro',
    description: 'HostelPro হেল্প সেন্টার। আপনার যে কোনো জিজ্ঞাসা বা সমস্যার সমাধান এখানে পাবেন।',
};

export default function HelpPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Hero Section */}
                <div className="bg-primary rounded-[3rem] p-10 md:p-20 shadow-2xl text-center text-white relative overflow-hidden mb-16">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
                    <div className="relative z-10">
                        <h1 className="text-3xl md:text-6xl font-black mb-6">আমরা কীভাবে আপনাকে <br /> সাহায্য করতে পারি?</h1>
                        <div className="max-w-2xl mx-auto relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary group-focus-within:scale-110 transition-transform" size={24} />
                            <input
                                type="text"
                                placeholder="একটি সমস্যা বা কীওয়ার্ড লিখে সার্চ করুন..."
                                className="w-full h-16 pl-16 pr-6 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none shadow-xl border-none text-lg font-medium"
                            />
                        </div>
                    </div>
                </div>

                {/* Popular Topics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {[
                        { title: "অ্যাকাউন্ট সেটিংস", icon: <ShieldCheck size={32} />, color: "bg-blue-50 text-blue-600" },
                        { title: "বুকিং প্রসেস", icon: <BookOpen size={32} />, color: "bg-emerald-50 text-emerald-600" },
                        { title: "পেমেন্ট ইস্যু", icon: <HelpCircle size={32} />, color: "bg-amber-50 text-amber-600" }
                    ].map((topic, i) => (
                        <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-glow transition-all duration-300 group cursor-pointer text-center">
                            <div className={`w-16 h-16 rounded-2xl ${topic.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                                {topic.icon}
                            </div>
                            <h3 className="text-xl font-black text-slate-900">{topic.title}</h3>
                        </div>
                    ))}
                </div>

                {/* Support Contact */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6">
                        <h2 className="text-3xl font-black text-slate-900 leading-tight">সরাসরি আমাদের সাথে <br /><span className="text-primary">কথা বলুন</span></h2>
                        <p className="text-slate-600 text-lg">
                            আপনার সমস্যার সমাধান এখানে খুঁজে না পেলে সরাসরি আমাদের কাস্টমার কেয়ার টিমের সাথে যোগাযোগ করুন। আমরা ২৪/৭ আপনার সেবায় নিয়োজিত।
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <a href="tel:+8801234567890" className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors">
                                <PhoneCall size={20} />
                                কল করুন
                            </a>
                            <a href="mailto:support@hostelpro.com" className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white border-2 border-slate-100 text-slate-900 font-bold hover:bg-slate-50 transition-all">
                                <MessageSquare size={20} />
                                মেসেজ দিন
                            </a>
                        </div>
                    </div>
                    <div className="flex-shrink-0 w-full md:w-80 aspect-square bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-center p-10">
                        <div className="relative w-full h-full">
                            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                            <HelpCircle size={100} className="text-primary relative z-10 mx-auto mt-10 animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
