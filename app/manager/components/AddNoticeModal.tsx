import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/Button';

interface AddNoticeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddNoticeModal({ isOpen, onClose }: AddNoticeModalProps) {
    const { addNotice } = useData();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content) return;

        addNotice({
            id: Date.now(),
            hostelId: 0,
            title: title,
            content: content,
            date: new Date().toISOString()
        });

        setTitle('');
        setContent('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 m-4 relative animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
                >
                    ✕
                </button>
                <h2 className="text-xl font-bold bg-linear-to-r from-primaryDip to-primaryDipTo bg-clip-text text-transparent mb-1">নোটিশ যোগ করুন</h2>
                <p className="text-gray-500 text-sm mb-6">রেসিডেন্টদের জন্য প্রয়োজনীয় তথ্য শেয়ার করুন</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">শিরোনাম (Title)</label>
                        <input
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primaryLight outline-none transition-all"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. বিদ্যুৎ বিল সংক্রান্ত"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">বিস্তারিত (Content)</label>
                        <textarea
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primaryLight outline-none transition-all min-h-[100px]"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="বিস্তারিত লিখুন..."
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            বাতিল
                        </Button>
                        <Button type="submit">
                            প্রকাশ করুন
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
