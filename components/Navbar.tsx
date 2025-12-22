"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';

export function Navbar() {
    const { currentUser, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;
    const baseLinkClass = "font-medium transition-colors hover:text-primary";
    const activeLinkClass = "text-primary font-bold";
    const inactiveLinkClass = "text-text-muted";

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                {/* Brand */}
                <Link href="/" className="text-2xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Hostel<span className="text-primary">Pro</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex gap-8">
                    <Link href="/" className={`${baseLinkClass} ${isActive('/') ? activeLinkClass : inactiveLinkClass}`}>
                        হোম
                    </Link>
                    <Link href="/about" className={`${baseLinkClass} ${isActive('/about') ? activeLinkClass : inactiveLinkClass}`}>
                        আমাদের সম্পর্কে
                    </Link>
                    <Link href="/hostels" className={`${baseLinkClass} ${isActive('/hostels') ? activeLinkClass : inactiveLinkClass}`}>
                        হোস্টেলসমূহ
                    </Link>
                    <Link href="/contact" className={`${baseLinkClass} ${isActive('/contact') ? activeLinkClass : inactiveLinkClass}`}>
                        যোগাযোগ
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
                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-text-main hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-border shadow-lg p-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
                    <Link href="/" onClick={() => setIsMenuOpen(false)} className={`py-2 ${baseLinkClass} ${isActive('/') ? activeLinkClass : inactiveLinkClass}`}>
                        হোম
                    </Link>
                    <Link href="/about" onClick={() => setIsMenuOpen(false)} className={`py-2 ${baseLinkClass} ${isActive('/about') ? activeLinkClass : inactiveLinkClass}`}>
                        আমাদের সম্পর্কে
                    </Link>
                    <Link href="/hostels" onClick={() => setIsMenuOpen(false)} className={`py-2 ${baseLinkClass} ${isActive('/hostels') ? activeLinkClass : inactiveLinkClass}`}>
                        হোস্টেলসমূহ
                    </Link>
                    <Link href="/contact" onClick={() => setIsMenuOpen(false)} className={`py-2 ${baseLinkClass} ${isActive('/contact') ? activeLinkClass : inactiveLinkClass}`}>
                        যোগাযোগ
                    </Link>

                    <hr className="border-border my-2" />

                    {currentUser ? (
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 p-2 bg-bg-body rounded-lg">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                    {currentUser.name[0]}
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-text-main">{currentUser.name}</div>
                                    <div className="text-xs text-text-muted capitalize">{currentUser.role}</div>
                                </div>
                            </div>

                            {currentUser.role === 'manager' && (
                                <Link href="/manager" onClick={() => setIsMenuOpen(false)}>
                                    <Button fullWidth className="py-2 text-sm">ড্যাশবোর্ড</Button>
                                </Link>
                            )}
                            {currentUser.role === 'admin' && (
                                <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                                    <Button fullWidth className="py-2 text-sm">অ্যাডমিন</Button>
                                </Link>
                            )}
                            <Button onClick={() => { logout(); setIsMenuOpen(false); }} variant="outline" fullWidth className="py-2 text-sm">
                                লগআউট
                            </Button>
                        </div>
                    ) : (
                        <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                            <Button variant="primary" fullWidth className="py-2">লগইন</Button>
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}
