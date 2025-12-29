import React from 'react';
import { Badge } from '@/components/ui/Badge';

interface NoticeBoardProps {
    notices: any[];
    activeBooking: any;
}

export default function NoticeBoard({ notices, activeBooking }: NoticeBoardProps) {
    const myHostelIds = activeBooking ? [activeBooking.hostelId] : [];
    const relevantNotices = (notices || [])
        .filter(n => myHostelIds.includes(n.hostelId))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center justify-between">
                হোস্টেল বুলেটিন (নোটিশ)
                <Badge className="bg-indigo-100 text-indigo-700 border-none px-3 font-bold">নতুন</Badge>
            </h2>
            <div className="space-y-4">
                {relevantNotices.length === 0 ? (
                    <div className="p-12 text-center bg-white rounded-3xl border-2 border-dashed border-gray-200 shadow-xs">
                        <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">আপডেটের অপেক্ষা</p>
                        <p className="text-gray-500 mt-2">কোনো অফিসিয়াল নোটিশ এখনো দেয়া হয়নি।</p>
                    </div>
                ) : (
                    relevantNotices.map(notice => (
                        <div key={notice.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group border-l-4 border-l-blue-600">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                                <h4 className="font-black text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{notice.title}</h4>
                                <Badge variant="default" className="text-[10px] uppercase font-black tracking-widest text-gray-400 border border-gray-100 bg-transparent">
                                    {notice.date}
                                </Badge>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed antialiased">{notice.content}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
