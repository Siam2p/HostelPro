"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import Image from 'next/image';

export default function ResidentDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { currentUser } = useAuth();
    const { bookings, hostels, updateBookingStatus } = useData();
    const [resident, setResident] = useState<any | null>(null);

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
    }, [id, bookings, currentUser, router]);

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
            <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white pb-20 pt-10 px-6">
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

            <div className="container mx-auto px-6 -mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Info */}
                    <div className="space-y-8">
                        {/* Personal Info */}
                        <Card className="p-6 shadow-lg border-none">
                            <h3 className="text-lg font-bold border-b border-gray-100 pb-3 mb-4 text-gray-800">ব্যক্তিগত তথ্য</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Full Name</label>
                                    <p className="font-medium text-gray-700">{resident.userName}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Phone</label>
                                    <p className="font-medium text-gray-700">017XXXXXXXX</p>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Email</label>
                                    <p className="font-medium text-gray-700">student@example.com</p>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Guardian Contact</label>
                                    <p className="font-medium text-gray-700">019XXXXXXXX (Father)</p>
                                </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-gray-100 flex gap-2">
                                <Button className="w-full text-xs" variant="outline">Call Guardian</Button>
                                <Button className="w-full text-xs" variant="outline">Message</Button>
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
                                {months.map((month) => (
                                    <div key={month} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
                                        <div className="font-medium text-gray-700">{month}</div>

                                        <div className="flex items-center gap-2">
                                            {paymentHistory[month] === 'paid' ? (
                                                <Badge variant="success" className="px-3 py-1">PAID</Badge>
                                            ) : paymentHistory[month] === 'unpaid' ? (
                                                <Badge variant="danger" className="px-3 py-1">UNPAID</Badge>
                                            ) : (
                                                <Badge variant="warning" className="px-3 py-1">PENDING</Badge>
                                            )}

                                            {/* Toggle Actions */}
                                            <div className="flex flex-col gap-1 ml-2">
                                                {paymentHistory[month] !== 'paid' && (
                                                    <button
                                                        onClick={() => handleStatusChange(month, 'paid')}
                                                        className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded hover:bg-green-200 transition-colors"
                                                    >
                                                        Mark Paid
                                                    </button>
                                                )}
                                                {paymentHistory[month] !== 'unpaid' && (
                                                    <button
                                                        onClick={() => handleStatusChange(month, 'unpaid')}
                                                        className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded hover:bg-red-200 transition-colors"
                                                    >
                                                        Mark Unpaid
                                                    </button>
                                                )}
                                            </div>
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
        </div>
    );
}
