import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Target, Heart, ShieldCheck, Award, Users, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'আমাদের সম্পর্কে | HostelPro',
    description: 'HostelPro একটি আধুনিক প্ল্যাটফর্ম যা শিক্ষার্থীদের জন্য নিরাপদ এবং সাশ্রয়ী আবাসন খুঁজে পেতে সাহায্য করে। আমাদের লক্ষ্য হলো হোস্টেল বুকিং প্রক্রিয়াকে সহজ এবং ডিজিটাল করা।',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen pb-10 overflow-hidden">
            {/* Hero Section */}
            <section className="relative pt-10 pb-3 md:pt-24 md:pb-24 text-center overflow-hidden">
                {/* Abstract Background Elements */}
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="container mx-auto px-3 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tight leading-tight">
                            আমাদের সম্পর্কে <br />
                            <span className="bg-linear-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent">
                                কিছু কথা
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-text-muted mb-6 max-w-2xl mx-auto leading-relaxed font-medium">
                            HostelPro একটি আধুনিক প্ল্যাটফর্ম যা শিক্ষার্থীদের জন্য নিরাপদ এবং সাশ্রয়ী আবাসন খুঁজে পেতে সাহায্য করে। আমাদের লক্ষ্য হলো হোস্টেল বুকিং প্রক্রিয়াকে সহজ এবং ডিজিটাল করা।
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24 bg-white/40 backdrop-blur-md relative">
                <div className="container mx-auto px-3">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 space-y-8 text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm">
                                <Target size={18} />
                                আমাদের মিশন
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-text-main leading-tight">
                                আমরা বিশ্বাস করি প্রতিটি ছাত্রের একটি <br />
                                <span className="text-primary">নিরাপদ পরিবেশ</span> পাওয়ার অধিকার আছে
                            </h2>
                            <p className="text-text-muted text-lg md:text-xl leading-relaxed">
                                আমাদের প্ল্যাটফর্মের মাধ্যমে আমরা ছাত্র এবং হোস্টেল মালিকদের মধ্যে একটি স্বচ্ছ সংযোগ স্থাপন করতে চাই। আমরা কেবল একটি ওয়েবসাইটের চেয়ে বেশি—আমরা আপনার দ্বিতীয় বাড়ির বিশ্বস্ত সঙ্গী।
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                                {[
                                    { title: "১০০০+ শিক্ষার্থী", desc: "আমাদের উপর ভরসা করেন", icon: <Users className="text-primary" /> },
                                    { title: "৫০+ হোস্টেল", desc: "ভেরিফাইড লিস্টেড", icon: <ShieldCheck className="text-secondary" /> },
                                    { title: "২৪/৭ সাপোর্ট", desc: "যে কোনো প্রয়োজনে", icon: <Heart className="text-red-500" /> },
                                    { title: "নিরাপদ পেমেন্ট", desc: "সম্পূর্ণ ক্যাশলেস", icon: <Award className="text-yellow-600" /> }
                                ].map((stat, idx) => (
                                    <div key={idx} className="p-6 rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 flex items-start gap-4 hover:shadow-glow transition-all duration-300">
                                        <div className="p-3 rounded-xl bg-gray-50">{stat.icon}</div>
                                        <div>
                                            <h3 className="font-bold text-xl text-text-main">{stat.title}</h3>
                                            <p className="text-sm text-text-muted">{stat.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 w-full lg:w-auto">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-linear-to-tr from-primary/20 to-secondary/20 rounded-[3rem] blur-2xl opacity-50" />
                                <div className="relative aspect-square md:aspect-video lg:aspect-square bg-white rounded-[2.5rem] shadow-2xl border border-white p-2 overflow-hidden group">
                                    <div className="absolute inset-0 bg-slate-50 flex items-center justify-center">
                                        <div className="flex flex-col items-center gap-4 text-gray-300 group-hover:scale-110 transition-transform duration-700">
                                            <div className="w-24 h-24 rounded-full border-4 border-dashed border-gray-200 flex items-center justify-center">
                                                <Target size={48} />
                                            </div>
                                            <span className="font-bold text-lg">Goal Oriented Support</span>
                                        </div>
                                    </div>
                                    {/* Glass Overlay Card */}
                                    <div className="absolute bottom-8 left-8 right-8 bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/50 shadow-xl">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
                                                H
                                            </div>
                                            <div>
                                                <div className="font-bold text-text-main">HostelPro Team</div>
                                                <div className="text-sm text-text-muted">Working for you since 2023</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 relative">
                <div className="container mx-auto px-3">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-4xl md:text-5xl font-black mb-6">আমাদের <span className="text-secondary">মূল্যবোধ</span></h2>
                        <p className="text-lg text-text-muted">আমরা সততা, স্বচ্ছতা এবং নিরাপত্তার সাথে কাজ করি যাতে আপনার অভিজ্ঞতা হয় সেরা।</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {[
                            { title: "সম্পূর্ণ স্বচ্ছতা", icon: CheckCircle2, iconColor: "text-primary", desc: "কোন লুকানো চার্জ নেই, প্রতিটি হোস্টেলের সব তথ্য পরিষ্কার এবং নির্ভুলভাবে প্রদান করা হয়।" },
                            { title: "দ্রুত সাপোর্ট", icon: Heart, iconColor: "text-secondary", desc: "আমাদের কাস্টমার কেয়ার টিম সর্বদা আপনাকে সাহায্য এবং পরামর্শ দিতে প্রস্তুত।" },
                            { title: "ভেরিফাইড হোস্টেল", icon: ShieldCheck, iconColor: "text-green-500", desc: "প্রতিটি হোস্টেল আমাদের টিম দ্বারা সরেজমিনে পরিদর্শন এবং কোয়ালিটি চেক করা হয়।" }
                        ].map((item, idx) => (
                            <div key={idx} className="group p-10 rounded-[2.5rem] bg-white border border-gray-100 hover:border-primary/20 shadow-sm hover:shadow-glow transition-all duration-500 text-left">
                                <div className="p-4 rounded-2xl bg-gray-50 w-fit mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <item.icon size={32} className={item.iconColor} />
                                </div>
                                <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                                <p className="text-text-muted text-lg leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="pt-6 container mx-auto px-3">
                <div className="relative rounded-[3rem] overflow-hidden bg-linear-to-r from-primary via-blue-600 to-secondary p-12 md:p-24 text-center text-white">
                    {/* Background decorations */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-white opacity-5 rounded-full blur-[100px]" />
                        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-black opacity-5 rounded-full blur-[80px]" />
                    </div>

                    <div className="relative z-10 max-w-3xl mx-auto space-y-10">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight">আপনি কি হোস্টেল খুঁজছেন?</h2>
                        <p className="text-white/90 text-xl font-medium leading-relaxed">
                            হাজার হাজার শিক্ষার্থীদের সাথে যোগ দিন যারা HostelPro-র মাধ্যমে তাদের দ্বিতীয় বাড়ি খুঁজে পেয়েছে। আজই আপনার জার্নি শুরু করুন।
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link href="/hostels">
                                <Button className="bg-white text-primary hover:bg-slate-50 border-none px-12 py-5 rounded-2xl text-xl font-black shadow-xl hover:-translate-y-1 transition-all">
                                    এখন শুরু করুন
                                    <ArrowRight className="ml-2" />
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button variant="ghost" className="text-white hover:bg-white/10 px-10 py-5 rounded-2xl text-lg font-bold border-2 border-white/20">
                                    আরও জানুন
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
