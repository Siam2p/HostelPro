import React, { useState, useEffect } from 'react';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/context/AuthContext';
import { Booking } from '@/lib/types';

interface EditResidentModalProps {
    isOpen: boolean;
    onClose: () => void;
    residentId: number | null;
}

export default function EditResidentModal({ isOpen, onClose, residentId }: EditResidentModalProps) {
    const { bookings, updateBooking, users, updateUser } = useData();
    const { currentUser } = useAuth();

    // Form State
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [guardianContact, setGuardianContact] = useState('');
    const [roomId, setRoomId] = useState('');
    const [bedId, setBedId] = useState('');
    const [paymentStatus, setPaymentStatus] = useState<Booking['monthlyFeeStatus']>('pending');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (residentId && isOpen) {
            const booking = bookings.find(b => b.id === residentId);
            if (booking) {
                // Initialize form with booking data
                setRoomId(booking.roomId);
                setBedId(booking.bedId);
                setPaymentStatus(booking.monthlyFeeStatus || 'pending');

                // Get User name (either from booking.userName or linked User)
                const linkedUser = users.find(u => u.id === booking.userId);
                setName(linkedUser ? linkedUser.name : booking.userName);
                setGuardianContact(linkedUser?.guardianContact || '');
                setPhone(linkedUser?.phone || '');
            }
        }
    }, [residentId, isOpen, bookings, users]);

    if (!isOpen || !residentId) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const booking = bookings.find(b => b.id === residentId);
            if (!booking) throw new Error("Booking not found");

            // Update Booking
            updateBooking({
                ...booking,
                roomId,
                bedId,
                monthlyFeeStatus: paymentStatus,
                userName: name // Update cached name in booking
            });

            // Update User Profile (if name or guardian contact changed)
            const linkedUser = users.find(u => u.id === booking.userId);
            if (linkedUser && (linkedUser.name !== name || linkedUser.guardianContact !== guardianContact || linkedUser.phone !== phone)) {
                updateUser({
                    ...linkedUser,
                    ...(linkedUser.isManaged ? { name: name } : {}),
                    guardianContact: guardianContact,
                    phone: phone
                });
            }

            onClose();
        } catch (error) {
            console.error("Failed to update resident", error);
            alert("Failed to update resident.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <Card className="w-full max-w-lg relative bg-white m-4">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold mb-1 text-gray-800 p-6 pb-0">বাসিন্দা তথ্য আপডেট</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-3 py-6">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">নাম</label>
                        <input
                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="নাম"
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">ফোন নাম্বার</label>
                        <input
                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="নাম্বার"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">গার্ডিয়ান কন্টাক্ট</label>
                        <input
                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={guardianContact}
                            onChange={(e) => setGuardianContact(e.target.value)}
                            placeholder="অভিভাবকের নাম্বার"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">রুম নং</label>
                            <input
                                className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={roomId}
                                onChange={(e) => setRoomId(e.target.value)}
                                placeholder="রুম"
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">বেড নং</label>
                            <input
                                className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={bedId}
                                onChange={(e) => setBedId(e.target.value)}
                                placeholder="বেড"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">পেমেন্ট স্ট্যাটাস</label>
                        <select
                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white font-noto-sans-bengali"
                            value={paymentStatus}
                            onChange={(e) => setPaymentStatus(e.target.value as Booking['monthlyFeeStatus'])}
                        >
                            <option value="pending">অপেক্ষমান (Pending)</option>
                            <option value="paid">পরিশোধিত (Paid)</option>
                            <option value="unpaid">অপরিশোধিত (Unpaid)</option>
                        </select>
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            বাতিল
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Processing...' : 'আপডেট করুন'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
