import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ApplicationDetails } from '@/lib/types';


interface BookingApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ApplicationDetails) => void;
    initialData?: Partial<ApplicationDetails>;
}

export default function BookingApplicationModal({ isOpen, onClose, onSubmit, initialData }: BookingApplicationModalProps) {
    const [formData, setFormData] = useState<ApplicationDetails>({
        fullName: initialData?.fullName || '',
        phone: initialData?.phone || '',
        email: initialData?.email || '',
        fatherName: initialData?.fatherName || '',
        motherName: initialData?.motherName || '',
        address: initialData?.address || '',
        guardianName: initialData?.guardianName || '',
        guardianPhone: initialData?.guardianPhone || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <Card className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold text-gray-800">আবেদন ফর্ম পূরণ করুন</h2>
                    <button aria-label='close' onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="-px-1 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">আপনার নাম</label>
                            <input
                                required
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="আপনার পূর্ণ নাম লিখুন"
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">মোবাইল নম্বর</label>
                            <input
                                required
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="01XXXXXXXXX"
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">ইমেইল</label>
                            <input
                                required
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="example@email.com"
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">বাবার নাম</label>
                            <input
                                required
                                type="text"
                                name="fatherName"
                                value={formData.fatherName}
                                onChange={handleChange}
                                placeholder="বাবার নাম"
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">মায়ের নাম</label>
                            <input
                                required
                                type="text"
                                name="motherName"
                                value={formData.motherName}
                                onChange={handleChange}
                                placeholder="মায়ের নাম"
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">অভিভাবকের নাম</label>
                            <input
                                required
                                type="text"
                                name="guardianName"
                                value={formData.guardianName}
                                onChange={handleChange}
                                placeholder="অভিভাবকের নাম"
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">অভিভাবকের মোবাইল নম্বর</label>
                            <input
                                required
                                type="tel"
                                name="guardianPhone"
                                value={formData.guardianPhone}
                                onChange={handleChange}
                                placeholder="01XXXXXXXXX"
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">স্থায়ী ঠিকানা</label>
                        <textarea
                            required
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows={3}
                            placeholder="আপনার স্থায়ী ঠিকানা লিখুন"
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                        />
                    </div>

                    <div className="pt-4 flex gap-4">
                        <Button type="button" onClick={onClose} variant="outline" className="flex-1 py-3">
                            বাতিল করুন
                        </Button>
                        <Button type="submit" variant="primary" className="flex-1 py-3 shadow-lg shadow-primary/25">
                            আবেদন জমা দিন
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
