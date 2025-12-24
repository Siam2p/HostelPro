import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/context/AuthContext';
import { isValidBangladeshiPhone } from '@/lib/validation';

interface AddResidentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddResidentModal({ isOpen, onClose }: AddResidentModalProps) {
    const { hostels, users, addUser, addBooking } = useData();
    const { currentUser } = useAuth();

    // Form State
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [guardianContact, setGuardianContact] = useState('');
    const [hostelId, setHostelId] = useState<number | ''>('');
    const [roomId, setRoomId] = useState('');
    const [bedId, setBedId] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen || !currentUser) return null;

    const myHostels = hostels.filter(h => h.managerId === currentUser.id);
    const selectedHostel = hostels.find(h => h.id === Number(hostelId));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Phone Validation
            if (!isValidBangladeshiPhone(phone)) {
                throw new Error("শিক্ষার্থীর সঠিক বাংলাদেশী মোবাইল নাম্বার দিন");
            }
            if (guardianContact && !isValidBangladeshiPhone(guardianContact)) {
                throw new Error("গার্ডিয়ানের সঠিক বাংলাদেশী মোবাইল নাম্বার দিন");
            }

            // 1. Check if user exists
            let targetUserId;
            const existingUser = users.find(u => u.email === email);

            if (existingUser) {
                targetUserId = existingUser.id;
            } else {
                // Create new user
                const newUserId = Date.now(); // Simple ID generation
                targetUserId = newUserId;
                addUser({
                    id: newUserId,
                    name: name,
                    email: email,
                    phone: phone,
                    role: 'user',
                    guardianContact: guardianContact,
                    password: 'password', // In a real app, you'd handle this securely (e.g., invite link)
                    isManaged: true
                });
            }

            // 2. Create Booking
            if (!selectedHostel) throw new Error("Please select a hostel");

            addBooking({
                id: Date.now() + 1, // Ensure unique ID
                userId: targetUserId,
                hostelId: selectedHostel.id,
                roomId: roomId,
                bedId: bedId,
                date: new Date().toISOString().split('T')[0],
                status: 'approved',
                userName: existingUser ? existingUser.name : name, // Use existing name if user exists
                hostelName: selectedHostel.name,
                monthlyFeeStatus: 'pending',
                lastPaymentDate: undefined
            });

            onClose();
            // Reset form
            setName('');
            setPhone('');
            setEmail('');
            setGuardianContact('');
            setHostelId('');
            setRoomId('');
            setBedId('');
            setPrice('');
        } catch (error: any) {
            console.error("Failed to add resident", error);
            alert(error.message || "Failed to add resident. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <Card className="w-full max-w-lg relative bg-white m-4 max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold mb-1 text-gray-800 p-6 pb-0">নতুন বাসিন্দা যুক্ত করুন</h2>
                <p className="text-gray-500 px-6 text-sm mb-6">শির্ক্ষার্থীর তথ্য এবং সিট বরাদ্দ করুন</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 pb-6">
                    <div className="space-y-4">
                        {/* User Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">নাম</label>
                                <input
                                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="শিক্ষার্থীর নাম"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">ফোন</label>
                                <input
                                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="01XXXXXXXXX"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">ইমেইল</label>
                                <input
                                    type="email"
                                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="student@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">গার্ডিয়ান কন্টাক্ট</label>
                            <input
                                className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={guardianContact}
                                onChange={(e) => setGuardianContact(e.target.value)}
                                placeholder="01XXXXXXXXX (Father/Mother)"
                            />
                        </div>

                        {/* Booking Info */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">হোস্টেল নির্বাচন করুন</label>
                            <select
                                className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                value={hostelId}
                                onChange={(e) => setHostelId(Number(e.target.value))}
                                required
                            >
                                <option value="">হোস্টেল নির্বাচন করুন</option>
                                {myHostels.map(h => (
                                    <option key={h.id} value={h.id}>{h.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">রুম নং</label>
                                <input
                                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={roomId}
                                    onChange={(e) => setRoomId(e.target.value)}
                                    placeholder="A-101"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">বেড নং</label>
                                <input
                                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={bedId}
                                    onChange={(e) => setBedId(e.target.value)}
                                    placeholder="01"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">ভাড়া</label>
                                <input
                                    type="number"
                                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder={selectedHostel ? String(selectedHostel.price) : '0'}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            বাতিল
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Processing...' : 'যুক্ত করুন'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
