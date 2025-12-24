"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AuthInput } from '@/components/ui/AuthInput';
import { User } from '@/lib/types';
import { Metadata } from 'next';

// This is for SEO Metadata
// Note: In Next.js App Router, metadata should ideally be in a server component
// or exported from a layout/page. Since this is a client component, 
// we can use a separate layout.tsx or just regular head tags if needed.
// However, the user asked for best SEO, so I'll add a JSON-LD script 
// and suggest wrapping this in a server component if possible.

// Password Confirmation Modal Component
function ConfirmPasswordModal({ isOpen, onClose, onConfirm, isSaving }: { isOpen: boolean, onClose: () => void, onConfirm: (password: string) => void, isSaving: boolean }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <Card className="w-full max-w-md p-8 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">পরিচয় নিশ্চিত করুন</h3>
                <p className="text-gray-500 mb-6 text-sm">পরিবর্তনগুলো সেভ করতে আপনার বর্তমান পাসওয়ার্ডটি প্রদান করুন।</p>

                <div className="space-y-4">
                    <AuthInput
                        label="পাসওয়ার্ড"
                        id="confirm-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={error}
                        autoFocus
                    />

                    <div className="flex gap-3 pt-2">
                        <Button variant="outline" onClick={onClose} className="flex-1 rounded-xl h-12">বাতিল</Button>
                        <Button
                            onClick={() => {
                                if (!password) {
                                    setError('পাসওয়ার্ড প্রয়োজন');
                                    return;
                                }
                                onConfirm(password);
                            }}
                            disabled={isSaving}
                            className="flex-1 rounded-xl h-12"
                        >
                            {isSaving ? 'যাচাই করা হচ্ছে...' : 'নিশ্চিত করুন'}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}

