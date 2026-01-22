import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AuthInput } from '@/components/ui/AuthInput';
import { User } from '@/lib/types';

interface PersonalInfoProps {
    currentUser: User;
    isEditing: boolean;
    formData: Partial<User>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    onChangePasswordClick: () => void;
}

function InfoItem({ label, value }: { label: string, value: string }) {
    return (
        <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-lg font-bold text-gray-800 break-words">{value}</p>
        </div>
    );
}

export default function PersonalInfo({
    currentUser,
    isEditing,
    formData,
    handleInputChange,
    onChangePasswordClick
}: PersonalInfoProps) {
    return (
        <Card className="p-6 md:p-8 rounded-3xl shadow-sm border-gray-100">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-primaryDip rounded-full"></span>
                    ব্যক্তিগত তথ্য
                </h2>
                {!isEditing && (
                    <Button
                        variant="ghost"
                        onClick={onChangePasswordClick}
                        className="text-primaryDip hover:text-blue-700 hover:bg-blue-50 gap-2 font-bold py-1 px-3 text-sm h-auto"
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
                    <AuthInput label="পূর্ণ নাম" id="name" name="name" value={formData.name || ''} onChange={handleInputChange} />
                    <AuthInput label="ইমেইল ঠিকানা" id="email" name="email" value={formData.email || ''} onChange={handleInputChange} disabled title="ইমেইল পরিবর্তন করা সম্ভব নয়" />
                    <AuthInput label="ফোন নম্বর" id="phone" name="phone" value={formData.phone || ''} onChange={handleInputChange} />
                    <AuthInput label="অভিভাবকের যোগাযোগ" id="guardianContact" name="guardianContact" value={formData.guardianContact || ''} onChange={handleInputChange} />
                    <AuthInput label="জরুরি যোগাযোগ" id="emergencyContact" name="emergencyContact" value={formData.emergencyContact || ''} onChange={handleInputChange} />
                    <div className="w-full">
                        <label className="text-sm font-medium text-gray-700 mb-1 block">লিঙ্গ (Gender)</label>
                        <select
                            title='gender'
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
                            <label htmlFor='address' className="text-sm font-medium text-gray-700 mb-1 block">পূর্ণ বর্তমান ঠিকানা</label>
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address || ''}
                                onChange={handleInputChange}
                                rows={3}
                                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all duration-200"
                            />
                        </div>
                        <div className="w-full">
                            <label className="text-sm font-medium text-gray-700 mb-1 block">আমার সম্পর্কে (Bio)</label>
                            <textarea
                                name="bio"
                                value={formData.bio || ''}
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
    );
}
