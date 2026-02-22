import React, { useState } from 'react';
import NextImage from 'next/image';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Hostel } from '@/lib/types';
import { useData } from '@/context/DataContext';
import dynamic from 'next/dynamic';

const MapPicker = dynamic(() => import('@/components/MapPicker'), {
    ssr: false,
    loading: () => <div className="h-[200px] w-full bg-slate-100 animate-pulse rounded-2xl">ম্যাপ লোড হচ্ছে...</div>
});

interface AdminHostelDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    hostel: Hostel | null;
}

export function AdminHostelDetailsModal({ isOpen, onClose, hostel }: AdminHostelDetailsModalProps) {
    const { updateHostel } = useData();
    const [noteMessage, setNoteMessage] = useState(hostel?.adminNote?.message || '');
    const [noteAudience, setNoteAudience] = useState<'manager' | 'user' | 'both'>(hostel?.adminNote?.audience || 'user');
    const [isSavingNote, setIsSavingNote] = useState(false);

    if (!isOpen || !hostel) return null;

    const handleSaveNote = () => {
        if (!hostel) return;
        setIsSavingNote(true);
        setTimeout(() => {
            updateHostel({
                ...hostel,
                adminNote: noteMessage ? {
                    message: noteMessage,
                    audience: noteAudience
                } : undefined
            });
            setIsSavingNote(false);
            alert("সফলভাবে নোট সংরক্ষণ করা হয়েছে!");
        }, 500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
            <Card className="w-full max-w-4xl max-h-[90vh] p-0 rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden border-none text-left flex flex-col bg-white">

                {/* Header Image Area */}
                <div className="relative h-64 shrink-0 group">
                    <NextImage src={hostel.image} alt={hostel.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/40 to-transparent flex items-end p-8">
                        <div className="w-full flex justify-between items-end">
                            <div>
                                <Badge variant={
                                    hostel.status === 'active' ? 'success' :
                                        hostel.status === 'pending' ? 'warning' :
                                            hostel.status === 'rejected' ? 'danger' : 'default'
                                } className="mb-3 px-3 py-1 font-black text-[10px] uppercase tracking-widest shadow-lg">
                                    {hostel.status === 'pending' ? 'Pending' :
                                        hostel.status === 'active' ? 'Active' :
                                            hostel.status === 'rejected' ? 'Rejected' : 'Inactive'}
                                </Badge>
                                <h3 className="text-4xl font-black text-white tracking-tight drop-shadow-md">{hostel.name}</h3>
                                <p className="text-slate-200 text-sm font-bold flex items-center gap-2 mt-2">
                                    📍 {hostel.location}
                                </p>
                            </div>
                            <div className="text-right bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20">
                                <p className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1">মাসিক ভাড়া</p>
                                <p className="text-3xl font-black text-white">৳{hostel.price}</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="absolute top-4 right-4 h-10 w-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md transition-all shadow-lg z-10 font-bold">✕</button>
                </div>

                {/* Content Area */}
                <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* Main Info Column */}
                        <div className="md:col-span-2 space-y-8">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center justify-center text-center">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ক্যাটাগরি</p>
                                    <p className="text-lg font-black text-primary-dip">{hostel.category === 'Male' ? 'ছাত্র (Male)' : 'ছাত্রী (Female)'}</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center justify-center text-center">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">রেটিং</p>
                                    <p className="text-lg font-black text-amber-500">⭐ {hostel.rating}</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center justify-center text-center">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">মোট রুম</p>
                                    <p className="text-lg font-black text-indigo-500">{hostel.totalRooms}</p>
                                </div>
                            </div>

                            {/* Description */}
                            {hostel.description && (
                                <div>
                                    <h4 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                                        <span className="h-3 w-3 rounded-full bg-primary-dip"></span>
                                        বিস্তারিত বিবরণ
                                    </h4>
                                    <div
                                        className="text-slate-600 prose prose-sm max-w-none text-justify leading-relaxed bg-slate-50 p-6 rounded-3xl border border-slate-100"
                                        dangerouslySetInnerHTML={{ __html: hostel.description }}
                                    />
                                </div>
                            )}

                            {/* Features */}
                            {hostel.features && hostel.features.length > 0 && (
                                <div>
                                    <h4 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                                        <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
                                        সুযোগ-সুবিধাসমূহ
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {hostel.features.map((f: string, i: number) => (
                                            <span key={i} className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-black border border-emerald-100 shadow-sm uppercase tracking-wider">
                                                ✓ {f}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Gallery */}
                            {hostel.gallery && hostel.gallery.length > 0 && (
                                <div>
                                    <h4 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                                        <span className="h-3 w-3 rounded-full bg-pink-500"></span>
                                        গ্যালারি
                                    </h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {hostel.gallery.map((imgUrl: string, i: number) => (
                                            <div key={i} className="relative h-32 w-full overflow-hidden rounded-2xl border border-slate-100 shadow-sm group">
                                                {imgUrl.includes('video') || imgUrl.endsWith('.mp4') ? (
                                                    <video src={imgUrl} className="w-full h-full object-cover" />
                                                ) : (
                                                    <NextImage src={imgUrl} alt={`gallery-${i}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar Info Column */}
                        <div className="space-y-6">
                            {/* Contact Box */}
                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-sm">
                                <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                                    যোগাযোগ
                                </h4>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">মোবাইল নাম্বার</p>
                                        <p className="text-sm font-bold text-slate-800">{hostel.contact || 'তথ্য দেওয়া নেই'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ম্যানেজার আইডি</p>
                                        <p className="text-sm font-bold text-slate-800">{hostel.managerId || 'সিস্টেম অ্যাডমিন'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Fully Qualified Address */}
                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-sm">
                                <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                                    ঠিকানা
                                </h4>
                                <div className="space-y-2 text-sm text-slate-600 font-medium">
                                    <p><strong className="text-slate-800">বিভাগ:</strong> {hostel.division || 'প্রযোজ্য নয়'}</p>
                                    <p><strong className="text-slate-800">জেলা:</strong> {hostel.district || 'প্রযোজ্য নয়'}</p>
                                    <p><strong className="text-slate-800">উপজেলা:</strong> {hostel.upazila || 'প্রযোজ্য নয়'}</p>
                                </div>
                            </div>

                            {/* Map */}
                            {hostel.coordinates && (
                                <div className="rounded-3xl border border-slate-100 overflow-hidden shadow-sm bg-slate-50 relative h-64">
                                    <div className="absolute top-0 left-0 w-full z-10 bg-linear-to-b from-white p-3 text-center pointer-events-none">
                                        <span className="text-xs font-black tracking-widest uppercase text-slate-500 bg-white/80 px-3 py-1 rounded-full shadow-xs">ম্যাপ ভিউ</span>
                                    </div>
                                    <MapPicker initialLocation={hostel.coordinates} readOnly={true} />
                                </div>
                            )}

                            {/* Admin Note Section */}
                            <div className="bg-amber-50 p-6 rounded-3xl border border-amber-200 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl pointer-events-none">📌</div>
                                <h4 className="font-black text-amber-900 mb-4 flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                                    অ্যাডমিন নোট
                                </h4>
                                <div className="space-y-4 relative z-10">
                                    <div>
                                        <label className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-2 block">নোটের বিষয়বস্তু</label>
                                        <textarea
                                            value={noteMessage}
                                            onChange={(e) => setNoteMessage(e.target.value)}
                                            placeholder="যেকোনো গুরুত্বপূর্ণ তথ্য বা নির্দেশিকা লিখুন..."
                                            className="w-full h-24 p-3 rounded-2xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none text-sm text-slate-700"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-2 block">কাকে দেখাবেন?</label>
                                        <select
                                            value={noteAudience}
                                            onChange={(e) => setNoteAudience(e.target.value as 'manager' | 'user' | 'both')}
                                            className="w-full p-3 rounded-2xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm font-bold text-slate-700"
                                            title="note audience"
                                        >
                                            <option value="both">ম্যানেজার এবং ইউজার</option>
                                            <option value="manager">শুধুমাত্র ম্যানেজার</option>
                                            <option value="user">শুধুমাত্র ইউজার</option>
                                        </select>
                                    </div>
                                    <Button
                                        onClick={handleSaveNote}
                                        disabled={isSavingNote}
                                        className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/30 transition-all font-bold text-sm tracking-widest uppercase"
                                    >
                                        {isSavingNote ? 'সংরক্ষণ হচ্ছে...' : 'নোট সেভ করুন'}
                                    </Button>
                                    <p className="text-[10px] items-center text-amber-600/70 font-bold leading-tight flex gap-1">
                                        💡 নোট মুছে ফেলতে বক্সটি খালি করে সেভ করুন।
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 bg-slate-50 flex justify-end shrink-0 border-t border-slate-100">
                    <Button onClick={onClose} className="px-10 rounded-2xl h-12 font-black shadow-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 transition-all uppercase tracking-widest text-xs">বন্ধ করুন</Button>
                </div>
            </Card>
        </div>
    );
}
