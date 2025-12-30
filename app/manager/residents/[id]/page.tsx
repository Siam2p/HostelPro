"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import Image from 'next/image';
import EditResidentModal from '../../components/EditResidentModal';

export default function ResidentDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { currentUser } = useAuth();
    const { bookings, hostels, updateBookingStatus, users } = useData();
    const [resident, setResident] = useState<any | null>(null);
    const [user, setUser] = useState<any | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Mock Payment History State (Jan-Dec)
    const [paymentHistory, setPaymentHistory] = useState<Record<string, 'paid' | 'unpaid' | 'pending'>>({
        'January': 'paid',
        'February': 'paid',
        'March': 'paid',
        'April': 'unpaid',
        'May': 'pending',
        'June': 'pending',
        'July': 'pending',
        'August': 'pending',
        'September': 'pending',
        'October': 'pending',
        'November': 'pending',
        'December': 'pending',
    });

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    useEffect(() => {
        if (!currentUser || currentUser.role !== 'manager') {
            router.push('/login');
            return;
        }

        if (id) {
            // Find resident by ID (ensure type matching since param is string)
            const foundResident = bookings.find(b => String(b.id) === String(id));
            if (foundResident) {
                setResident(foundResident);
                // Find associated user
                const foundUser = users.find(u => u.id === foundResident.userId);
                setUser(foundUser || null);

                // Sync current month status from context if available
                if (foundResident.monthlyFeeStatus) {
                    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
                    setPaymentHistory(prev => ({
                        ...prev,
                        [currentMonth]: foundResident.monthlyFeeStatus || 'pending'
                    }));
                }
            } else {
                // Handle not found
            }
        }
    }, [id, bookings, currentUser, router, users]);

    const handleStatusChange = (month: string, status: 'paid' | 'unpaid') => {
        setPaymentHistory(prev => ({
            ...prev,
            [month]: status
        }));

        // If updating the current month, we could sync it back to the global context
        const currentMonth = new Date().toLocaleString('default', { month: 'long' });
        if (month === currentMonth && resident) {
            // This is a hack since we don't have a direct method to update just the fee status in the context
            // In a real app, we'd call an API endpoint
            console.log(`Updated ${month} status to ${status} for ${resident.userName}`);
        }
    };

    if (!resident) {
        return <div className="p-10 text-center">Loading resident details...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header / Hero */}
            <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white pb-20 pt-10 px-3">
                <div className="container mx-auto">
                    <Button
                        variant="outline"
                        className="mb-6 text-white border-white/30 hover:bg-white/10"
                        onClick={() => router.back()}
                    >
                        ← Back to Dashboard
                    </Button>
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="h-24 w-24 rounded-full bg-white text-blue-600 flex items-center justify-center text-4xl font-bold shadow-xl border-4 border-white/20">
                            {resident.userName.charAt(0)}
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold">{resident.userName}</h1>
                            <p className="text-blue-100 flex items-center justify-center md:justify-start gap-2 mt-1">
                                <span>ID: #{String(resident.id).slice(-4)}</span>
                                <span className="bg-white/20 px-2 py-0.5 rounded text-xs">Resident</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-3 -mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Info */}
                    <div className="space-y-8">
                        {/* Personal Info */}
                        <Card className="p-6 shadow-lg border-none">
                            <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
                                <h3 className="text-lg font-bold text-gray-800">ব্যক্তিগত তথ্য</h3>
                                <button
                                    onClick={() => setIsEditModalOpen(true)}
                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 hover:bg-blue-50 px-2 py-1 rounded-lg transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                    Edit
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Full Name</label>
                                    <p className="font-medium text-gray-700">{user?.name || resident.userName}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Phone</label>
                                    <p className="font-medium text-gray-700">{user?.phone || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Email</label>
                                    <p className="font-medium text-gray-700">{user?.email || 'student@example.com'}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Guardian Contact</label>
                                    <p className="font-medium text-gray-700">{user?.guardianContact || 'N/A'}</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-gray-100">
                                <a
                                    href={user?.guardianContact ? `tel:${user.guardianContact.replace(/[^\d+]/g, '')}` : '#'}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full font-bold text-sm text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                                        ${user?.guardianContact
                                            ? 'bg-linear-to-r from-blue-600 to-indigo-600 hover:shadow-blue-500/40 cursor-pointer'
                                            : 'bg-gray-400 cursor-not-allowed opacity-70'}`}
                                    onClick={(e) => !user?.guardianContact && e.preventDefault()}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span>Call Guardian</span>
                                </a>

                                <a
                                    href={user?.phone ? `tel:${user.phone.replace(/[^\d+]/g, '')}` : '#'}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full font-bold text-sm border-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                                        ${user?.phone
                                            ? 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 cursor-pointer'
                                            : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'}`}
                                    onClick={(e) => !user?.phone && e.preventDefault()}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span>Call {user?.name ? user.name.split(' ')[0] : 'Resident'}</span>
                                </a>
                            </div>
                        </Card>

                        {/* Hostel Info */}
                        <Card className="p-6 shadow-lg border-none">
                            <h3 className="text-lg font-bold border-b border-gray-100 pb-3 mb-4 text-gray-800">হোস্টেল তথ্য</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Hostel Name</span>
                                    <span className="font-medium text-gray-800">{resident.hostelName}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Room No</span>
                                    <span className="font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">{resident.roomId}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Bed ID</span>
                                    <span className="font-medium text-gray-800">{resident.bedId}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Joined Date</span>
                                    <span className="font-medium text-gray-800">{resident.date}</span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column: Fee Management */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="p-6 shadow-lg border-none">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-800">মাসিক ফি ম্যানেজমেন্ট (2025)</h3>
                                <Badge variant="warning">Pending Dues: ৳10,000</Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {months.map((month, idx) => (
                                    <div key={month} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md hover:border-blue-100 transition-all duration-300">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-2xl bg-gray-50 flex items-center justify-center font-black text-gray-400 text-xs text-sans">
                                                {idx + 1}
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                <p className="font-bold text-gray-800 text-lg">{month}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleStatusChange(month, 'paid')}
                                                className={`h-9 px-5 rounded-full text-[10px] font-black transition-all duration-300 uppercase tracking-widest border shadow-xs ${paymentHistory[month] === 'paid'
                                                    ? 'bg-green-500 text-white border-green-500'
                                                    : 'bg-green-500/10 text-green-600 border-green-200/50 hover:bg-green-500 hover:text-white'
                                                    }`}
                                            >
                                                MARK PAID
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(month, 'unpaid')}
                                                className={`h-9 px-5 rounded-full text-[10px] font-black transition-all duration-300 uppercase tracking-widest border shadow-xs ${paymentHistory[month] !== 'paid'
                                                    ? (idx < new Date().getMonth() ? 'bg-red-500 text-white border-red-500' : 'bg-orange-500 text-white border-orange-500')
                                                    : 'bg-red-500/10 text-red-600 border-red-200/50 hover:bg-red-500 hover:text-white'
                                                    }`}
                                            >
                                                {paymentHistory[month] !== 'paid'
                                                    ? (idx < new Date().getMonth() ? 'UNPAID' : 'PENDING')
                                                    : 'MARK UNPAID'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <div className="flex justify-end gap-4">
                            <Button variant="outline" className="text-red-500 hover:bg-red-50 border-red-200">Remove Student</Button>
                            <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                        </div>
                    </div>
                </div>
            </div>

            <EditResidentModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                residentId={resident ? resident.id : null}
            />
        </div >
    );
}
