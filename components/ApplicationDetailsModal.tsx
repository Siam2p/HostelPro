import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ApplicationDetails } from '@/lib/types';


interface ApplicationDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    details?: ApplicationDetails;
}

export default function ApplicationDetailsModal({ isOpen, onClose, details }: ApplicationDetailsModalProps) {
    if (!isOpen || !details) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <Card className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold text-gray-800">আবেদনকারীর বিস্তারিত তথ্য</h2>
                    <button aria-label='close' onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p- md:p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">নাম</label>
                            <p className="text-lg font-medium text-gray-900 mt-1">{details.fullName}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">মোবাইল</label>
                            <p className="text-lg font-medium text-gray-900 mt-1">{details.phone}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">ইমেইল</label>
                            <p className="text-lg font-medium text-gray-900 mt-1">{details.email}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">বাবার নাম</label>
                            <p className="text-lg font-medium text-gray-900 mt-1">{details.fatherName}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">মায়ের নাম</label>
                            <p className="text-lg font-medium text-gray-900 mt-1">{details.motherName}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">অভিভাবকের নাম</label>
                            <p className="text-lg font-medium text-gray-900 mt-1">{details.guardianName}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">অভিভাবকের মোবাইল</label>
                            <p className="text-lg font-medium text-gray-900 mt-1">{details.guardianPhone}</p>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">স্থায়ী ঠিকানা</label>
                        <p className="text-lg font-medium text-gray-900 mt-1 whitespace-pre-wrap">{details.address}</p>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button onClick={onClose} variant="primary" className="px-8 shadow-lg shadow-primary/25">
                            বন্ধ করুন
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
