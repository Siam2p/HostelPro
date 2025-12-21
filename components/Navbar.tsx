"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';

export function Navbar() {
    const { currentUser, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                {/* Brand */}
                <Link href="/" className="text-2xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Hostel<span className="text-primary">Pro</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex gap-8">
                    <Link href="/" className="font-medium text-text-muted hover:text-primary transition-colors">
                        হোম
                    </Link>
                    <Link href="/#hostels" className="font-medium text-text-muted hover:text-primary transition-colors">
                        হোস্টেলসমূহ
                    </Link>
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    {currentUser ? (
                        <div className="flex items-center gap-4">
                            <div className="text-right hidden lg:block">
                                <div className="text-sm font-bold text-text-main">{currentUser.name}</div>
                                <div className="text-xs text-text-muted capitalize">{currentUser.role}</div>
                            </div>
                            <Button onClick={logout} variant="outline" className="py-2 px-4 text-sm">
                                লগআউট
                            </Button>
                            {currentUser.role === 'manager' && (
                                <Link href="/manager">
                                    <Button className="py-2 px-4 text-sm">ড্যাশবোর্ড</Button>
                                </Link>
                            )}
                            {currentUser.role === 'admin' && (
                                <Link href="/admin">
                                    <Button className="py-2 px-4 text-sm">অ্যাডমিন</Button>
                                </Link>
                            )}
                        </div>
                    ) : (
                        <Link href="/login">
                            <Button variant="primary" className="py-2 px-6">লগইন</Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
