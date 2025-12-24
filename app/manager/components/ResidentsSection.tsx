
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import AddResidentModal from './AddResidentModal';
import EditResidentModal from './EditResidentModal';

export default function ResidentsSection() {
    const { currentUser } = useAuth();
    const { hostels, bookings, deleteBooking, deleteUser, updateBooking } = useData();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editResidentId, setEditResidentId] = useState<number | null>(null);

    if (!currentUser) return null;

    const myHostels = hostels.filter(h => h.managerId === currentUser.id);
    const myBookings = bookings.filter(b => myHostels.some(h => h.name === b.hostelName));

    // Filter Residents (Approved Bookings) based on search
    const residents = myBookings.filter(b => b.status === 'approved' && (
        b.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.hostelName.toLowerCase().includes(searchTerm.toLowerCase())
    ));

    const handleDelete = (residentId: number, userId: number) => {
        if (confirm("Are you sure you want to remove this resident?")) {
            deleteBooking(residentId);

            // Optional: Ask to delete user account
            // Check if user has other bookings
            const userBookings = bookings.filter(b => b.userId === userId && b.id !== residentId);
            if (userBookings.length === 0) {
                if (confirm("Do you also want to delete the user account related to this resident?")) {
                    deleteUser(userId);
                }
            }
        }
    };

    const handleStatusUpdate = (resident: any, status: boolean) => {
        updateBooking({
            ...resident,
            isActive: status
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col justify-between items-start gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">বসবাসকারী শিক্ষার্থী (Residents)</h2>
                <div className="flex justify-between w-full gap-6">
                    <div className="relative w-full sm:w-80 flex items-center">
                        <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 bg-gray-200 rounded-r-lg p-2 cursor-pointer">🔍</span>
                        <input
                            type="text"
                            placeholder="শিক্ষার্থী খুঁজুন..."
                            className="w-full pr-10 pl-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button onClick={() => setIsAddModalOpen(true)} className="text-2xl font-semibold w-12 h-12 rounded-full">+</Button>
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
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">অবস্থান (Status)</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">পেমেন্ট তারিখ</th>
                                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">অ্যাকশন</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {residents.map((resident, idx) => (
                                <tr key={resident.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => router.push(`/manager/residents/${resident.id}`)}>
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
                                        <div className="text-xs text-gray-500">রুম {resident.roomId} • বেড {resident.bedId}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Badge variant={resident.monthlyFeeStatus === 'paid' ? 'success' : 'danger'}>
                                            {resident.monthlyFeeStatus === 'paid' ? 'পরিশোধিত' : 'বাকি আছে'}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <select
                                            value={resident.isActive !== false ? 'active' : 'inactive'}
                                            onChange={(e) => handleStatusUpdate(resident, e.target.value === 'active')}
                                            onClick={(e) => e.stopPropagation()}
                                            className={`text-xs font-bold px-2 py-1 rounded border-none focus:ring-0 cursor-pointer ${resident.isActive !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}
                                        >
                                            <option value="active">Valid (চলমান)</option>
                                            <option value="inactive">Non-Valid (বাতিল)</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {resident.lastPaymentDate || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                className="text-blue-600 hover:text-blue-900 px-2 py-1 hover:bg-blue-50 rounded"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    router.push(`/manager/residents/${resident.id}`);
                                                }}
                                            >
                                                বিস্তারিত
                                            </button>
                                            <button
                                                className="text-amber-600 hover:text-amber-900 px-2 py-1 hover:bg-amber-50 rounded"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setEditResidentId(resident.id);
                                                }}
                                            >
                                                এডিট
                                            </button>
                                            <button
                                                className="text-red-600 hover:text-red-900 px-2 py-1 hover:bg-red-50 rounded"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(resident.id, resident.userId);
                                                }}
                                            >
                                                মুছুন
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {residents.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                                        "{searchTerm}" এর জন্য কোনো শিক্ষার্থী পাওয়া যায়নি
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <AddResidentModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />

            <EditResidentModal
                isOpen={!!editResidentId}
                onClose={() => setEditResidentId(null)}
                residentId={editResidentId}
            />
        </div>
    );
}
