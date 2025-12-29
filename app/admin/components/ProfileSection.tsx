"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { User } from '@/lib/types';
import AdminProfileHeader from './AdminProfileHeader';
import AdminPersonalInfo from './AdminPersonalInfo';
import { ChangePasswordModal } from '@/app/profile/components/modals/ChangePasswordModal';
import { ConfirmPasswordModal } from '@/app/profile/components/modals/ConfirmPasswordModal';

export default function ProfileSection() {
    const { currentUser, updateCurrentUser } = useAuth();
    const { updateUser } = useData();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<User>>({});
    const [isSaving, setIsSaving] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        if (currentUser) {
            setFormData({
                name: currentUser.name,
                email: currentUser.email,
                phone: currentUser.phone || '',
                address: currentUser.address || '',
                gender: currentUser.gender || 'Other',
                profileImage: currentUser.profileImage || ''
            });
        }
    }, [currentUser]);

    // Clear feedback message after 3s
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    if (!currentUser) return null;

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
        <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Feedback Message */}
            {message && (
                <div className={`fixed top-24 right-4 z-100 p-4 rounded-2xl shadow-xl border animate-in slide-in-from-right duration-300 ${message.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'
                    }`}>
                    <div className="flex items-center gap-3">
                        <span className="font-bold">{message.text}</span>
                    </div>
                </div>
            )}

            <AdminProfileHeader
                currentUser={currentUser}
                isEditing={isEditing}
                formData={formData}
                setIsEditing={setIsEditing}
                onSaveRequest={handleSaveRequest}
                isSaving={isSaving}
                fileInputRef={fileInputRef}
                onPhotoUpload={handlePhotoUpload}
            />

            <div className="grid grid-cols-1 gap-8">
                <AdminPersonalInfo
                    currentUser={currentUser}
                    isEditing={isEditing}
                    formData={formData}
                    handleInputChange={handleInputChange}
                    onChangePasswordClick={() => setShowChangePasswordModal(true)}
                />
            </div>

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
        </div>
    );
}
