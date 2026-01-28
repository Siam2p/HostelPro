import React from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import {
    Facebook,
    Instagram,
    Linkedin,
    Twitter,
    Mail,
    Phone,
    MapPin,
    ArrowRight,
    Send,
    Download,
    ShieldCheck,
    Globe
} from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        hostels: [
            { name: 'ছাত্র হোস্টেল', href: '/hostels?type=student' },
            { name: 'ওয়ার্কিং মেন মেস', href: '/hostels?type=working_men' },
            { name: 'ওয়ার্কিং ওমেন মেস', href: '/hostels?type=working_women' },
            { name: 'লাক্সারি হোস্টেল', href: '/hostels?type=luxury' },
            { name: 'বাজেট মেস', href: '/hostels?type=budget' },
        ],
        support: [
            { name: 'হেল্প সেন্টার', href: '/help' },
            { name: 'রিপোর্ট ইস্যু', href: '/report' },
            { name: 'কিউএ (FAQ)', href: '/faq' },
            { name: 'বুকিং গাইড', href: '/guide' },
        ],
        company: [
            { name: 'আমাদের সম্পর্কে', href: '/about' },
            { name: 'যোগাযোগ', href: '/contact' },
            { name: 'ক্যারিয়ার', href: '/careers' },
            { name: 'ব্লগ', href: '/blog' },
            { name: 'পার্টনারশিপ', href: '/partnership' },
        ],
        legal: [
            { name: 'প্রাইভেসি পলিসি', href: '/privacy' },
            { name: 'টার্মস এন্ড কন্ডিশন', href: '/terms' },
            { name: 'রিফান্ড পলিসি', href: '/refund' },
            { name: 'কুকি পলিসি', href: '/cookies' },
        ]
    };

    return (
        <footer className="relative mt-20 border-t border-border bg-white overflow-hidden">
            {/* Premium Decorative elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

            {/* Newsletter Section */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-20">
                <div className="bg-[#0D4D3B] rounded-3xl p-8 md:p-12 shadow-2xl shadow-emerald-900/40 overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-2xl group-hover:scale-110 transition-transform duration-700" />
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left">
                            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">নতুন আপডেট পেতে ইমেইল দিন</h2>
                            <p className="text-emerald-100/80 text-sm md:text-base font-medium">প্রতি সপ্তাহে সেরা হোস্টেল ডিল এবং নিউজলেটার পান।</p>
                        </div>
                        <form className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1 sm:w-80">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                                <input
                                    type="email"
                                    placeholder="আপনার ইমেইল অ্যাড্রেস"
                                    className="w-full h-14 px-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 backdrop-blur-md transition-all font-medium"
                                />
                            </div>
                            <button className="h-14 px-8 bg-white hover:bg-emerald-50 text-[#0D4D3B] font-black uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg group/btn">
                                সাবস্ক্রাইব করুন
                                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12 mb-16">
                    {/* Column 1: Brand */}
                    <div className="lg:col-span-4 lg:pr-10">
                        <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
                            <div className="relative h-10 w-10 group-hover:rotate-12 transition-transform duration-500">
                                <NextImage
                                    src="/brand/logo.png"
                                    alt="HostelPro Logo"
                                    fill={true}
                                    className="object-contain"
                                />
                            </div>
                            <div className="text-2xl font-black text-primary-dip tracking-tight">
                                Hostel<span className="text-primary">Pro</span>
                            </div>
                        </Link>
                        <p className="text-text-muted text-sm md:text-base leading-relaxed mb-8">
                            ব্যাচেলার এবং শিক্ষার্থীদের জন্য একটি নিরাপদ আবাসন ব্যবস্থা খুঁজে পাওয়া এখন আরও সহজ। ২,০০০+ হোস্টেল এবং মেসে আমাদের সেবা বিস্তৃত।
                        </p>
                        <div className="flex gap-3">
                            {[
                                { Icon: Facebook, href: '#', label: 'Facebook' },
                                { Icon: Instagram, href: '#', label: 'Instagram' },
                                { Icon: Linkedin, href: '#', label: 'LinkedIn' },
                                { Icon: Twitter, href: '#', label: 'Twitter' }
                            ].map(({ Icon, href, label }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    className="h-11 w-11 rounded-2xl bg-bg-subtle/50 backdrop-blur-sm border border-border-subtle flex items-center justify-center text-primary-dip hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300 shadow-sm"
                                    aria-label={label}
                                >
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Hostels */}
                    <div className="lg:col-span-2">
                        <h3 className="text-gray-900 font-black text-xs uppercase tracking-widest mb-8 flex items-center gap-2">
                            <Globe size={14} className="text-primary" />
                            হোস্টেলসমূহ
                        </h3>
                        <ul className="flex flex-col gap-4">
                            {footerLinks.hostels.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-text-muted hover:text-primary transition-all text-sm font-bold flex items-center gap-2 group whitespace-nowrap">
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Company & Support */}
                    <div className="lg:col-span-2">
                        <h3 className="text-gray-900 font-black text-xs uppercase tracking-widest mb-8 flex items-center gap-2">
                            <ShieldCheck size={14} className="text-primary" />
                            সহায়তা
                        </h3>
                        <ul className="flex flex-col gap-4">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-text-muted hover:text-primary transition-all text-sm font-bold flex items-center gap-2 group whitespace-nowrap">
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: App Download & Contact Info */}
                    <div className="lg:col-span-4 flex flex-col gap-10">
                        <div>
                            <h3 className="text-gray-900 font-black text-xs uppercase tracking-widest mb-8 flex items-center gap-2">
                                <Download size={14} className="text-primary" />
                                অ্যাপ ডাউনলোড করুন
                            </h3>
                            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4">
                                <Link href="#" className="flex-1 bg-[#1A1C1E] text-white py-3 px-5 rounded-2xl flex items-center gap-3 hover:bg-[#2A2C2E] transition-all group active:scale-95 shadow-xl border border-white/5">
                                    <div className="h-7 w-7 relative flex shrink-0 items-center justify-center">
                                        <svg viewBox="0 0 24 24" className="w-full h-full text-white fill-current">
                                            <path d="M5.1,1.1 C4.8,1.4 4.6,1.9 4.6,2.5 L4.6,21.5 C4.6,22.1 4.8,22.6 5.1,22.9 L5.2,23 L15.6,12.6 L15.6,12.4 L5.2,2 C5.2,2 5.1,2 5.1,1.1 Z" />
                                            <path d="M19,16 L15.6,12.6 L15.6,12.4 L19,9 L19.1,9.1 L23.1,11.4 C24.2,12 24.2,13 23.1,13.6 L19.1,15.9 L19,16 Z" />
                                            <path d="M5.2,23 C5.5,23.3 6,23.3 6.6,23 L19,16 L15.6,12.6 L5.2,23 Z" />
                                            <path d="M5.2,2 C6,1.7 6.7,1.7 7.2,2 L19,9 L15.6,12.4 L5.2,2 Z" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none">GET IT ON</span>
                                        <span className="text-sm font-black tracking-tight leading-tight mt-0.5">Google Play</span>
                                    </div>
                                </Link>
                                <Link href="#" className="flex-1 bg-[#1A1C1E] text-white py-3 px-5 rounded-2xl flex items-center gap-3 hover:bg-[#2A2C2E] transition-all group active:scale-95 shadow-xl border border-white/5">
                                    <div className="h-7 w-7 relative flex shrink-0 items-center justify-center">
                                        <svg viewBox="0 0 24 24" className="w-full h-full text-white fill-current">
                                            <path d="M17.062,14.125 c0.021,2.502,2.152,3.334,2.177,3.346c-0.018,0.062-0.339,1.162-1.111,2.285C17.46,20.739,16.73,22,15.344,22 c-1.359,0-1.789-0.824-3.344-0.824c-1.554,0-2.032,0.8-3.32,0.8c-1.288,0-2.112-1.354-2.825-2.381 c-1.458-2.1-2.57-5.925-1.07-8.525c0.744-1.291,2.074-2.112,3.525-2.133c1.102-0.016,2.138,0.744,2.812,0.744 c0.672,0,1.92-0.92,3.225-0.789c0.55,0.021,2.083,0.221,3.07,1.662C20.354,10.648,20.3,10.7,17.062,14.125z M14.73,6.234 c0.54-0.655,0.902-1.56,0.803-2.469c-0.771,0.031-1.706,0.516-2.258,1.158c-0.496,0.575-0.929,1.5-0.814,2.389 C13.34,7.387,14.184,6.884,14.73,6.234z" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none">DOWNLOAD ON</span>
                                        <span className="text-sm font-black tracking-tight leading-tight mt-0.5">App Store</span>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="p-6 rounded-3xl bg-[#F0FDF4] border border-emerald-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-10 -mt-10 blur-xl group-hover:scale-150 transition-transform duration-700" />
                            <h4 className="font-black text-[#0D4D3B] text-sm mb-6 relative z-10">আমাদের সাথে যোগাযোগ করুন</h4>
                            <div className="flex flex-col gap-4 relative z-10">
                                <a href="tel:+৮৮০ ১২৩৪ ৫৬৭৮৯০" className="flex items-center gap-4 text-emerald-900/70 hover:text-[#0D4D3B] transition-colors group/item">
                                    <div className="h-10 w-10 rounded-2xl bg-white flex items-center justify-center text-[#0D4D3B] shadow-sm group-hover/item:scale-110 transition-all border border-emerald-50">
                                        <Phone size={16} />
                                    </div>
                                    <span className="text-sm font-bold tracking-tight">+৮৮০ ১২৩৪ ৫৬৭৮৯০</span>
                                </a>
                                <a href="mailto:support@hostelpro.com" className="flex items-center gap-4 text-emerald-900/70 hover:text-[#0D4D3B] transition-colors group/item">
                                    <div className="h-10 w-10 rounded-2xl bg-white flex items-center justify-center text-[#0D4D3B] shadow-sm group-hover/item:scale-110 transition-all border border-emerald-50">
                                        <Mail size={16} />
                                    </div>
                                    <span className="text-sm font-bold tracking-tight">support@hostelpro.com</span>
                                </a>
                                <div className="flex items-center gap-4 text-emerald-900/70 group/item">
                                    <div className="h-10 w-10 rounded-2xl bg-white flex items-center justify-center text-[#1A1C1E] shadow-sm">
                                        <MapPin size={16} />
                                    </div>
                                    <span className="text-sm font-bold tracking-tight">মিরপুর-১০, ঢাকা, বাংলাদেশ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Separator */}
                <div className="h-px w-full bg-linear-to-r from-transparent via-border to-transparent mb-10" />

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                        <p className="text-text-muted text-sm font-bold">
                            © {currentYear} <span className="text-primary-dip font-black tracking-tight">Hostel<span className="text-primary">Pro</span></span>. All rights reserved.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
                        {footerLinks.legal.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-text-muted hover:text-primary text-xs font-black uppercase tracking-widest transition-all hover:translate-y-[-1px]"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-linear-to-r from-transparent via-primary/20 to-transparent blur-sm" />
        </footer>
    );
}
