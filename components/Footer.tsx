import React from 'react';
import NextImage from 'next/image';

export function Footer() {
    return (
        <footer className="bg-bg-card mt-20 pt-16 pb-10 border-t border-border">
            <div className="container mx-auto px-3 text-center">
                <div className="flex flex-col items-center gap-4 mb-8">
                    <div className="relative h-12 w-12 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        <NextImage
                            src="/brand/logo.png"
                            alt="HostelPro Logo"
                            fill={true}
                            className="object-contain"
                        />
                    </div>
                    <div className="text-xl font-black text-primary-dip tracking-tight">
                        Hostel<span className="text-primary">Pro</span>
                    </div>
                </div>
                <p className="text-text-muted text-sm font-medium">© 2024 HostelPro. All rights reserved.</p>
            </div>
        </footer>
    );
}
