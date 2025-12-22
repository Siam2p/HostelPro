"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function UserProfilePage() {
    const { currentUser, logout } = useAuth();
    const { bookings, hostels } = useData();
    const router = useRouter();

    useEffect(() => {
        if (!currentUser) {
            router.push('/login');
        }
    }, [currentUser, router]);

    if (!currentUser) return null;

    // Filter bookings for this user
    const myBookings = bookings.filter(b => b.userId === currentUser.id);

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="max-w-4xl mx-auto">
                {/* Header Profile Section */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6 mb-8">
                    <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-4xl font-bold text-primary">
                        {currentUser.name[0]}
                    </div>
                    <div className="flex-grow text-center md:text-left">
                        <h1 className="text-3xl font-bold text-gray-900">{currentUser.name}</h1>
                        <p className="text-gray-500">{currentUser.email}</p>
                        <Badge variant="default" className="mt-2 bg-blue-100 text-blue-700 hover:bg-blue-200 border-none">
                            User Account
                        </Badge>
                    </div>
                </div>

                {/* Personal Info Section */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                    <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-4">ব্যক্তিগত তথ্য</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Full Name</label>
                            <div className="text-lg font-medium text-gray-900">{currentUser.name}</div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Phone</label>
                            <div className="text-lg font-medium text-gray-900">{currentUser.phone || 'N/A'}</div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Email</label>
                            <div className="text-lg font-medium text-gray-900">{currentUser.email}</div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Guardian Contact</label>
                            <div className="text-lg font-medium text-gray-900">{currentUser.guardianContact || 'N/A'}</div>
                        </div>
                    </div>
                </div>

                {/* Notice Board Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-6">নোটিশ বোর্ড</h2>
                    <div className="grid gap-4">
                        {(() => {
                            // Find hostels where user has approved bookings
                            const myHostelIds = bookings
                                .filter(b => b.userId === currentUser.id && b.status === 'approved')
                                .map(b => b.hostelId);

                            const relevantNotices = (useData().notices || [])
                                .filter(n => myHostelIds.includes(n.hostelId))
                                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

                            if (relevantNotices.length === 0) {
                                return (
                                    <Card className="p-8 text-center bg-gray-50 border-dashed border-2">
                                        <p className="text-gray-500">আপনার হোস্টেলের জন্য কোনো নতুন নোটিশ নেই</p>
                                    </Card>
                                );
                            }

                            return relevantNotices.map(notice => {
                                const hostel = hostels.find(h => h.id === notice.hostelId);
                                return (
                                    <div key={notice.id} className="bg-white p-5 rounded-xl border-l-4 border-blue-500 shadow-sm flex flex-col md:flex-row justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Badge variant="default" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-none">
                                                    {hostel?.name || 'Hostel Notice'}
                                                </Badge>
                                                <span className="text-sm text-gray-500">{notice.date}</span>
                                            </div>
                                            <h4 className="font-bold text-gray-900 mb-1">{notice.title}</h4>
                                            <p className="text-gray-800">{notice.content}</p>
                                        </div>
                                    </div>
                                );
                            });
                        })()}
                    </div>
                </div>

                {/* Bookings Section */}
                <h2 className="text-2xl font-bold mb-6">আমার বুকিংসমূহ</h2>

                {myBookings.length === 0 ? (
                    <Card className="p-12 text-center bg-gray-50 border-dashed border-2">
                        <p className="text-xl text-gray-500 mb-4">আপনার কোনো বুকিং নেই</p>
                        <Button onClick={() => router.push('/')}>
                            হোস্টেল খুঁজুন
                        </Button>
                    </Card>
                ) : (
                    <div className="grid gap-6">
                        {myBookings.map(booking => {
                            const hostel = hostels.find(h => h.id === booking.hostelId);
                            return (
                                <Card key={booking.id} className="overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="w-full md:w-48 h-32 bg-gray-200 rounded-lg overflow-hidden relative flex-shrink-0">
                                            {hostel ? (
                                                <img src={hostel.image} alt={hostel.name} className="object-cover w-full h-full" />
                                            ) : (
                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                                    No Image
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900">{booking.hostelName}</h3>
                                                    <div className="text-sm text-gray-500 mt-1">
                                                        <span className="font-semibold text-gray-700">রুম:</span> {booking.roomId} •
                                                        <span className="font-semibold text-gray-700 ml-2">সিট:</span> {booking.bedId}
                                                    </div>
                                                    <div className="text-sm text-gray-500 mt-1">
                                                        <span className="font-semibold text-gray-700">তারিখ:</span> {booking.date}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    {booking.status === 'pending' && <Badge variant="warning">অপেক্ষমান</Badge>}
                                                    {booking.status === 'approved' && <Badge variant="success">অনুমোদিত</Badge>}
                                                    {booking.status === 'rejected' && <Badge variant="danger">বাতিল</Badge>}
                                                </div>
                                            </div>

                                            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                                {hostel && (
                                                    <div className="text-sm text-gray-500">
                                                        📍 {hostel.location}
                                                    </div>
                                                )}
                                                {hostel && (
                                                    <Button
                                                        variant="outline"
                                                        className="py-1 px-3 text-xs"
                                                        onClick={() => router.push(`/hostels/${hostel.id}`)}
                                                    >
                                                        বিস্তারিত দেখুন
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
