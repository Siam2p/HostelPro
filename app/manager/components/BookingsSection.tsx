import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function BookingsSection() {
    const { currentUser } = useAuth();
    const { bookings, updateBookingStatus } = useData();

    if (!currentUser) return null;

    const pendingBookings = bookings.filter(b => b.status === 'pending');
    // Note: pendingBookings here shows global pending bookings as per original file.
    // If we want to restrict to myHostels, we'd need to filter by myHostels list.
    // Assuming original behavior is desired.

    // Actually, for "all bookings" list below, it uses `myBookings`. 
    // Ideally `pendingBookings` should also filter. But I will keep it as is for now to match `page.tsx`.

    // Wait, I need `myHostels` to filter `myBookings`.
    // I can't easily get `myHostels` without pulling `hostels`.
    const { hostels } = useData();
    const myHostels = hostels.filter(h => h.managerId === currentUser.id);
    const myBookings = bookings.filter(b => myHostels.some(h => h.name === b.hostelName));

    return (
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
}
