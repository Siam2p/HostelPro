import React from 'react';
import { Metadata } from 'next';
import { HelpCircle, ChevronDown, MessageCircleQuestion } from 'lucide-react';

export const metadata: Metadata = {
    title: 'কিউএ (FAQ) | HostelPro',
    description: 'সচরাচর জিজ্ঞাসিত প্রশ্ন এবং উত্তর। আপনার জিজ্ঞাসার সমাধান জানুন।',
};

export default function FAQPage() {
    const faqs = [
        {
            q: "আমি কীভাবে হোস্টেল বুক করব?",
            a: "প্রথমে লগইন করুন, আপনার পছন্দের হোস্টেলটি খুঁজুন এবং 'এখনই বুক করুন' বাটনে ক্লিক করে নির্দিষ্ট তথ্য এবং বুকিং ফি প্রদান করে কনফার্ম করুন।"
        },
        {
            q: "বুকিং ফি কি অফেরতযোগ্য?",
            a: "সাধারণত চেক-ইনের ৪৮ ঘণ্টা আগে বুকিং বাতিল করলে ফি ফেরত পাওয়া যায়। বিস্তারিত জানতে 'রিফান্ড পলিসি' চেক করুন।"
        },
        {
            q: "হোস্টেল মালিকের সাথে কি সরাসরি কথা বলা যাবে?",
            a: "হ্যাঁ, বুকিং কনফার্ম হওয়ার পর আপনি মালিকের কন্টাক্ট ইনফরমেশন পাবেন এবং সরাসরি যোগাযোগ করতে পারবেন।"
        },
        {
            q: "আমার সিকিউরিটি ডিপোজিট কি নিরাপদ?",
            a: "অবশ্যই। HostelPro আপনার সিকিউরিটি ডিপোজিট এবং পেমেন্টের পূর্ণ নিরাপত্তা নিশ্চিত করে। কোনো গরমিল হলে আমরা সরাসরি মীমাংসা করি।"
        },
        {
            q: "লগইন করতে সমস্যা হলে কী করব?",
            a: "আপনার ইমেইল এবং পাসওয়ার্ড সঠিক আছে কি না তা যাচাই করুন। পাসওয়ার্ড ভুলে গেলে 'পাসওয়ার্ড রিসেট' অপশনটি ট্রাই করুন।"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white shadow-sm border border-slate-100 text-primary mb-6">
                        <MessageCircleQuestion size={40} />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">আপনার সকল <span className="text-primary">জিজ্ঞাসার</span> উত্তর</h1>
                    <p className="text-xl text-slate-500 font-medium">সহজ সমাধান পেতে নিচের প্রশ্নগুলো দেখুন</p>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <details key={i} className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden transition-all duration-300 open:shadow-md">
                            <summary className="flex items-center justify-between p-8 cursor-pointer list-none">
                                <h3 className="text-xl font-bold text-slate-900 pr-6">{faq.q}</h3>
                                <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-open:rotate-180 group-open:bg-primary group-open:text-white transition-all">
                                    <ChevronDown size={20} />
                                </div>
                            </summary>
                            <div className="px-8 pb-8">
                                <div className="h-px w-full bg-slate-50 mb-6" />
                                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                    {faq.a}
                                </p>
                            </div>
                        </details>
                    ))}
                </div>

                {/* Still Have Questions */}
                <div className="mt-16 bg-primary rounded-[2.5rem] p-10 md:p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mb-32" />
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl font-black mb-6">আরও কোনো প্রশ্ন আছে?</h2>
                        <p className="text-white/80 text-lg mb-10 font-medium">আমাদের সাপোর্ট টিম সর্বদা আপনার সাহায্য করার জন্য প্রস্তুত। সরাসরি যোগাযোগ করুন দয়া করে।</p>
                        <a href="/contact" className="inline-flex items-center justify-center px-10 py-5 rounded-2xl bg-white text-primary font-black text-xl hover:bg-slate-50 transition-all hover:-translate-y-1 shadow-xl">
                            যোগাযোগ করুন
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
