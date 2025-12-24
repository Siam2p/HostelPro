import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface HostelsSectionProps {
    selectedHostelId: number | null;
    setSelectedHostelId: (id: number | null) => void;
    setShowAddModal: (show: boolean) => void;
    openEditModal: () => void;
    handleDeleteHostel: () => void;
}

export default function HostelsSection({ selectedHostelId, setSelectedHostelId, setShowAddModal, openEditModal, handleDeleteHostel }: HostelsSectionProps) {
    const { currentUser } = useAuth();
    const { hostels, updateHostel } = useData();
    const [editingRoomId, setEditingRoomId] = useState<string | null>(null);

    if (!currentUser) return null;

    const myHostels = hostels.filter(h => h.managerId === currentUser.id);
    const selectedHostel = myHostels.find(h => h.id === selectedHostelId);

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
            rooms: [...hostel.rooms, newRoom],
            status: 'pending' // Updating rooms might also require re-approval depending on policy, user said "manager post or update hostel then status will be paniding"
        });
    };

    const toggleHostelStatus = (hostel: any) => {
        let newStatus: 'pending' | 'inactive';
        let actionText: string;

        if (hostel.status === 'active' || hostel.status === 'pending') {
            newStatus = 'inactive';
            actionText = 'নিষ্ক্রিয়';
        } else {
            // covers 'inactive' and 'rejected'
            newStatus = 'pending';
            actionText = 'সক্রিয়';
        }

        if (confirm(`আপনি কি নিশ্চিত যে আপনি এই হোস্টেলটি ${actionText} করতে চান?${newStatus === 'pending' ? ' (এটি অ্যাডমিন অনুমোদনের জন্য পাঠানো হবে)' : ''}`)) {
            updateHostel({
                ...hostel,
                status: newStatus
            });
        }
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
                                    <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                                        <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                                            {hostel.totalRooms} রুম
                                        </div>
                                        {hostel.status === 'pending' && <Badge variant="warning">Pending</Badge>}
                                        {hostel.status === 'inactive' && <Badge variant="danger">Inactive</Badge>}
                                        {hostel.status === 'rejected' && <Badge variant="danger">Rejected</Badge>}
                                        {hostel.status === 'active' && <Badge variant="success">Active</Badge>}
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
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-3xl font-bold text-gray-900">{selectedHostel.name}</h2>
                                        {selectedHostel.status === 'pending' && <Badge variant="warning">Pending Approval</Badge>}
                                        {selectedHostel.status === 'inactive' && <Badge variant="danger">Inactive</Badge>}
                                        {selectedHostel.status === 'rejected' && <Badge variant="danger">Rejected / Blocked</Badge>}
                                        {selectedHostel.status === 'active' && <Badge variant="success">Active</Badge>}
                                    </div>
                                    <p className="text-gray-500 flex items-center gap-2">📍 {selectedHostel.location}</p>
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="outline" onClick={() => toggleHostelStatus(selectedHostel)}>
                                        {(selectedHostel.status === 'inactive' || selectedHostel.status === 'rejected') ? 'সক্রিয় করুন' : 'নিষ্ক্রিয় করুন'}
                                    </Button>
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

                                <div className="overflow-x-auto rounded-xl border border-gray-200">
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
