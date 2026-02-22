"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useData } from '@/context/DataContext';
import { Badge } from '@/components/ui/Badge';
import { Notice } from '@/lib/types';

export default function GlobalNoticeSection() {
    const { addNotice, updateNotice, notices, deleteNotice } = useData();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [audience, setAudience] = useState<'user' | 'manager' | 'both'>('user');
    const [isPosting, setIsPosting] = useState(false);
    const [editingNoticeId, setEditingNoticeId] = useState<number | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content) return;

        setIsPosting(true);

        if (editingNoticeId) {
            const noticeToUpdate = notices.find(n => n.id === editingNoticeId);
            if (noticeToUpdate) {
                updateNotice({
                    ...noticeToUpdate,
                    title,
                    content,
                    audience
                });
            }
            setEditingNoticeId(null);
        } else {
            const newNotice = {
                id: Date.now(),
                hostelId: 0, // 0 for global/admin notices
                title,
                content,
                date: new Date().toISOString().split('T')[0],
                isGlobal: true,
                audience
            };
            addNotice(newNotice);
        }

        setTitle('');
        setContent('');
        setAudience('user');
        setIsPosting(false);
    };

    const handleEdit = (notice: Notice) => {
        setEditingNoticeId(notice.id);
        setTitle(notice.title);
        setContent(notice.content);
        setAudience(notice.audience);

        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setEditingNoticeId(null);
        setTitle('');
        setContent('');
        setAudience('user');
    };

    const globalNotices = notices.filter(n => n.isGlobal || n.hostelId === 0);

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-700">
            <header className="mb-10">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">সার্বজনীন বিজ্ঞপ্তি</h2>
                <p className="text-slate-500 font-medium">পুরো সাইট জুড়ে বা সকল ব্যবহারকারীর জন্য ইম্পর্টেন্ট নোটিশ দিন।</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <Card className="p-10 border-none shadow-2xl shadow-slate-200/60 rounded-[3rem] bg-white">
                    <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                        <span className="p-2.5 bg-blue-100 rounded-xl text-primaryDip text-lg">📝</span>
                        {editingNoticeId ? 'বিজ্ঞপ্তিটি আপডেট করুন' : 'নতুন বিজ্ঞপ্তি প্রকাশ করুন'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block px-2">বিজ্ঞপ্তির শিরোনাম</label>
                            <input
                                type="text"
                                placeholder="উদা: সার্ভার রক্ষণাবেক্ষণ বিরতি"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full h-14 px-3 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-primary-light focus:ring-4 focus:ring-primary-light/10 outline-none transition-all font-bold text-slate-900"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block px-2">বিস্তারিত বর্ণনা</label>
                            <textarea
                                placeholder="বিজ্ঞপ্তির বিস্তারিত এখানে লিখুন..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full min-h-[180px] p-6 rounded-3xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-primaryLight focus:ring-4 focus:ring-primaryLight/10 outline-none transition-all font-medium text-slate-700 leading-relaxed"
                                required
                            ></textarea>
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block px-2">কাকে পাঠাতে চান?</label>
                            <select
                                value={audience}
                                onChange={(e) => setAudience(e.target.value as 'user' | 'manager' | 'both')}
                                className="w-full h-14 px-3 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-primary-light focus:ring-4 focus:ring-primary-light/10 outline-none transition-all font-bold text-slate-900 cursor-pointer"
                            >
                                <option value="user">ইউজার (Users)</option>
                                <option value="manager">ম্যানেজার (Managers)</option>
                                <option value="both">উভয় (Both)</option>
                            </select>
                        </div>
                        <div className="flex gap-3">
                            {editingNoticeId && (
                                <Button
                                    type="button"
                                    onClick={handleCancel}
                                    variant="outline"
                                    className="grow h-14 rounded-2xl border-slate-200 text-slate-500 font-bold uppercase tracking-widest"
                                >
                                    বাতিল করুন
                                </Button>
                            )}
                            <Button
                                type="submit"
                                disabled={isPosting}
                                className={`${editingNoticeId ? 'grow-2' : 'w-full'} h-14 rounded-2xl bg-linear-to-r from-primary-dip to-primary-dipto text-white font-black uppercase tracking-widest shadow-xl shadow-primary-light/20`}
                            >
                                {isPosting ? 'প্রসেসিং...' : editingNoticeId ? 'আপডেট করুন ✨' : 'বিজ্ঞপ্তি পাবলিশ করুন 🚀'}
                            </Button>
                        </div>
                    </form>
                </Card>

                <div className="space-y-6 overflow-y-auto max-h-[700px] pr-2 scrollbar-thin scrollbar-thumb-slate-200">
                    <h3 className="text-xl font-black text-slate-900 px-2 flex items-center gap-3">
                        <span className="p-2.5 bg-emerald-100 rounded-xl text-emerald-600 text-lg">📢</span>
                        সাম্প্রতিক নোটিশসমূহ
                    </h3>
                    {globalNotices.length > 0 ? (
                        globalNotices.map((notice) => (
                            <Card key={notice.id} className="p-8 border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] bg-white group hover:-translate-x-1 transition-all duration-300">
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="font-black text-slate-900 text-lg">{notice.title}</h4>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => handleEdit(notice)}
                                            className="p-2 text-slate-300 hover:text-blue-500 transition-colors"
                                            title="Edit Notice"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => deleteNotice(notice.id)}
                                            className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                                            title="Delete Notice"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6">{notice.content}</p>
                                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">🗓️ {notice.date}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest border-blue-100 text-primaryDip px-3 py-1">
                                            {notice.audience === 'both' ? '👥 Both' : notice.audience === 'manager' ? '💼 Manager' : '👤 User'}
                                        </Badge>
                                        <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest border-slate-100 text-slate-400 px-3 py-1">Global</Badge>
                                    </div>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <div className="p-16 text-center bg-slate-100/50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
                            <p className="text-slate-400 font-bold">এখনো কোনো সার্বজনীন বিজ্ঞপ্তি নেই।</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