// Change Password Modal Component
function ChangePasswordModal({ isOpen, onClose, onConfirm }: { isOpen: boolean, onClose: () => void, onConfirm: (current: string, newP: string) => Promise<boolean> }) {
    const [currentP, setCurrentP] = useState('');
    const [newP, setNewP] = useState('');
    const [confirmP, setConfirmP] = useState('');
    const [error, setError] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        setError('');
        if (!currentP || !newP || !confirmP) {
            setError('সব ঘর পূরণ করা প্রয়োজন');
            return;
        }
        if (newP !== confirmP) {
            setError('নতুন পাসওয়ার্ডগুলো মিলছে না');
            return;
        }
        if (newP.length < 3) {
            setError('পাসওয়ার্ড অন্তত ৩ অক্ষরের হতে হবে');
            return;
        }

        setIsSaving(true);
        const success = await onConfirm(currentP, newP);
        setIsSaving(false);
        if (success) {
            onClose();
        } else {
            setError('বর্তমান পাসওয়ার্ডটি সঠিক নয়');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <Card className="w-full max-w-sm p-8 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">পাসওয়ার্ড পরিবর্তন</h3>

                <div className="space-y-4">
                    <AuthInput label="বর্তমান পাসওয়ার্ড" id="curr-p" type="password" value={currentP} onChange={(e) => setCurrentP(e.target.value)} />
                    <AuthInput label="নতুন পাসওয়ার্ড" id="new-p" type="password" value={newP} onChange={(e) => setNewP(e.target.value)} />
                    <AuthInput label="নতুন পাসওয়ার্ড নিশ্চিত করুন" id="conf-p" type="password" value={confirmP} onChange={(e) => setConfirmP(e.target.value)} error={error} />

                    <div className="flex gap-3 pt-4">
                        <Button variant="outline" onClick={onClose} className="flex-1 rounded-xl">বাতিল</Button>
                        <Button onClick={handleSubmit} disabled={isSaving} className="flex-1 rounded-xl">
                            {isSaving ? 'আপডেট হচ্ছে...' : 'আপডেট করুন'}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}

// Payment History Modal Component (Grid View)
function PaymentHistoryModal({ isOpen, onClose, paymentHistory }: { isOpen: boolean, onClose: () => void, paymentHistory: any[] }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <Card className="w-full max-w-4xl p-0 rounded-4xl shadow-3xl animate-in zoom-in-95 duration-300 overflow-hidden border-none text-sans">
                <div className="p-8 bg-white border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-black text-gray-900 tracking-tight">মাসিক ফি ম্যানেজমেন্ট (২০২৫)</h3>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">আপনার বার্ষিক লেনদেনের খতিয়ান</p>
                    </div>
                    <div className="hidden sm:block">
                        <Badge className="bg-orange-50 text-orange-600 border-none font-black px-4 py-2 rounded-full text-xs">
                            PENDING DUES: ৳১০,০০০
                        </Badge>
                    </div>
                </div>

                <div className="p-8 bg-gray-50/50 max-h-[75vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {paymentHistory.map((item, idx) => (
                            <div key={idx} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md hover:border-blue-100 transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-2xl bg-gray-50 flex items-center justify-center font-black text-gray-400 text-xs">
                                        {idx + 1}
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                        <p className="font-bold text-gray-800 text-lg">{item.month}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center gap-2">
                                    <button className={`h-9 w-full sm:w-auto px-5 rounded-full text-[10px] font-black transition-all duration-300 uppercase tracking-widest border shadow-xs ${item.status === 'paid'
                                        ? 'bg-green-500 text-white border-green-500'
                                        : 'bg-green-500/10 text-green-600 border-green-200/50 hover:bg-green-500 hover:text-white'
                                        }`}>MARK PAID</button>
                                    <button className={`h-9 w-full sm:w-auto px-5 rounded-full text-[10px] font-black transition-all duration-300 uppercase tracking-widest border shadow-xs ${item.status !== 'paid'
                                        ? (idx < new Date().getMonth() ? 'bg-red-500 text-white border-red-500' : 'bg-orange-500 text-white border-orange-500')
                                        : 'bg-gray-100 text-gray-400 border-gray-200 hover:bg-red-500/10 hover:text-red-600'
                                        }`}>
                                        {item.status === 'paid' ? 'MARK UNPAID' : (idx < new Date().getMonth() ? 'UNPAID' : 'PENDING')}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-8 bg-white border-t border-gray-100 flex justify-end">
                    <Button
                        onClick={onClose}
                        className="px-12 rounded-2xl h-14 font-black shadow-xl shadow-blue-200 bg-linear-to-r from-blue-600 to-indigo-600 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-xs"
                    >
                        বন্ধ করুন
                    </Button>
                </div>
            </Card>
        </div>
    );
}

