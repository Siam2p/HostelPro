import { Button } from '@/components/ui/Button';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | HostelPro',
    description: 'Get in touch with HostelPro team. We are here to help you 24/7.',
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-bg-body pb-20">
            {/* Header */}
            <section className="bg-gradient-to-r from-primary to-secondary py-20 text-center text-white relative overflow-hidden">
                <div className="relative z-10 container mx-auto px-6">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4">যোগাযোগ করুন</h1>
                    <p className="text-lg opacity-90 max-w-2xl mx-auto">
                        যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন। আমরা আপনার অপেক্ষায় আছি।
                    </p>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full mix-blend-overlay filter blur-xl animate-bounce-slow"></div>
                    <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent rounded-full mix-blend-overlay filter blur-2xl animate-pulse"></div>
                </div>
            </section>

            <div className="container mx-auto px-6 -mt-10 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        {[
                            { title: "ঠিকানা", info: "হাউজ #১২, রোড #৫, ধানমন্ডি, ঢাকা-১২০৯", icon: "📍", color: "text-red-500", bg: "bg-red-50" },
                            { title: "ইমেইল", info: "support@hostelpro.com", icon: "✉️", color: "text-blue-500", bg: "bg-blue-50" },
                            { title: "ফোন", info: "+৮৮০ ১৭১১ ২২ গগ ৫৫", icon: "📞", color: "text-green-500", bg: "bg-green-50" },
                            { title: "অফিস সময়", info: "শনি - বৃহস্পতি (সকাল ১০টা - সন্ধ্যা ৬টা)", icon: "⏰", color: "text-purple-500", bg: "bg-purple-50" }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-border flex items-start gap-4 hover:shadow-md transition-all">
                                <div className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center text-2xl`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-text-main mb-1">{item.title}</h3>
                                    <p className="text-text-muted text-sm">{item.info}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-border">
                            <h2 className="text-3xl font-bold mb-8 text-text-main">একটি বার্তা পাঠান</h2>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-text-muted">আপনার নাম</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-bg-body font-medium"
                                            placeholder="সম্পূর্ণ নাম লিখুন"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-text-muted">ফোন নম্বর</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-bg-body font-medium"
                                            placeholder="ফোন নম্বর দিন"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-muted">ইমেইল ঠিকানা</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-bg-body font-medium"
                                        placeholder="example@mail.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-muted">বিষয়</label>
                                    <select className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-bg-body font-medium">
                                        <option>বুকিং সংক্রান্ত</option>
                                        <option>পেমেন্ট সমস্যা</option>
                                        <option>অভিযোগ</option>
                                        <option>অন্যান্য</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-muted">আপনার বার্তা</label>
                                    <textarea
                                        rows={5}
                                        className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-bg-body font-medium resize-none"
                                        placeholder="আপনার বিস্তারিত বার্তা লিখুন..."
                                    ></textarea>
                                </div>

                                <Button fullWidth className="py-4 text-lg shadow-xl shadow-primary/30">
                                    বার্তা পাঠান 🚀
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}
