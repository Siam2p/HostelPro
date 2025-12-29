import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface FinancialSummaryProps {
    activeBooking: any;
    myHostel: any;
    onViewHistory: () => void;
}

export default function FinancialSummary({ activeBooking, myHostel, onViewHistory }: FinancialSummaryProps) {
    if (!activeBooking) return null;

    return (
        <Card className="p-8 rounded-3xl shadow-sm border-gray-100 bg-linear-to-br from-white to-gray-50 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/5 rounded-full blur-3xl"></div>
            <h2 className="text-lg font-bold mb-6 flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                </div>
                আর্থিক সারসংক্ষেপ
            </h2>

            <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-100">
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">চলতি মাসের অবস্থা ({new Date().toLocaleString('bn-BD', { month: 'long' })})</span>
                {activeBooking.monthlyFeeStatus === 'paid' ? (
                    <Badge variant="success" className="px-4 py-1.5 font-black tracking-widest border-none shadow-sm shadow-green-200">পরিশোধিত</Badge>
                ) : activeBooking.monthlyFeeStatus === 'pending' ? (
                    <Badge variant="warning" className="px-4 py-1.5 font-black tracking-widest border-none shadow-sm shadow-orange-200">অপেক্ষমান</Badge>
                ) : (
                    <Badge variant="danger" className="px-4 py-1.5 font-black tracking-widest border-none shadow-sm shadow-red-200">অপরিশোধিত</Badge>
                )}
            </div>

            <div className="space-y-6">
                <div className="flex justify-between items-center group">
                    <span className="text-sm font-bold text-gray-500 group-hover:text-gray-700 transition-colors">শেষ লেনদেন</span>
                    <span className="text-sm font-black text-gray-900">{activeBooking.lastPaymentDate || 'অপেক্ষমান'}</span>
                </div>
                <div className="flex justify-between items-center group">
                    <span className="text-sm font-bold text-gray-500 group-hover:text-gray-700 transition-colors">মাসিক ভাড়া</span>
                    <div className="text-right">
                        <span className="text-lg font-black text-blue-600">৳{myHostel?.price || 0}</span>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">ভ্যাট সহ</p>
                    </div>
                </div>
            </div>

            <Button
                variant="outline"
                className="w-full mt-8 rounded-2xl text-[10px] uppercase tracking-[0.2em] font-black h-14 bg-white hover:bg-gray-50 transition-all border-gray-100 text-gray-600"
                onClick={onViewHistory}
            >
                পেমেন্ট ইতিহাস দেখুন
            </Button>
        </Card>
    );
}
