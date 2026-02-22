"use client";

import React from 'react';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';

export default function GlobalNoticeBar() {
    const { notices } = useData();
    const { currentUser } = useAuth();

    // Filter notices: isGlobal and matches audience
    const relevantNotices = notices.filter(notice => {
        if (!notice.isGlobal) return false;

        const audience = notice.audience;
        if (audience === 'both') return true;

        if (!currentUser) {
            // Guests see 'user' or 'both' notices
            return audience === 'user';
        }

        if (currentUser.role === 'manager') {
            return audience === 'manager';
        }

        return audience === 'user';
    });

    if (relevantNotices.length === 0) return null;

    return (
        <div className="bg-primary text-white overflow-hidden relative z-50 shadow-md">
            <div className="container mx-auto px-4 py-2 flex items-center gap-4">
                <span className="flex-none bg-primary-dip px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider animate-pulse">
                    Notice
                </span>
                <div className="relative flex-1 overflow-hidden whitespace-nowrap h-6">
                    <div className="absolute animate-marquee flex gap-12 items-center">
                        {relevantNotices.map((notice) => (
                            <div key={notice.id} className="flex items-center gap-2">
                                <span className="font-bold underline decoration-primary-light underline-offset-4">{notice.title}:</span>
                                <span>{notice.content}</span>
                                <span className="text-primary-light opacity-50">•</span>
                            </div>
                        ))}
                        {/* Repeat for seamless loop if multiple */}
                        {relevantNotices.length > 0 && relevantNotices.map((notice) => (
                            <div key={`${notice.id}-dup`} className="flex items-center gap-2">
                                <span className="font-bold underline decoration-primary-light underline-offset-4">{notice.title}:</span>
                                <span>{notice.content}</span>
                                <span className="text-primary-light opacity-50">•</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                    display: inline-flex;
                    padding-left: 100%;
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-100%); }
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
}
