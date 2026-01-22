import React, { RefObject } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { User } from '@/lib/types';

interface ProfileHeaderProps {
    currentUser: User;
    isEditing: boolean;
    formData: Partial<User>;
    setIsEditing: (value: boolean) => void;
    onSaveRequest: () => void;
    isSaving: boolean;
    fileInputRef: RefObject<HTMLInputElement | null>;
    onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    activeBooking: boolean;
}

export default function ProfileHeader({
    currentUser,
    isEditing,
    formData,
    setIsEditing,
    onSaveRequest,
    isSaving,
    fileInputRef,
    onPhotoUpload,
    activeBooking
}: ProfileHeaderProps) {
    return (
        <div className="relative mb-8">
            <div className="h-32 md:h-48 bg-linear-to-r from-primaryDip to-indigo-700 rounded-3xl shadow-lg -mb-16 md:-mb-20"></div>
            <div className="px-3 md:px-10 flex flex-col md:flex-row items-end gap-6 text-center md:text-left">
                <div className="mx-auto md:mx-0">
                    <div className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-white shadow-xl bg-white overflow-hidden relative group">
                        {formData.profileImage ? (
                            <img src={formData.profileImage} alt={currentUser.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-blue-50 flex items-center justify-center text-5xl font-bold text-primaryDip">
                                {currentUser.name[0]}
                            </div>
                        )}
                        {isEditing && (
                            <button
                                aria-label='btn'
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                </svg>
                            </button>
                        )}
                        <input aria-label="Upload profile photo" type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={onPhotoUpload} />
                    </div>
                </div>
                <div className="grow pb-2 flex flex-col md:block items-center md:items-start w-full md:w-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">{currentUser.name}</h1>
                    <p className="text-gray-500 font-medium">{currentUser.email}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200 px-4 py-1">আবাসিক সদস্য</Badge>
                        {activeBooking && <Badge variant="success">সক্রিয় বরাদ্দ</Badge>}
                    </div>
                </div>
                <div className="pb-2 w-full md:w-auto">
                    {!isEditing ? (
                        <Button
                            onClick={() => setIsEditing(true)}
                            className="rounded-2xl px-10 w-full md:w-auto h-14 font-black shadow-xl shadow-blue-200 bg-linear-to-r from-primaryDip to-primaryDipTo hover:scale-105 transition-all text-xs uppercase tracking-widest"
                        >
                            তথ্য আপডেট করুন
                        </Button>
                    ) : (
                        <div className="flex flex-col sm:flex-row gap-2">
                            <Button variant="outline" onClick={() => setIsEditing(false)} className="rounded-xl flex-1">বাতিল করুন</Button>
                            <Button onClick={onSaveRequest} disabled={isSaving} className="rounded-xl px-8 flex-1">
                                {isSaving ? 'সেভ হচ্ছে...' : 'প্রোফাইল সেভ করুন'}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
