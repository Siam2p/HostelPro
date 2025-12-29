"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { User } from '@/lib/types';
import ProfileHeader from './components/ProfileHeader';
import PersonalInfo from './components/PersonalInfo';
import NoticeBoard from './components/NoticeBoard';
import FinancialSummary from './components/FinancialSummary';
import CurrentHostel from './components/CurrentHostel';
import { ConfirmPasswordModal } from './components/modals/ConfirmPasswordModal';
import { ChangePasswordModal } from './components/modals/ChangePasswordModal';
import { PaymentHistoryModal } from './components/modals/PaymentHistoryModal';
import { HostelDetailsModal } from './components/modals/HostelDetailsModal';
import { WriteReviewModal } from './components/modals/WriteReviewModal';

export default function ProfileClient() {
    const { currentUser, isLoading, updateCurrentUser } = useAuth();
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
        return <div className="min-h-screen bg-gray-50/50 flex items-center justify-center font-bold text-gray-400 animate-pulse">Checking Authentication...</div>;
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
                    <ProfileHeader
                        currentUser={currentUser}
                        isEditing={isEditing}
                        formData={formData}
                        setIsEditing={setIsEditing}
                        onSaveRequest={handleSaveRequest}
                        isSaving={isSaving}
                        fileInputRef={fileInputRef}
                        onPhotoUpload={handlePhotoUpload}
                        activeBooking={activeBooking}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Personal Info & Bio */}
                        <div className="lg:col-span-2 space-y-8">
                            <PersonalInfo
                                currentUser={currentUser}
                                isEditing={isEditing}
                                formData={formData}
                                handleInputChange={handleInputChange}
                                onChangePasswordClick={() => setShowChangePasswordModal(true)}
                            />

                            <NoticeBoard
                                notices={notices}
                                activeBooking={activeBooking}
                            />
                        </div>

                        {/* Right Column: Fees and Hostel Info */}
                        <div className="space-y-8">
                            {/* Financial Summary */}
                            <FinancialSummary
                                activeBooking={activeBooking}
                                myHostel={myHostel}
                                onViewHistory={() => setShowPaymentHistoryModal(true)}
                            />

                            {/* My Current Hostel Card */}
                            <CurrentHostel
                                myHostel={myHostel}
                                activeBooking={activeBooking}
                                onViewDetails={() => {
                                    setSelectedBookingForModal(activeBooking);
                                    setShowHostelDetailsModal(true);
                                }}
                                onWriteReview={() => setShowWriteReviewModal(true)}
                            />
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
                onClose={() => setShowHostelDetailsModal(false)}
                hostel={myHostel}
                booking={selectedBookingForModal}
            />

            <WriteReviewModal
                isOpen={showWriteReviewModal}
                onClose={() => setShowWriteReviewModal(false)}
                hostelName={myHostel?.name || ''}
                onSubmit={(review) => {
                    console.log('Review submitted:', review);
                    setMessage({ type: 'success', text: 'রিভিউ সফলভাবে জমা দেওয়া হয়েছে!' });
                }}
            />
        </div>
    );
}
