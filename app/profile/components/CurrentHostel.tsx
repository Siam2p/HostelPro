import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface CurrentHostelProps {
    myHostel: any;
    activeBooking: any;
    onViewDetails: () => void;
    onWriteReview: () => void;
}

export default function CurrentHostel({ myHostel, activeBooking, onViewDetails, onWriteReview }: CurrentHostelProps) {
    if (!myHostel) return null;

    return (
        <Card className="overflow-hidden rounded-3xl shadow-sm border-gray-100 hover:shadow-xl transition-all group/hostel">
            <div className="h-44 relative overflow-hidden">
                <img src={myHostel.image} alt={myHostel.name} className="w-full h-full object-cover transition-transform duration-700 group-hover/hostel:scale-110" />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                    <div>
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-1">বর্তমানে থাকছেন</p>
                        <h3 className="text-white font-black text-2xl tracking-tight leading-none">{myHostel.name}</h3>
                    </div>
                </div>
            </div>
            <div className="p-6 space-y-5 bg-white">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-2xl group-hover/hostel:rotate-12 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">এলাকা / জোন</p>
                        <p className="text-sm font-bold text-gray-800">{myHostel.location}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-2xl group-hover/hostel:-rotate-12 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">আবাসিক ব্যবস্থা</p>
                        <p className="text-sm font-bold text-gray-800">রুম {activeBooking?.roomId} • বেড {activeBooking?.bedId}</p>
                    </div>
                </div>
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <Button
                        variant="outline"
                        className="flex-1 rounded-xl h-11 text-[10px] font-black uppercase tracking-widest border-gray-100 text-gray-600 hover:bg-gray-50"
                        onClick={onViewDetails}
                    >
                        বিস্তারিত তথ্য
                    </Button>
                    <Button
                        className="flex-1 rounded-xl h-11 text-[10px] font-black uppercase tracking-widest bg-blue-600 shadow-lg shadow-blue-100"
                        onClick={onWriteReview}
                    >
                        রিভিউ দিন
                    </Button>
                </div>
            </div>
        </Card>
    );
}
