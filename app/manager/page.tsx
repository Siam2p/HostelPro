"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import dynamic from 'next/dynamic';

const MapPicker = dynamic(() => import('@/components/MapPicker'), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full bg-gray-100 animate-pulse rounded-lg mt-4">Loading Map...</div>
});

type DashboardView = 'overview' | 'hostels' | 'bookings' | 'residents';

export default function ManagerDashboard() {
    const { currentUser } = useAuth();
    const { hostels, bookings, notices, updateBookingStatus, addHostel, updateHostel, deleteHostel, addNotice, deleteNotice } = useData();
    const router = useRouter();
    const [activeView, setActiveView] = useState<DashboardView>('overview');

    // Modals & Forms State
    const [showAddModal, setShowAddModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedHostelId, setSelectedHostelId] = useState<number | null>(null);
    const [editingRoomId, setEditingRoomId] = useState<string | null>(null);

    // Resident Management State
    const [searchTerm, setSearchTerm] = useState('');


    // Form inputs state
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
    const myBookings = bookings.filter(b => myHostels.some(h => h.name === b.hostelName));

    // Filter Residents (Approved Bookings) based on search
    const residents = myBookings.filter(b => b.status === 'approved' && (
        b.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.hostelName.toLowerCase().includes(searchTerm.toLowerCase())
    ));

    // Stats
    const totalRevenue = myBookings.filter(b => b.status === 'approved').reduce((acc, curr) => {
        const hostel = hostels.find(h => h.name === curr.hostelName);
        return acc + (hostel ? hostel.price : 0);
    }, 0);
    const totalOccupants = myBookings.filter(b => b.status === 'approved').length;

    const handleAddHostel = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing && selectedHostelId) {
            const existingHostel = hostels.find(h => h.id === selectedHostelId);
            if (existingHostel) {
                updateHostel({
                    ...existingHostel,
                    name: newHostelName,
                    location: newHostelLoc,
                    coordinates: newHostelCoords || undefined,
                    price: Number(newHostelPrice),
                });
            }
        } else {
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
        }
        setShowAddModal(false);
        resetForm();
    };

    const handleDeleteHostel = () => {
        if (selectedHostelId && confirm('আপনি কি নিশ্চিত যে আপনি এই হোস্টেলটি ডিলিট করতে চান? এটি আর ফিরিয়ে আনা যাবে না।')) {
            deleteHostel(selectedHostelId);
            setSelectedHostelId(null);
        }
    };

    const openEditModal = () => {
        const hostel = hostels.find(h => h.id === selectedHostelId);
        if (hostel) {
            setNewHostelName(hostel.name);
            setNewHostelPrice(String(hostel.price));
            setNewHostelLoc(hostel.location);
            setNewHostelCoords(hostel.coordinates || null);
            setIsEditing(true);
            setShowAddModal(true);
        }
    }

    const resetForm = () => {
        setNewHostelName('');
        setNewHostelPrice('');
        setNewHostelLoc('');
        setNewHostelCoords(null);
        setIsEditing(false);
    }


    const handleAddRoom = () => {
        if (!selectedHostelId) return;
        const hostel = hostels.find(h => h.id === selectedHostelId);
        if (!hostel) return;

        // Simple prompt for now, can be a modal later
        const roomNumber = prompt("রুম নম্বর দিন (e.g., A1):");
        if (!roomNumber) return;
        const capacity = prompt("ক্যাপাসিটি দিন (e.g., 4):");
        if (!capacity) return;

        const newRoom = {
            id: roomNumber,
            capacity: Number(capacity),
            occupied: [],
            price: hostel.price // Default to hostel price
        };

        updateHostel({
            ...hostel,
            rooms: [...hostel.rooms, newRoom]
        });
    };

    const handleDeleteRoom = (roomId: string) => {
        if (!selectedHostelId) return;
        const hostel = hostels.find(h => h.id === selectedHostelId);
        if (!hostel) return;

        if (confirm(`Are you sure you want to delete Room ${roomId}?`)) {
            updateHostel({
                ...hostel,
                rooms: hostel.rooms.filter(r => r.id !== roomId)
            });
        }
    };

    const handleUpdateRoom = (roomId: string, newPrice: number, newCapacity: number, newOccupiedCount: number) => {
        if (!selectedHostelId) return;
        const hostel = hostels.find(h => h.id === selectedHostelId);
        if (!hostel) return;

        const updatedRooms = hostel.rooms.map(r => {
            if (r.id !== roomId) return r;

            let updatedOccupied = [...r.occupied];
            const currentCount = updatedOccupied.length;

            if (newOccupiedCount > currentCount) {
                // Add placeholders
                const countToAdd = newOccupiedCount - currentCount;
                for (let i = 0; i < countToAdd; i++) {
                    updatedOccupied.push(`manual_${Date.now()}_${i}`);
                }
            } else if (newOccupiedCount < currentCount) {
                // Remove from end
                updatedOccupied = updatedOccupied.slice(0, newOccupiedCount);
            }

            return {
                ...r,
                price: newPrice,
                capacity: newCapacity,
                occupied: updatedOccupied
            }
        });

        updateHostel({
            ...hostel,
            rooms: updatedRooms
        });
        setEditingRoomId(null);
    };

    // -- Sub-Components for Dashboard --

    const Sidebar = () => (
        <div className="w-full lg:w-64 bg-white lg:min-h-screen border-r border-gray-100 p-6 flex flex-col gap-2 shadow-sm shrink-0 z-10 sticky top-0 h-screen overflow-y-auto hidden lg:flex">
            <div className="mb-8 px-2">
                <h2 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Manager<span className="text-gray-900">Pro</span></h2>
                <p className="text-xs text-gray-400 font-medium">ড্যাশবোর্ড প্যানেল</p>
            </div>

            <button onClick={() => setActiveView('overview')} className={`text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-3 ${activeView === 'overview' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}>
                📊 ওভারভিউ
            </button>
            <button onClick={() => setActiveView('hostels')} className={`text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-3 ${activeView === 'hostels' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}>
                🏨 আমার হোস্টেল
            </button>
            <button onClick={() => setActiveView('bookings')} className={`text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-3 ${activeView === 'bookings' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}>
                📝 বুকিং শিট
            </button>
            <button onClick={() => setActiveView('residents')} className={`text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-3 ${activeView === 'residents' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}>
                👥 রেসিডেন্টস
            </button>

            <div className="mt-8 border-t border-gray-100 pt-4">
                <p className="px-4 text-xs font-bold text-gray-400 mb-2">OTHERS</p>
                <button onClick={() => router.push('/contact')} className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:text-blue-600 transition-colors">Contact Us</button>
                <button onClick={() => router.push('/about')} className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:text-blue-600 transition-colors">About Us</button>
            </div>
        </div>
    );

    // Mobile Nav Drawer could be added here

    const ResidentsSection = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800">বসবাসকারী শিক্ষার্থী (Residents)</h2>
                <div className="relative w-full md:w-64">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                    <input
                        type="text"
                        placeholder="Search residents..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">নাম</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">হোস্টেল ও রুম</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">মাসিক ফি</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">পেমেন্ট তারিখ</th>
                                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">অ্যাকশন</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {residents.map((resident, idx) => (
                                <tr key={resident.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => router.push(`/manager/residents/${resident.id}`)}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">
                                                {resident.userName.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{resident.userName}</div>
                                                <div className="text-xs text-gray-500">ID: #{String(resident.id).slice(-4)}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{resident.hostelName}</div>
                                        <div className="text-xs text-gray-500">Room {resident.roomId} • Bed {resident.bedId}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Badge variant={resident.monthlyFeeStatus === 'paid' ? 'success' : 'danger'}>
                                            {resident.monthlyFeeStatus ? resident.monthlyFeeStatus.toUpperCase() : 'PENDING'}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {resident.lastPaymentDate || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900" onClick={(e) => {
                                            e.stopPropagation();
                                            router.push(`/manager/residents/${resident.id}`);
                                        }}>Details</button>
                                    </td>
                                </tr>
                            ))}
                            {residents.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                                        No residents found matching "{searchTerm}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const OverviewSection = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-bold text-gray-800">স্বাগতম, {currentUser.name}! 👋</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-linear-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-200 mb-8 relative overflow-hidden">
                    <div className="text-blue-100 text-sm font-medium mb-1">মোট আয় (এই মাস)</div>
                    <div className="text-3xl font-bold">৳{totalRevenue.toLocaleString()}</div>
                    <div className="mt-4 text-xs bg-white/20 inline-block px-2 py-1 rounded-lg">Last 30 days</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transform transition hover:scale-105">
                    <div className="text-gray-500 text-sm font-medium mb-1">মোট হোস্টেল</div>
                    <div className="text-3xl font-bold text-gray-800">{myHostels.length}</div>
                    <div className="mt-4 text-xs text-green-600 bg-green-50 inline-block px-2 py-1 rounded-lg">All Active</div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transform transition hover:scale-105">
                    <div className="text-gray-500 text-sm font-medium mb-1">বর্তমান বাসিন্দা</div>
                    <div className="text-3xl font-bold text-gray-800">{totalOccupants}</div>
                    <div className="mt-4 text-xs text-purple-600 bg-purple-50 inline-block px-2 py-1 rounded-lg">+2 New this week</div>
                </div>
            </div>

            {/* Analytics Graph Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 p-6 border-none shadow-lg shadow-gray-100/50">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">পেমেন্ট স্ট্যাটাস (মাসিক)</h2>
                        <Badge variant="default" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-none">Current Month</Badge>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-8 justify-around">
                        {/* Circular Graph Implementation */}
                        <div className="relative h-48 w-48 shrink-0">
                            <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                                {/* Background Circle */}
                                <path
                                    className="text-gray-100"
                                    d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3.8"
                                />
                                {/* Paid Segment (Green) */}
                                <path
                                    className="text-emerald-500 drop-shadow-md"
                                    strokeDasharray={`${(totalOccupants > 0 ? ((totalOccupants - (myBookings.filter(b => b.monthlyFeeStatus === 'unpaid').length)) / totalOccupants) * 100 : 0)}, 100`}
                                    d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3.8"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold text-gray-800">{totalOccupants}</span>
                                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total Residents</span>
                            </div>
                        </div>

                        {/* Legend & Details */}
                        <div className="flex-grow space-y-6 w-full">
                            {(() => {
                                const unpaidResidents = myBookings.filter(b => b.monthlyFeeStatus === 'unpaid');
                                const unpaidCount = unpaidResidents.length;
                                const paidCount = totalOccupants - unpaidCount;

                                const estimatedUnpaidAmount = unpaidResidents.reduce((acc, curr) => {
                                    const hostel = hostels.find(h => h.id === curr.hostelId);
                                    if (!hostel) return acc;
                                    const room = hostel.rooms.find(r => r.id === curr.roomId);
                                    return acc + (room ? room.price : hostel.price);
                                }, 0);

                                return (
                                    <>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                                    <span className="text-xs font-bold text-emerald-800 uppercase">পরিশোধিত (Paid)</span>
                                                </div>
                                                <div className="text-2xl font-bold text-emerald-700">{paidCount} জন</div>
                                                <div className="text-xs text-emerald-600 mt-1">
                                                    {totalOccupants > 0 ? Math.round((paidCount / totalOccupants) * 100) : 0}% Complete
                                                </div>
                                            </div>
                                            <div className="p-4 rounded-2xl bg-red-50 border border-red-100">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                                                    <span className="text-xs font-bold text-red-800 uppercase">বাকি (Unpaid)</span>
                                                </div>
                                                <div className="text-2xl font-bold text-red-700">{unpaidCount} জন</div>
                                                <div className="text-xs text-red-600 mt-1">Action Needed</div>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-gray-900 rounded-xl text-white flex justify-between items-center shadow-lg shadow-gray-200">
                                            <div>
                                                <p className="text-gray-400 text-xs mb-1">আনুমানিক বকেয়া ফি</p>
                                                <p className="font-medium text-sm text-gray-300">এখনো সংগ্রহ করা বাকি</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="block text-2xl font-bold text-white">৳{estimatedUnpaidAmount.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                </Card>

                {/* User Demographics or Quick Links - Placeholder for balance */}
                <Card className="p-6 border-none shadow-lg shadow-gray-100/50 bg-white flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-gray-700 mb-4">নোটিশ বোর্ড</h3>
                        <div className="space-y-3">
                            <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                                <p className="text-xs text-gray-500 mb-1">আজ</p>
                                <p className="text-sm font-medium text-gray-800">বিদ্যুৎ বিল পরিশোধের শেষ তারিখ ২০ তারিখ।</p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                                <p className="text-xs text-gray-500 mb-1">গতকাল</p>
                                <p className="text-sm font-medium text-gray-800">নতুন ওয়াইফাই রাউটার সেটআপ সম্পন্ন হয়েছে।</p>
                            </div>
                        </div>
                    </div>
                    <Button variant="outline" className="w-full mt-6">নোটিশ যোগ করুন</Button>
                </Card>
            </div>

            {/* Quick Actions / Recent */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6 border-none shadow-lg shadow-gray-100/50">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">সাম্প্রতিক বুকিং অনুরোধ</h2>
                        <Button variant="outline" className="py-1 px-3 text-sm" onClick={() => setActiveView('bookings')}>সব দেখুন</Button>
                    </div>
                    <div className="space-y-4">
                        {pendingBookings.length === 0 ? (
                            <div className="text-center py-8 text-gray-400">কোন নতুন অনুরোধ নেই</div>
                        ) : (
                            pendingBookings.slice(0, 3).map(booking => (
                                <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                    <div>
                                        <div className="font-bold text-gray-800">{booking.userName}</div>
                                        <div className="text-xs text-gray-500">{booking.hostelName} • {booking.roomId}</div>
                                    </div>
                                    <Badge variant="warning">Pending</Badge>
                                </div>
                            ))
                        )}
                    </div>
                </Card>

                <Card className="p-6 border-none shadow-lg shadow-gray-100/50 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                    <h2 className="text-xl font-bold mb-4">কুইক অ্যাকশন</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setShowAddModal(true)} className="p-4 bg-white/10 hover:bg-white/20 rounded-xl flex flex-col items-center justify-center gap-2 transition-all">
                            <span className="text-2xl">🏨</span>
                            <span className="text-sm font-medium">নতুন হোস্টেল</span>
                        </button>
                        <button onClick={() => setActiveView('hostels')} className="p-4 bg-white/10 hover:bg-white/20 rounded-xl flex flex-col items-center justify-center gap-2 transition-all">
                            <span className="text-2xl">⚙️</span>
                            <span className="text-sm font-medium">রুম ম্যানেজ</span>
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );

    const HostelsSection = () => {
        const selectedHostel = myHostels.find(h => h.id === selectedHostelId);

        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {!selectedHostelId ? (
                    <>
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-800">আমার হোস্টেলসমূহ</h2>
                            <Button onClick={() => setShowAddModal(true)} className="gap-2 shadow-lg shadow-blue-200">
                                + নতুন হোস্টেল
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {myHostels.map(hostel => (
                                <div key={hostel.id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer" onClick={() => setSelectedHostelId(hostel.id)}>
                                    <div className="h-48 overflow-hidden relative">
                                        <img src={hostel.image} alt={hostel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                                            {hostel.totalRooms} রুম
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-bold text-lg text-gray-800 mb-1">{hostel.name}</h3>
                                        <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">📍 {hostel.location}</p>
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                            <span className="font-bold text-primary">৳{hostel.price}/মাস</span>
                                            <span className="text-xs text-blue-600 font-medium group-hover:underline">ম্যানেজ করুন →</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    // Detailed Hostel View
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 min-h-[600px]">
                        <button onClick={() => setSelectedHostelId(null)} className="text-sm text-gray-500 hover:text-gray-800 mb-6 flex items-center gap-1">
                            ← ফিরে যান
                        </button>

                        {selectedHostel && (
                            <div className="space-y-8">
                                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 pb-8 border-b border-gray-100">
                                    <div>
                                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedHostel.name}</h2>
                                        <p className="text-gray-500 flex items-center gap-2">📍 {selectedHostel.location}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <Button variant="outline" onClick={openEditModal}>তথ্য এডিট করুন</Button>
                                        <Button className="bg-red-50 text-red-600 hover:bg-red-100 border-red-100" onClick={handleDeleteHostel}>হোস্টেল ডিলিট</Button>
                                    </div>
                                </div>

                                {/* Rooms Manager */}
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-xl font-bold text-gray-800">রুম ম্যানেজমেন্ট</h3>
                                        <Button variant="outline" className="py-1 px-3 text-sm" onClick={handleAddRoom}>+ রুম যোগ করুন</Button>
                                    </div>

                                    <div className="overflow-hidden rounded-xl border border-gray-200">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">রুম নম্বর</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ক্যাপাসিটি</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">সিট ভাড়া</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">স্ট্যাটাস</th>
                                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">অ্যাকশন</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {selectedHostel.rooms.map(room => (
                                                    <tr key={room.id} className="hover:bg-gray-50 transition-colors">
                                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{room.id}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                            {editingRoomId === room.id ? (
                                                                <div className="flex items-center gap-2">
                                                                    <input
                                                                        id={`occupied-${room.id}`}
                                                                        defaultValue={room.occupied.length}
                                                                        className="w-12 p-1 border rounded text-center"
                                                                        type="number"
                                                                        min="0"
                                                                        max={room.capacity}
                                                                    />
                                                                    <span>/</span>
                                                                    <input
                                                                        id={`capacity-${room.id}`}
                                                                        defaultValue={room.capacity}
                                                                        className="w-12 p-1 border rounded text-center"
                                                                        type="number"
                                                                        min="1"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                `${room.occupied.length} / ${room.capacity} সিট পূর্ণ`
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                            {editingRoomId === room.id ? (
                                                                <input
                                                                    id={`price-${room.id}`}
                                                                    defaultValue={room.price}
                                                                    className="w-20 p-1 border rounded"
                                                                    type="number"
                                                                />
                                                            ) : `৳${room.price}`}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {room.occupied.length >= room.capacity ? (
                                                                <Badge variant="danger">Full</Badge>
                                                            ) : (
                                                                <Badge variant="success">Available</Badge>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            {editingRoomId === room.id ? (
                                                                <button
                                                                    onClick={() => {
                                                                        const priceInput = document.getElementById(`price-${room.id}`) as HTMLInputElement;
                                                                        const capInput = document.getElementById(`capacity-${room.id}`) as HTMLInputElement;
                                                                        const occInput = document.getElementById(`occupied-${room.id}`) as HTMLInputElement;

                                                                        if (priceInput && capInput && occInput) {
                                                                            handleUpdateRoom(
                                                                                room.id,
                                                                                Number(priceInput.value),
                                                                                Number(capInput.value),
                                                                                Number(occInput.value)
                                                                            );
                                                                        }
                                                                    }}
                                                                    className="text-green-600 hover:text-green-900 mr-4 font-bold"
                                                                >
                                                                    Save
                                                                </button>
                                                            ) : (
                                                                <button onClick={() => setEditingRoomId(room.id)} className="text-blue-600 hover:text-blue-900 mr-4">এডিট</button>
                                                            )}
                                                            <button onClick={() => handleDeleteRoom(room.id)} className="text-red-600 hover:text-red-900">ডিলিট</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }

    const BookingsSection = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-gray-800">বুকিং ম্যানেজমেন্ট</h2>

            {/* Tabs like switcher for sub-views could go here, for now just simple sections */}

            {/* Pending Requests */}
            <Card className="border-l-4 border-l-yellow-400 overflow-hidden">
                <div className="p-6 bg-yellow-50 border-b border-yellow-100">
                    <h3 className="font-bold text-yellow-800 flex items-center gap-2">⚠️ পেন্ডিং অনুরোধ ({pendingBookings.length})</h3>
                </div>
                <div className="divide-y divide-gray-100">
                    {pendingBookings.map(booking => (
                        <div key={booking.id} className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 hover:bg-gray-50">
                            <div>
                                <div className="font-bold text-lg">{booking.userName}</div>
                                <div className="text-sm text-gray-500">{booking.hostelName} এ সীটের জন্য আবেদন করেছেন</div>
                                <div className="mt-1 flex gap-2">
                                    <Badge variant="default">{booking.roomId}</Badge>
                                    <Badge variant="default">Seat {booking.bedId}</Badge>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button onClick={() => updateBookingStatus(booking.id, 'approved')} className="bg-green-600 hover:bg-green-700 text-white shadow-green-200">
                                    অনুমোদন করুন
                                </Button>
                                <Button onClick={() => updateBookingStatus(booking.id, 'rejected')} variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                                    বাতিল
                                </Button>
                            </div>
                        </div>
                    ))}
                    {pendingBookings.length === 0 && <div className="p-8 text-center text-gray-400">কোন পেন্ডিং অনুরোধ নেই</div>}
                </div>
            </Card>

            {/* Full Booking Sheet */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-gray-800">📋 বুকিং এন্ট্রি শিট (সকল বুকিং)</h3>
                    <Button variant="outline" className="py-1 px-3 text-sm">Excel ডাউনলোড</Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">আইডি</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">ব্যবহারকারী</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">হোস্টেল</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">রুম বিবরণ</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">স্ট্যাটাস</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">তারিখ</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {myBookings.map(booking => (
                                <tr key={booking.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">#{String(booking.id).slice(-6)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                        {booking.userName}
                                        <div className="text-xs text-gray-400 font-normal">017XXXXXXXX</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.hostelName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Room {booking.roomId}, Bed {booking.bedId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Badge variant={booking.status === 'approved' ? 'success' : booking.status === 'rejected' ? 'danger' : 'warning'}>
                                            {booking.status.toUpperCase()}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date().toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row font-sans">
            <Sidebar />

            {/* Mobile Bottom Navigation */}
            <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 px-6 py-3 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <button
                    onClick={() => setActiveView('overview')}
                    className={`flex flex-col items-center gap-1 ${activeView === 'overview' ? 'text-blue-600' : 'text-gray-400'}`}
                >
                    <span className="text-xl">📊</span>
                    <span className="text-[10px] font-medium">Overview</span>
                </button>
                <button
                    onClick={() => setActiveView('hostels')}
                    className={`flex flex-col items-center gap-1 ${activeView === 'hostels' ? 'text-blue-600' : 'text-gray-400'}`}
                >
                    <span className="text-xl">🏨</span>
                    <span className="text-[10px] font-medium">Hostels</span>
                </button>
                <div className="relative -top-6">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="h-14 w-14 bg-blue-600 rounded-full text-white shadow-lg shadow-blue-300 flex items-center justify-center text-2xl hover:bg-blue-700 transition-colors"
                    >
                        +
                    </button>
                </div>
                <button
                    onClick={() => setActiveView('bookings')}
                    className={`flex flex-col items-center gap-1 ${activeView === 'bookings' ? 'text-blue-600' : 'text-gray-400'}`}
                >
                    <span className="text-xl">📝</span>
                    <span className="text-[10px] font-medium">Bookings</span>
                </button>
                <button
                    onClick={() => setActiveView('residents')}
                    className={`flex flex-col items-center gap-1 ${activeView === 'residents' ? 'text-blue-600' : 'text-gray-400'}`}
                >
                    <span className="text-xl">👥</span>
                    <span className="text-[10px] font-medium">Residents</span>
                </button>
            </div>

            <main className="flex-1 p-4 lg:p-10 overflow-y-auto h-screen pb-24 lg:pb-10">
                {activeView === 'overview' && <OverviewSection />}
                {activeView === 'hostels' && <HostelsSection />}
                {activeView === 'bookings' && <BookingsSection />}
                {activeView === 'residents' && <ResidentsSection />}
            </main>

            {/* Add Hostel Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <Card className="w-full max-w-2xl relative bg-white max-h-[90vh] overflow-y-auto m-4">
                        <button
                            onClick={() => setShowAddModal(false)}
                            className="absolute top-4 right-4 h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
                        >
                            ✕
                        </button>
                        <h2 className="text-2xl font-bold mb-1 text-gray-800 p-6 pb-0">{isEditing ? 'হোস্টেল তথ্য আপডেট' : 'নতুন হোস্টেল'}</h2>
                        <p className="text-gray-500 px-6 text-sm mb-6">আপনার নতুন প্রপার্টির তথ্য দিন</p>

                        <form onSubmit={handleAddHostel} className="flex flex-col gap-5 px-6 pb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">হোস্টেলের নাম</label>
                                    <input
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        placeholder="Udoy Tower..."
                                        required
                                        value={newHostelName}
                                        onChange={e => setNewHostelName(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">সিট ভাড়া (মাসিক)</label>
                                    <input
                                        type="number"
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        placeholder="5000"
                                        required
                                        value={newHostelPrice}
                                        onChange={e => setNewHostelPrice(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">ঠিকানা / লোকেশন</label>
                                <input
                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="Dhaka, Bangladesh..."
                                    required
                                    value={newHostelLoc}
                                    onChange={e => setNewHostelLoc(e.target.value)}
                                />
                            </div>

                            {/* Map Picker */}
                            <div className="space-y-2 border border-gray-100 rounded-xl p-4 bg-gray-50">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-sm font-medium text-gray-700">📍 ম্যাপে লোকেশন পিন করুন</label>
                                    {newHostelCoords && <Badge variant="success">পিন করা হয়েছে</Badge>}
                                </div>
                                <div className="h-64 rounded-xl overflow-hidden border border-gray-300">
                                    <MapPicker onLocationSelect={(lat, lng) => setNewHostelCoords({ lat, lng })} />
                                </div>
                                <p className="text-xs text-gray-400 text-center mt-2">সঠিক লোকেশন পেতে ম্যাপে ক্লিক করুন</p>
                            </div>

                            <div className="pt-4 sticky bottom-0 bg-white border-t border-gray-100">
                                <Button type="submit" fullWidth className="py-3 text-lg shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                                    {isEditing ? '✨ তথ্য আপডেট করুন' : '✨ হোস্টেল পোস্ট করুন'}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
}
