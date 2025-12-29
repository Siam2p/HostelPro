import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface PaymentHistoryItem {
    month: string;
    status: string;
    amount: number;
}

interface PaymentHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    paymentHistory: PaymentHistoryItem[];
}

export function PaymentHistoryModal({ isOpen, onClose, paymentHistory }: PaymentHistoryModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <Card className="w-full max-w-4xl p-0 rounded-4xl shadow-3xl animate-in zoom-in-95 duration-300 overflow-hidden border-none text-sans">
                <div className="px-8 py-6 bg-white border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-black text-gray-900 tracking-tight">মাসিক ফি ম্যানেজমেন্ট (২০২৫)</h3>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">আপনার বার্ষিক লেনদেনের খতিয়ান</p>
                    </div>
                    <div className="hidden md:block">
                        <Badge className="bg-orange-50 text-orange-600 border-none font-black px-4 py-2 rounded-full text-xs">
                            PENDING DUES: ৳১০,০০০
                        </Badge>
                    </div>
                </div>

                <div className="p-8 bg-gray-50/50 max-h-[75vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {paymentHistory.map((item, idx) => (
                            <div key={idx} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md hover:border-blue-100 transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-2xl bg-gray-50 flex items-center justify-center font-black text-gray-400 text-xs">
                                        {idx + 1}
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                        <p className="font-bold text-gray-800 text-lg">{item.month}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center gap-2">
                                    <button className={`h-9 w-full sm:w-auto px-5 rounded-full text-[10px] font-black transition-all duration-300 uppercase tracking-widest border shadow-xs ${item.status === 'paid'
                                        ? 'bg-green-500 text-white border-green-500'
                                        : 'bg-green-500/10 text-green-600 border-green-200/50 hover:bg-green-500 hover:text-white'
                                        }`}>MARK PAID</button>
                                    <button className={`h-9 w-full sm:w-auto px-5 rounded-full text-[10px] font-black transition-all duration-300 uppercase tracking-widest border shadow-xs ${item.status !== 'paid'
                                        ? (idx < new Date().getMonth() ? 'bg-red-500 text-white border-red-500' : 'bg-orange-500 text-white border-orange-500')
                                        : 'bg-gray-100 text-gray-400 border-gray-200 hover:bg-red-500/10 hover:text-red-600'
                                        }`}>
                                        {item.status === 'paid' ? 'MARK UNPAID' : (idx < new Date().getMonth() ? 'UNPAID' : 'PENDING')}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-8 bg-white border-t border-gray-100 flex justify-end">
                    <Button
                        onClick={onClose}
                        className="px-12 rounded-2xl h-14 font-black shadow-xl shadow-blue-200 bg-linear-to-r from-blue-600 to-indigo-600 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-xs"
                    >
                        বন্ধ করুন
                    </Button>
                </div>
            </Card>
        </div>
    );
}
