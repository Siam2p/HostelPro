import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface WriteReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    hostelName: string;
    onSubmit: (review: { rating: number, comment: string }) => void;
}

export function WriteReviewModal({ isOpen, onClose, hostelName, onSubmit }: WriteReviewModalProps) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <Card className="w-full max-w-lg p-0 rounded-4xl shadow-3xl animate-in zoom-in-95 duration-300 overflow-hidden border-none text-left">
                <div className="p-8 bg-linear-to-br from-blue-600 to-indigo-700 text-white">
                    <h3 className="text-2xl font-black tracking-tight">রিভিউ দিন</h3>
                    <p className="text-blue-100 text-sm mt-1 font-medium">{hostelName} সম্পর্কে আপনার মতামত জানান</p>
                </div>

                <div className="p-8 bg-white space-y-6">
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-sm font-black text-gray-400 uppercase tracking-widest">রেটিং দিন</p>
                        <div className="flex gap-2 text-3xl">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className={`${star <= rating ? 'text-orange-400' : 'text-gray-200'} transition-colors hover:scale-110 active:scale-95`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">আপনার মন্তব্য</label>
                        <textarea
                            className="w-full h-32 p-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-700 resize-none"
                            placeholder="এখানে লিখুন..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                </div>

                <div className="p-8 bg-gray-50 flex flex-col sm:flex-row gap-4">
                    <Button variant="ghost" onClick={onClose} className="w-full sm:grow rounded-2xl h-14 font-bold text-gray-400 uppercase hover:bg-gray-100">বাতিল</Button>
                    <Button
                        onClick={() => {
                            onSubmit({ rating, comment });
                            onClose();
                        }}
                        className="w-full sm:grow-2 sm:basis-2/3 rounded-2xl h-14 font-black shadow-xl shadow-blue-200 bg-linear-to-r from-blue-600 to-indigo-600 transition-all uppercase tracking-widest text-xs"
                    >
                        রিভিউ জমা দিন
                    </Button>
                </div>
            </Card>
        </div>
    );
}