// Hostel Details Modal Component
function HostelDetailsModal({ isOpen, onClose, hostel, booking }: { isOpen: boolean, onClose: () => void, hostel: any, booking: any }) {
    if (!isOpen || !hostel) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <Card className="w-full max-w-2xl p-0 rounded-4xl shadow-3xl animate-in zoom-in-95 duration-300 overflow-hidden border-none">
                <div className="relative h-56">
                    <img src={hostel.image} alt={hostel.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                        <div>
                            <Badge className="bg-blue-500 text-white border-none mb-2 px-3 py-1 font-black text-[10px] uppercase tracking-widest">বর্তমানে বরাদ্দকৃত</Badge>
                            <h3 className="text-3xl font-black text-white tracking-tight">{hostel.name}</h3>
                        </div>
                    </div>
                </div>

                <div className="p-8 bg-white max-h-[60vh] overflow-y-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 pb-8 border-b border-gray-100">
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">রুম নম্বর</p>
                            <p className="text-2xl font-black text-blue-600">রুম {booking.roomId}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">বেড নম্বর</p>
                            <p className="text-2xl font-black text-indigo-600">বেড {booking.bedId}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">ভাড়ার পরিমাণ</p>
                            <p className="text-xl font-black text-gray-800">৳{hostel.price} <span className="text-xs font-bold text-gray-400">/মাস</span></p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">ক্যাটেগরি</p>
                            <Badge className="bg-purple-100 text-purple-700 border-none font-black text-[10px] uppercase">
                                {hostel.category === 'Male' ? 'পুরুষ (MALE)' : 'মহিলা (FEMALE)'}
                            </Badge>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                                সুযোগ-সুবিধা
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {(hostel.facilities || hostel.features || ['Free WiFi', 'CCTV', 'Meals', 'Security']).map((f: string, i: number) => (
                                    <span key={i} className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-[10px] font-black border border-gray-100 uppercase tracking-wider">{f}</span>
                                ))}
                            </div>
                        </div>

                        {hostel.gallery && hostel.gallery.length > 0 && (
                            <div>
                                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-pink-500"></span>
                                    গ্যালারি
                                </h4>
                                <div className="grid grid-cols-3 gap-2">
                                    {hostel.gallery.slice(0, 3).map((imgUrl: string, i: number) => (
                                        <img key={i} src={imgUrl} className="h-20 w-full object-cover rounded-xl border border-gray-100 shadow-xs" alt={`gallery-${i}`} />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div>
                            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                                যোগাযোগ ও ঠিকানা
                            </h4>
                            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                    <span className="block font-bold text-gray-900 mb-1">{hostel.location}</span>
                                    {hostel.address || `${hostel.upazila}, ${hostel.district}, ${hostel.division}`}<br />
                                </p>
                                <div className="mt-3 pt-3 border-t border-gray-200/50 flex flex-col gap-1">
                                    <p className="text-xs text-gray-400">ম্যানেজার: <span className="font-bold text-gray-700">{hostel.managerName || 'সিস্টেম অ্যাডমিন'}</span></p>
                                    <p className="text-xs text-gray-400">ফোন: <span className="font-bold text-gray-700">{hostel.contact || '০১৬XXXXXXXX'}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 bg-gray-50 flex justify-end">
                    <Button onClick={onClose} className="px-10 rounded-2xl h-12 font-black shadow-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 transition-all uppercase tracking-widest text-xs">বন্ধ করুন</Button>
                </div>
            </Card>
        </div>
    );
}

// Write Review Modal Component
function WriteReviewModal({ isOpen, onClose, hostelName, onSubmit }: { isOpen: boolean, onClose: () => void, hostelName: string, onSubmit: (review: any) => void }) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <Card className="w-full max-w-lg p-0 rounded-4xl shadow-3xl animate-in zoom-in-95 duration-300 overflow-hidden border-none">
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

export default function UserProfilePage() {
    const { currentUser, isLoading, logout, updateCurrentUser } = useAuth();
    const { bookings, hostels, notices, updateUser } = useData();
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<User>>({});
    const [isSaving, setIsSaving] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [showPaymentHistoryModal, setShowPaymentHistoryModal] = useState(false);
    const [showHostelDetailsModal, setShowHostelDetailsModal] = useState(false);
    const [showWriteReviewModal, setShowWriteReviewModal] = useState(false);
    const [selectedBookingForModal, setSelectedBookingForModal] = useState<any>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        if (!isLoading) {
            if (!currentUser) {
                router.push('/login');
            } else {
                setFormData({
                    name: currentUser.name,
                    email: currentUser.email,
                    phone: currentUser.phone || '',
                    guardianContact: currentUser.guardianContact || '',
                    address: currentUser.address || '',
                    gender: currentUser.gender || 'Other',
                    bio: currentUser.bio || '',
                    emergencyContact: currentUser.emergencyContact || '',
                    profileImage: currentUser.profileImage || ''
                });
            }
        }
    }, [currentUser, isLoading, router]);

    // Clear feedback message after 3s
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    if (isLoading) {
        return <div className="min-h-screen bg-gray-50/50 flex items-center justify-center font-bold text-gray-400 animate-pulse">Authenticating...</div>;
    }

    if (!currentUser) return null;

    // Filter bookings for this user
    const myBookings = bookings.filter(b => b.userId === currentUser.id);
    const activeBooking = myBookings.find(b => b.status === 'approved');
    const myHostel = activeBooking ? hostels.find(h => h.id === activeBooking.hostelId) : null;

    // Simulated payment history (12 months)
    const paymentHistory = [
        { month: 'January', status: 'paid', amount: myHostel?.price || 0 },
        { month: 'February', status: 'paid', amount: myHostel?.price || 0 },
        { month: 'March', status: 'paid', amount: myHostel?.price || 0 },
        { month: 'April', status: 'unpaid', amount: myHostel?.price || 0 },
        { month: 'May', status: 'pending', amount: myHostel?.price || 0 },
        { month: 'June', status: 'pending', amount: myHostel?.price || 0 },
        { month: 'July', status: 'pending', amount: myHostel?.price || 0 },
        { month: 'August', status: 'pending', amount: myHostel?.price || 0 },
        { month: 'September', status: 'pending', amount: myHostel?.price || 0 },
        { month: 'October', status: 'pending', amount: myHostel?.price || 0 },
        { month: 'November', status: 'pending', amount: myHostel?.price || 0 },
        { month: 'December', status: activeBooking?.monthlyFeeStatus || 'pending', amount: myHostel?.price || 0 },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, profileImage: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveRequest = () => {
        // Validation first
        if (!formData.name) {
            setMessage({ type: 'error', text: 'নাম প্রদান করা প্রয়োজন' });
            return;
        }
        setShowConfirmModal(true);
    };

    const handleConfirmPassword = async (password: string) => {
        if (password !== currentUser.password) {
            setMessage({ type: 'error', text: 'পাসওয়ার্ড সঠিক নয়' });
            return;
        }

        setIsSaving(true);
        const updatedUser: User = {
            ...currentUser,
            ...formData as User
        };

        // Update in both contexts
        updateUser(updatedUser);
        if (updateCurrentUser) {
            updateCurrentUser(updatedUser);
        }

        setIsEditing(false);
        setIsSaving(false);
        setShowConfirmModal(false);
        setMessage({ type: 'success', text: 'প্রোফাইল সফলভাবে আপডেট হয়েছে!' });
    };

    const handleChangePassword = async (current: string, newP: string) => {
        if (current !== currentUser.password) return false;

        const updatedUser: User = {
            ...currentUser,
            password: newP
        };

        updateUser(updatedUser);
        if (updateCurrentUser) {
            updateCurrentUser(updatedUser);
        }
        setMessage({ type: 'success', text: 'পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে!' });
        return true;
    };

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20">
            {/* SEO Structured Data (JSON-LD) */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": currentUser.name,
                        "email": currentUser.email,
                        "jobTitle": "Resident",
                        "description": currentUser.bio || "হোস্টেলপ্রো কমিউনিটির সদস্য",
                        "image": currentUser.profileImage || ""
                    })
                }}
            />

            {/* Feedback Message */}
            {message && (
                <div className={`fixed top-24 right-4 z-100 p-4 rounded-2xl shadow-xl border animate-in slide-in-from-right duration-300 ${message.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'
                    }`}>
                    <div className="flex items-center gap-3">
                        {message.type === 'success' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>
                        )}
                        <span className="font-bold">{message.text}</span>
                    </div>
                </div>
            )}

            <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
                <div className="max-w-5xl mx-auto">
                    {/* Hero Profile Header */}
                    <div className="relative mb-8">
                        <div className="h-32 md:h-48 bg-linear-to-r from-blue-600 to-indigo-700 rounded-3xl shadow-lg -mb-16 md:-mb-20"></div>
                        <div className="px-6 md:px-10 flex flex-col md:flex-row items-end gap-6 text-center md:text-left">
                            <div className="mx-auto md:mx-0">
                                <div className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-white shadow-xl bg-white overflow-hidden relative group">
                                    {formData.profileImage ? (
                                        <img src={formData.profileImage} alt={currentUser.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-blue-50 flex items-center justify-center text-5xl font-bold text-blue-600">
                                            {currentUser.name[0]}
                                        </div>
                                    )}
                                    {isEditing && (
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                            </svg>
                                        </button>
                                    )}
                                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                                </div>
                            </div>
                            <div className="grow pb-2">
                                <h1 className="text-3xl font-bold text-gray-900 mb-1">{currentUser.name}</h1>
                                <p className="text-gray-500 font-medium">{currentUser.email}</p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                                    <Badge className="bg-blue-600">আবাসিক সদস্য</Badge>
                                    {activeBooking && <Badge variant="success">সক্রিয় বরাদ্দ</Badge>}
                                </div>
                            </div>
                            <div className="pb-2 w-full md:w-auto">
                                {!isEditing ? (
                                    <Button
                                        onClick={() => setIsEditing(true)}
                                        className="rounded-2xl px-10 w-full md:w-auto h-14 font-black shadow-xl shadow-blue-200 bg-linear-to-r from-blue-600 to-indigo-600 hover:scale-105 transition-all text-xs uppercase tracking-widest"
                                    >
                                        তথ্য আপডেট করুন
                                    </Button>
                                ) : (
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <Button variant="outline" onClick={() => setIsEditing(false)} className="rounded-xl flex-1">বাতিল করুন</Button>
                                        <Button onClick={handleSaveRequest} disabled={isSaving} className="rounded-xl px-8 flex-1">
                                            {isSaving ? 'সেভ হচ্ছে...' : 'প্রোফাইল সেভ করুন'}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Personal Info & Bio */}
                        <div className="lg:col-span-2 space-y-8">
                            <Card className="p-6 md:p-8 rounded-3xl shadow-sm border-gray-100">
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-xl font-bold flex items-center gap-2">
                                        <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                                        ব্যক্তিগত তথ্য
                                    </h2>
                                    {!isEditing && (
                                        <Button
                                            variant="ghost"
                                            onClick={() => setShowChangePasswordModal(true)}
                                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 gap-2 font-bold py-1 px-3 text-sm h-auto"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            পাসওয়ার্ড পরিবর্তন
                                        </Button>
                                    )}
                                </div>

                                {isEditing ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <AuthInput label="পূর্ণ নাম" id="name" name="name" value={formData.name} onChange={handleInputChange} />
                                        <AuthInput label="ইমেইল ঠিকানা" id="email" name="email" value={formData.email} onChange={handleInputChange} disabled title="ইমেইল পরিবর্তন করা সম্ভব নয়" />
                                        <AuthInput label="ফোন নম্বর" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                                        <AuthInput label="অভিভাবকের যোগাযোগ" id="guardianContact" name="guardianContact" value={formData.guardianContact} onChange={handleInputChange} />
                                        <AuthInput label="জরুরি যোগাযোগ" id="emergencyContact" name="emergencyContact" value={formData.emergencyContact} onChange={handleInputChange} />
                                        <div className="w-full">
                                            <label className="text-sm font-medium text-gray-700 mb-1 block">লিঙ্গ (Gender)</label>
                                            <select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleInputChange}
                                                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all duration-200"
                                            >
                                                <option value="Male">পুরুষ (Male)</option>
                                                <option value="Female">মহিলা (Female)</option>
                                                <option value="Other">অন্যান্য (Other)</option>
                                            </select>
                                        </div>
                                        <div className="md:col-span-2 space-y-4">
                                            <div className="w-full">
                                                <label className="text-sm font-medium text-gray-700 mb-1 block">পূর্ণ বর্তমান ঠিকানা</label>
                                                <textarea
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    rows={3}
                                                    className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all duration-200"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label className="text-sm font-medium text-gray-700 mb-1 block">আমার সম্পর্কে (Bio)</label>
                                                <textarea
                                                    name="bio"
                                                    value={formData.bio}
                                                    onChange={handleInputChange}
                                                    rows={4}
                                                    placeholder="আপনার সম্পর্কে কিছু লিখুন..."
                                                    className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all duration-200"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                                        <InfoItem label="পূর্ণ নাম" value={currentUser.name} />
                                        <InfoItem label="ইমেইল অ্যাকাউন্ট" value={currentUser.email} />
                                        <InfoItem label="ফোন নম্বর" value={currentUser.phone || 'দেওয়া হয়নি'} />
                                        <InfoItem label="অভিভাবকের মোবাইল" value={currentUser.guardianContact || 'দেওয়া হয়নি'} />
                                        <InfoItem label="জরুরি যোগাযোগ" value={currentUser.emergencyContact || 'দেওয়া হয়নি'} />
                                        <InfoItem label="লিঙ্গ (Gender)" value={currentUser.gender || 'উল্লেখ নেই'} />
                                        <div className="md:col-span-2">
                                            <InfoItem label="বর্তমান ঠিকানা" value={currentUser.address || 'কোনো ঠিকানা যোগ করা হয়নি'} />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">সংক্ষিপ্ত জীবনী (Bio)</label>
                                            <div className="relative group/bio">
                                                <div className="absolute -inset-1 bg-linear-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl blur opacity-0 group-hover/bio:opacity-100 transition duration-500"></div>
                                                <p className="relative text-gray-700 leading-relaxed italic bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                                    {currentUser.bio || "নিজেকে অন্যের কাছে পরিচিত করতে কিছু লিখুন!"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Card>

                            {/* Notices Section */}
                            <div>
                                <h2 className="text-2xl font-bold mb-6 flex items-center justify-between">
                                    হোস্টেল বুলেটিন (নোটিশ)
                                    <Badge className="bg-indigo-100 text-indigo-700 border-none px-3 font-bold">নতুন</Badge>
                                </h2>
                                <div className="space-y-4">
                                    {(() => {
                                        const myHostelIds = activeBooking ? [activeBooking.hostelId] : [];
                                        const relevantNotices = (notices || [])
                                            .filter(n => myHostelIds.includes(n.hostelId))
                                            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

                                        if (relevantNotices.length === 0) {
                                            return (
                                                <div className="p-12 text-center bg-white rounded-3xl border-2 border-dashed border-gray-200 shadow-xs">
                                                    <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                        </svg>
                                                    </div>
                                                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">আপডেটের অপেক্ষা</p>
                                                    <p className="text-gray-500 mt-2">কোনো অফিসিয়াল নোটিশ এখনো দেয়া হয়নি।</p>
                                                </div>
                                            );
                                        }

                                        return relevantNotices.map(notice => (
                                            <div key={notice.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group border-l-4 border-l-blue-600">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                                                    <h4 className="font-black text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{notice.title}</h4>
                                                    <Badge variant="default" className="text-[10px] uppercase font-black tracking-widest text-gray-400 border border-gray-100 bg-transparent">
                                                        {notice.date}
                                                    </Badge>
                                                </div>
                                                <p className="text-gray-600 text-sm leading-relaxed antialiased">{notice.content}</p>
                                            </div>
                                        ));
                                    })()}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Fees and Hostel Info */}
                        <div className="space-y-8">
                            {/* Monthly Fee Status */}
                            {activeBooking && (
                                <Card className="p-8 rounded-3xl shadow-sm border-gray-100 bg-linear-to-br from-white to-gray-50 relative overflow-hidden">
                                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/5 rounded-full blur-3xl"></div>
                                    <h2 className="text-lg font-bold mb-6 flex items-center gap-3">
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        আর্থিক সারসংক্ষেপ
                                    </h2>

                                    <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-100">
                                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">চলতি মাসের অবস্থা ({new Date().toLocaleString('bn-BD', { month: 'long' })})</span>
                                        {activeBooking.monthlyFeeStatus === 'paid' ? (
                                            <Badge variant="success" className="px-4 py-1.5 font-black tracking-widest border-none shadow-sm shadow-green-200">পরিশোধিত</Badge>
                                        ) : activeBooking.monthlyFeeStatus === 'pending' ? (
                                            <Badge variant="warning" className="px-4 py-1.5 font-black tracking-widest border-none shadow-sm shadow-orange-200">অপেক্ষমান</Badge>
                                        ) : (
                                            <Badge variant="danger" className="px-4 py-1.5 font-black tracking-widest border-none shadow-sm shadow-red-200">অপরিশোধিত</Badge>
                                        )}
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center group">
                                            <span className="text-sm font-bold text-gray-500 group-hover:text-gray-700 transition-colors">শেষ লেনদেন</span>
                                            <span className="text-sm font-black text-gray-900">{activeBooking.lastPaymentDate || 'অপেক্ষমান'}</span>
                                        </div>
                                        <div className="flex justify-between items-center group">
                                            <span className="text-sm font-bold text-gray-500 group-hover:text-gray-700 transition-colors">মাসিক ভাড়া</span>
                                            <div className="text-right">
                                                <span className="text-lg font-black text-blue-600">৳{myHostel?.price || 0}</span>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase">ভ্যাট সহ</p>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        variant="outline"
                                        className="w-full mt-8 rounded-2xl text-[10px] uppercase tracking-[0.2em] font-black h-14 bg-white hover:bg-gray-50 transition-all border-gray-100 text-gray-600"
                                        onClick={() => setShowPaymentHistoryModal(true)}
                                    >
                                        পেমেন্ট ইতিহাস দেখুন
                                    </Button>
                                </Card>
                            )}

                            {/* My Current Hostel Card */}
                            {myHostel && (
                                <Card className="overflow-hidden rounded-3xl shadow-sm border-gray-100 hover:shadow-xl transition-all group/hostel">
                                    <div className="h-44 relative overflow-hidden">
                                        <img src={myHostel.image} alt={myHostel.name} className="w-full h-full object-cover transition-transform duration-700 group-hover/hostel:scale-110" />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                                            <div>
                                                <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-1">বর্তমানে থাকছেন</p>
                                                <h3 className="text-white font-black text-2xl tracking-tight leading-none">{myHostel.name}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 space-y-5 bg-white">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-2xl group-hover/hostel:rotate-12 transition-transform">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">এলাকা / জোন</p>
                                                <p className="text-sm font-bold text-gray-800">{myHostel.location}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-2xl group-hover/hostel:-rotate-12 transition-transform">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">আবাসিক ব্যবস্থা</p>
                                                <p className="text-sm font-bold text-gray-800">রুম {activeBooking?.roomId} • বেড {activeBooking?.bedId}</p>
                                            </div>
                                        </div>
                                        <div className="pt-2 flex flex-col sm:flex-row gap-3">
                                            <Button
                                                variant="outline"
                                                className="flex-1 rounded-xl h-11 text-[10px] font-black uppercase tracking-widest border-gray-100 text-gray-600 hover:bg-gray-50"
                                                onClick={() => {
                                                    setSelectedBookingForModal(activeBooking);
                                                    setShowHostelDetailsModal(true);
                                                }}
                                            >
                                                বিস্তারিত তথ্য
                                            </Button>
                                            <Button
                                                className="flex-1 rounded-xl h-11 text-[10px] font-black uppercase tracking-widest bg-blue-600 shadow-lg shadow-blue-100"
                                                onClick={() => setShowWriteReviewModal(true)}
                                            >
                                                রিভিউ দিন
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            )}

                            {/* Bookings Summary */}
                            <Card className="p-6 md:p-8 rounded-3xl shadow-sm border-gray-100">
                                <h3 className="font-black text-gray-900 mb-6 uppercase tracking-widest text-xs">ইতিহাস (History)</h3>
                                <div className="space-y-4">
                                    {myBookings.map(b => (
                                        <div
                                            key={b.id}
                                            onClick={() => {
                                                setSelectedBookingForModal(b);
                                                setShowHostelDetailsModal(true);
                                            }}
                                            className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer group/log"
                                        >
                                            <div className="max-w-[140px] sm:max-w-none">
                                                <p className="text-sm font-bold text-gray-800 truncate sm:whitespace-normal group-hover/log:text-blue-600 transition-colors uppercase tracking-tight leading-none mb-1.5">{b.hostelName}</p>
                                                <p className="text-[10px] font-bold text-gray-400">{b.date}</p>
                                            </div>
                                            {b.status === 'approved' ? (
                                                <Badge className="bg-green-100 text-green-700 text-[9px] px-2 py-0 font-black border-none ring-1 ring-green-200">বৈধ (VALID)</Badge>
                                            ) : b.status === 'pending' ? (
                                                <Badge className="bg-orange-100 text-orange-700 text-[9px] px-2 py-0 font-black border-none ring-1 ring-orange-200">যাচাই (VERIFY)</Badge>
                                            ) : (
                                                <Badge className="bg-red-100 text-red-700 text-[9px] px-2 py-0 font-black border-none ring-1 ring-red-200">বাতিল (VOID)</Badge>
                                            )}
                                        </div>
                                    ))}
                                    {myBookings.length === 0 && (
                                        <div className="text-center py-6">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">কোনো তথ্য নেই</p>
                                        </div>
                                    )}
                                </div>
                            </Card>

                            <Button
                                variant="outline"
                                className="w-full rounded-4xl border-none text-white h-24 font-black uppercase tracking-[0.4em] text-[12px] transition-all shadow-2xl shadow-blue-200/50 bg-linear-to-r from-blue-600 via-blue-500 to-indigo-600 hover:scale-[1.02] active:scale-[0.98] group overflow-hidden"
                                onClick={logout}
                            >
                                <span className="relative flex items-center justify-center gap-6">
                                    <div className="h-10 w-10 flex items-center justify-center bg-white/20 rounded-2xl group-hover:rotate-12 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                        </svg>
                                    </div>
                                    নিরাপদ লগআউট
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <ConfirmPasswordModal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={handleConfirmPassword}
                isSaving={isSaving}
            />

            <ChangePasswordModal
                isOpen={showChangePasswordModal}
                onClose={() => setShowChangePasswordModal(false)}
                onConfirm={handleChangePassword}
            />

            <PaymentHistoryModal
                isOpen={showPaymentHistoryModal}
                onClose={() => setShowPaymentHistoryModal(false)}
                paymentHistory={paymentHistory}
            />

            <HostelDetailsModal
                isOpen={showHostelDetailsModal}
                onClose={() => {
                    setShowHostelDetailsModal(false);
                    setSelectedBookingForModal(null);
                }}
                hostel={selectedBookingForModal ? hostels.find(h => h.id === selectedBookingForModal.hostelId) : myHostel}
                booking={selectedBookingForModal || activeBooking}
            />

            <WriteReviewModal
                isOpen={showWriteReviewModal}
                onClose={() => setShowWriteReviewModal(false)}
                hostelName={myHostel?.name || ''}
                onSubmit={(review) => {
                    console.log('Review Submitted:', review);
                    alert('আপনার মূল্যবান রিভিউর জন্য ধন্যবাদ!');
                }}
            />
        </div>
    );
}

function InfoItem({ label, value }: { label: string, value: string }) {
    return (
        <div className="group">
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 group-hover:text-blue-500 transition-colors">{label}</label>
            <p className="text-lg font-bold text-gray-900 tracking-tight group-hover:translate-x-1 transition-transform">{value}</p>
        </div>
    );
}
