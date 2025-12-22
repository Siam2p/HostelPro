"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Hostel } from '@/lib/types';
import dynamic from 'next/dynamic';

const MapPicker = dynamic(() => import('@/components/MapPicker'), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full bg-gray-100 animate-pulse rounded-lg mt-4">Loading Map...</div>
});

export default function ManagerDashboard() {
    const { currentUser } = useAuth();
    const { hostels, bookings, updateBookingStatus, addHostel } = useData();
    const router = useRouter();
    const [showAddModal, setShowAddModal] = useState(false);

    // Form State
    const [newHostelName, setNewHostelName] = useState('');
    const [newHostelPrice, setNewHostelPrice] = useState('');
    const [newHostelLoc, setNewHostelLoc] = useState('');
    const [newHostelCoords, setNewHostelCoords] = useState<{ lat: number, lng: number } | null>(null);

    useEffect(() => {
        if (!currentUser || currentUser.role !== 'manager') {
            router.push('/login');
        }
    }, [currentUser, router]);

    if (!currentUser || currentUser.role !== 'manager') {
        return null;
    }

    const myHostels = hostels.filter(h => h.managerId === currentUser.id);
    const pendingBookings = bookings.filter(b => b.status === 'pending');

    const handleAddHostel = (e: React.FormEvent) => {
        e.preventDefault();
        const newId = Date.now();
        addHostel({
            id: newId,
            name: newHostelName,
            location: newHostelLoc,
            coordinates: newHostelCoords || undefined,
            price: Number(newHostelPrice),
            description: "নতুন হোস্টেল",
            image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            rating: 0,
            totalRooms: 5,
            features: ["Wifi"],
            managerId: currentUser.id,
            rooms: [
                { id: "A1", capacity: 4, occupied: [], price: Number(newHostelPrice) }
            ]
        });
        setShowAddModal(false);
        setNewHostelName('');
        setNewHostelPrice('');
        setNewHostelLoc('');
        setNewHostelCoords(null);
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">ম্যানেজার ড্যাশবোর্ড</h1>
                <Button onClick={() => setShowAddModal(true)}>+ নতুন হোস্টেল যোগ করুন</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Booking Applications */}
                <Card className="min-h-[400px]">
                    <h2 className="text-xl font-bold mb-4 border-b border-border pb-2">বুকিং অনুরোধ ({pendingBookings.length})</h2>
                    <div className="flex flex-col gap-4">
                        {pendingBookings.length === 0 ? (
                            <p className="text-text-muted">কোন পেন্ডিং অনুরোধ নেই</p>
                        ) : (
                            pendingBookings.map(booking => (
                                <div key={booking.id} className="p-4 bg-bg-body rounded-lg border border-border">
                                    <div className="flex justify-between mb-2">
                                        <span className="font-bold">{booking.userName}</span>
                                        <Badge variant="warning">অপেক্ষমান</Badge>
                                    </div>
                                    <div className="text-sm text-text-muted mb-4">
                                        <p>হোস্টেল: {booking.hostelName}</p>
                                        <p>রুম: {booking.roomId}, সিট: {booking.bedId}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => updateBookingStatus(booking.id, 'approved')}
                                            className="py-1 px-3 text-sm bg-green-500 hover:bg-green-600"
                                        >
                                            অনুমোদন
                                        </Button>
                                        <Button
                                            onClick={() => updateBookingStatus(booking.id, 'rejected')}
                                            className="py-1 px-3 text-sm bg-red-500 hover:bg-red-600"
                                        >
                                            বাতিল
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </Card>

                {/* My Hostels */}
                <Card className="min-h-[400px]">
                    <h2 className="text-xl font-bold mb-4 border-b border-border pb-2">আমার হোস্টেলসমূহ</h2>
                    <div className="flex flex-col gap-4">
                        {myHostels.map(hostel => (
                            <div key={hostel.id} className="flex gap-4 items-center p-4 bg-bg-body rounded-lg border border-border">
                                <div className="h-16 w-16 bg-gray-200 rounded-md overflow-hidden relative">
                                    <img src={hostel.image} alt={hostel.name} className="object-cover w-full h-full" />
                                </div>
                                <div>
                                    <h3 className="font-bold">{hostel.name}</h3>
                                    <p className="text-sm text-text-muted">{hostel.location}</p>
                                    <p className="text-xs font-bold text-primary mt-1">৳{hostel.price}/মাস</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Add Hostel Modal (Inline for simplicity) */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
                    <Card className="w-full max-w-lg relative bg-white">
                        <button
                            onClick={() => setShowAddModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-black font-bold"
                        >
                            ✕
                        </button>
                        <h2 className="text-xl font-bold mb-6">নতুন হোস্টেল পোস্ট করুন</h2>
                        <form onSubmit={handleAddHostel} className="flex flex-col gap-4">
                            <input
                                className="p-3 border border-border rounded-lg"
                                placeholder="হোস্টেলের নাম"
                                required
                                value={newHostelName}
                                onChange={e => setNewHostelName(e.target.value)}
                            />
                            <input
                                className="p-3 border border-border rounded-lg"
                                placeholder="লোকেশন"
                                required
                                value={newHostelLoc}
                                onChange={e => setNewHostelLoc(e.target.value)}
                            />

                            {/* Map Picker */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">ম্যাপে লোকেশন পিন করুন (অপশনাল)</label>
                                <MapPicker onSelect={(lat, lng) => setNewHostelCoords({ lat, lng })} />
                                {newHostelCoords && (
                                    <p className="text-xs text-green-600">
                                        লোকেশন সিলেক্টেড: {newHostelCoords.lat.toFixed(4)}, {newHostelCoords.lng.toFixed(4)}
                                    </p>
                                )}
                            </div>
                            <input
                                type="number"
                                className="p-3 border border-border rounded-lg"
                                placeholder="ভাড়া (প্রতি মাস)"
                                required
                                value={newHostelPrice}
                                onChange={e => setNewHostelPrice(e.target.value)}
                            />
                            <Button type="submit" fullWidth className="mt-4">পোস্ট করুন</Button>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
}
