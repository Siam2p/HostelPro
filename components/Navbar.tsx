"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';

export function Navbar() {
    const { currentUser, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const isActive = (path: string) => pathname === path;
    const baseLinkClass = "font-medium transition-colors hover:text-primary";
    const activeLinkClass = "text-primary font-bold";
    const inactiveLinkClass = "text-text-muted";

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
            <div className={`${pathname.startsWith('/admin') || pathname.startsWith('/manager') ? 'px-3 lg:px-10' : 'container mx-auto px-3'} py-4 flex items-center justify-between`}>
                {/* Brand */}
                <Link href="/" className="text-2xl font-extrabold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Hostel<span className="text-primary">Pro</span>
                </Link>

                {/* Desktop Links */}
                {/* Role Based Navigation */}
                <div className="hidden md:flex gap-8">
                    {currentUser?.role === 'admin' ? (
                        <>
                            <Link href="/admin?view=overview" className={`${baseLinkClass} ${isActive('/admin') ? activeLinkClass : inactiveLinkClass}`}>
                                ড্যাশবোর্ড
                            </Link>
                            <Link href="/admin?view=users" className={`${baseLinkClass} ${isActive('/admin') && searchParams.get('view') === 'users' ? activeLinkClass : inactiveLinkClass}`}>
                                ব্যবহারকারী
                            </Link>
                            <Link href="/admin?view=hostels" className={`${baseLinkClass} ${isActive('/admin') && searchParams.get('view') === 'hostels' ? activeLinkClass : inactiveLinkClass}`}>
                                সব হোস্টেল
                            </Link>
                        </>
                    ) : currentUser?.role === 'manager' ? (
                        <>
                            <Link href="/manager?view=overview" className={`${baseLinkClass} ${isActive('/manager') ? activeLinkClass : inactiveLinkClass}`}>
                                ড্যাশবোর্ড
                            </Link>
                            <Link href="/about" className={`${baseLinkClass} ${isActive('/about') ? activeLinkClass : inactiveLinkClass}`}>
                                আমাদের সম্পর্কে
                            </Link>
                            <Link href="/contact" className={`${baseLinkClass} ${isActive('/contact') ? activeLinkClass : inactiveLinkClass}`}>
                                যোগাযোগ
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/" className={`${baseLinkClass} ${isActive('/') ? activeLinkClass : inactiveLinkClass}`}>
                                হোম
                            </Link>
                            <Link href="/hostels" className={`${baseLinkClass} ${isActive('/hostels') ? activeLinkClass : inactiveLinkClass}`}>
                                হোস্টেলসমূহ
                            </Link>
                            <Link href="/about" className={`${baseLinkClass} ${isActive('/about') ? activeLinkClass : inactiveLinkClass}`}>
                                আমাদের সম্পর্কে
                            </Link>
                            <Link href="/contact" className={`${baseLinkClass} ${isActive('/contact') ? activeLinkClass : inactiveLinkClass}`}>
                                যোগাযোগ
                            </Link>
                        </>
                    )}
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    {currentUser ? (
                        <div className="flex items-center gap-6">
                            <Link
                                href={
                                    currentUser.role === 'manager' ? '/manager?view=profile' :
                                        currentUser.role === 'admin' ? '/admin?view=profile' : '/profile'
                                }
                                className="flex items-center gap-3 group/avatar transition-all hover:opacity-80"
                            >
                                <div className="h-10 w-10 rounded-full border-2 border-primary/20 bg-primary/5 p-0.5 overflow-hidden shadow-sm group-hover/avatar:border-primary/50 transition-colors">
                                    {currentUser.profileImage ? (
                                        <img src={currentUser.profileImage} alt={currentUser.name} className="w-full h-full object-cover rounded-full" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center font-bold text-primary bg-primary/10 rounded-full text-lg">
                                            {currentUser.name[0]}
                                        </div>
                                    )}
                                </div>
                                <div className="text-left hidden lg:block">
                                    <div className="text-sm font-black text-gray-900 leading-none mb-0.5 group-hover/avatar:text-primary transition-colors">{currentUser.name}</div>
                                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{currentUser.role}</div>
                                </div>
                            </Link>

                            <div className="flex items-center gap-3">
                                <Button
                                    onClick={logout}
                                    variant="outline"
                                    className="py-2.5 px-6 text-xs font-black uppercase tracking-widest rounded-full border-gray-200 text-gray-600 hover:bg-gray-50 transition-all h-auto"
                                >
                                    লগআউট
                                </Button>

                                {currentUser.role === 'manager' && !pathname.startsWith('/manager') && (
                                    <Link href="/manager">
                                        <Button className="py-2.5 px-6 text-xs font-black uppercase tracking-widest rounded-full bg-linear-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-100 h-auto">ড্যাশবোর্ড</Button>
                                    </Link>
                                )}
                                {currentUser.role === 'admin' && !pathname.startsWith('/admin') && (
                                    <Link href="/admin">
                                        <Button className="py-2.5 px-6 text-xs font-black uppercase tracking-widest rounded-full bg-linear-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-100 h-auto">অ্যাডমিন</Button>
                                    </Link>
                                )}
                            </div>
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
                <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-border shadow-lg px-3 py-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
                    {currentUser?.role === 'admin' ? (
                        <>
                            <Link href="/admin?view=overview" onClick={() => setIsMenuOpen(false)} className={`py-2 ${baseLinkClass} ${isActive('/admin') && !searchParams.get('view') ? activeLinkClass : inactiveLinkClass}`}>
                                ড্যাশবোর্ড
                            </Link>
                            <Link href="/admin?view=users" onClick={() => setIsMenuOpen(false)} className={`py-2 ${baseLinkClass} ${isActive('/admin') && searchParams.get('view') === 'users' ? activeLinkClass : inactiveLinkClass}`}>
                                ব্যবহারকারী
                            </Link>
                            <Link href="/admin?view=hostels" onClick={() => setIsMenuOpen(false)} className={`py-2 ${baseLinkClass} ${isActive('/admin') && searchParams.get('view') === 'hostels' ? activeLinkClass : inactiveLinkClass}`}>
                                সব হোস্টেল
                            </Link>
                        </>
                    ) : currentUser?.role === 'manager' ? (
                        <>
                            <Link href="/manager?view=overview" onClick={() => setIsMenuOpen(false)} className={`py-2 ${baseLinkClass} ${isActive('/manager') ? activeLinkClass : inactiveLinkClass}`}>
                                ড্যাশবোর্ড
                            </Link>
                            <Link href="/about" onClick={() => setIsMenuOpen(false)} className={`py-2 ${baseLinkClass} ${isActive('/about') ? activeLinkClass : inactiveLinkClass}`}>
                                আমাদের সম্পর্কে
                            </Link>
                            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className={`py-2 ${baseLinkClass} ${isActive('/contact') ? activeLinkClass : inactiveLinkClass}`}>
                                যোগাযোগ
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/" onClick={() => setIsMenuOpen(false)} className={`py-2 ${baseLinkClass} ${isActive('/') ? activeLinkClass : inactiveLinkClass}`}>
                                হোম
                            </Link>
                            <Link href="/hostels" onClick={() => setIsMenuOpen(false)} className={`py-2 ${baseLinkClass} ${isActive('/hostels') ? activeLinkClass : inactiveLinkClass}`}>
                                হোস্টেলসমূহ
                            </Link>
                            <Link href="/about" onClick={() => setIsMenuOpen(false)} className={`py-2 ${baseLinkClass} ${isActive('/about') ? activeLinkClass : inactiveLinkClass}`}>
                                আমাদের সম্পর্কে
                            </Link>
                            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className={`py-2 ${baseLinkClass} ${isActive('/contact') ? activeLinkClass : inactiveLinkClass}`}>
                                যোগাযোগ
                            </Link>
                        </>
                    )}

                    <hr className="border-border my-2" />

                    {currentUser ? (
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="h-10 w-10 rounded-full border border-primary/20 bg-white overflow-hidden flex items-center justify-center">
                                    {currentUser.profileImage ? (
                                        <img src={currentUser.profileImage} alt={currentUser.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-primary font-black">{currentUser.name[0]}</div>
                                    )}
                                </div>
                                <div>
                                    <div className="text-sm font-black text-gray-900 leading-none mb-1">{currentUser.name}</div>
                                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{currentUser.role}</div>
                                </div>
                            </div>

                            {currentUser.role === 'manager' && !pathname.startsWith('/manager') && (
                                <Link href="/manager" onClick={() => setIsMenuOpen(false)}>
                                    <Button fullWidth className="py-2 text-sm">ড্যাশবোর্ড</Button>
                                </Link>
                            )}
                            {currentUser.role === 'admin' && !pathname.startsWith('/admin') && (
                                <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                                    <Button fullWidth className="py-2 text-sm">অ্যাডমিন</Button>
                                </Link>
                            )}
                            <Button onClick={() => { logout(); setIsMenuOpen(false); }} variant="outline" fullWidth className="py-2 text-sm">
                                লগআউট
                            </Button>
                        </div>
                    ) : (
                        (() => {
                            if (pathname.startsWith('/manager')) {
                                return (
                                    <Link href="/manager/login" onClick={() => setIsMenuOpen(false)}>
                                        <Button variant="primary" fullWidth className="py-2">ম্যানেজার লগইন</Button>
                                    </Link>
                                );
                            } else if (pathname.startsWith('/admin')) {
                                return (
                                    <Link href="/admin/login" onClick={() => setIsMenuOpen(false)}>
                                        <Button variant="primary" fullWidth className="py-2">অ্যাডমিন লগইন</Button>
                                    </Link>
                                );
                            } else {
                                return (
                                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                        <Button variant="primary" fullWidth className="py-2">লগইন</Button>
                                    </Link>
                                );
                            }
                        })()
                    )}
                </div>
            )}
        </nav>
    );
}
