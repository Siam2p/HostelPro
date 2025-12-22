import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const MapPicker = dynamic(() => import('@/components/MapPicker'), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full bg-gray-100 animate-pulse rounded-lg mt-4">ম্যাপ লোড হচ্ছে...</div>
});

interface AddHostelModalProps {
    isOpen: boolean;
    onClose: () => void;
    editHostelId: number | null;
}

export default function AddHostelModal({ isOpen, onClose, editHostelId }: AddHostelModalProps) {
    const { currentUser } = useAuth();
    const { addHostel, updateHostel, hostels } = useData();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [contact, setContact] = useState('');
    const [location, setLocation] = useState('');
    const [coords, setCoords] = useState<{ lat: number, lng: number } | null>(null);
    const [mediaPreviews, setMediaPreviews] = useState<string[]>([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (editHostelId) {
            const hostel = hostels.find(h => h.id === editHostelId);
            if (hostel) {
                setName(hostel.name);
                setPrice(String(hostel.price));
                setContact(hostel.contact || '');
                setLocation(hostel.location);
                setCoords(hostel.coordinates || null);
                setMediaPreviews(hostel.gallery || (hostel.image ? [hostel.image] : []));
                setIsEditing(true);
            }
        } else {
            resetForm();
        }
    }, [editHostelId, hostels, isOpen]);

    const resetForm = () => {
        setName('');
        setPrice('');
        setContact('');
        setLocation('');
        setCoords(null);
        setMediaPreviews([]);
        setIsEditing(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setMediaPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeMedia = (index: number) => {
        setMediaPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentUser) return;

        if (isEditing && editHostelId) {
            const existingHostel = hostels.find(h => h.id === editHostelId);
            if (existingHostel) {
                updateHostel({
                    ...existingHostel,
                    name: name,
                    location: location,
                    contact: contact,
                    coordinates: coords || undefined,
                    price: Number(price),
                    gallery: mediaPreviews,
                    image: mediaPreviews.length > 0 ? mediaPreviews[0] : existingHostel.image
                });
            }
        } else {
            const newId = Date.now();
            addHostel({
                id: newId,
                name: name,
                location: location,
                contact: contact,
                coordinates: coords || undefined,
                price: Number(price),
                description: "নতুন হোস্টেল",
                rating: 0,
                totalRooms: 5,
                features: ["Wifi"],
                managerId: currentUser.id,
                rooms: [
                    { id: "A1", capacity: 4, occupied: [], price: Number(price) }
                ],
                gallery: mediaPreviews,
                image: mediaPreviews.length > 0 ? mediaPreviews[0] : "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            });
        }
        onClose();
        resetForm();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <Card className="w-full max-w-2xl relative bg-white max-h-[90vh] overflow-y-auto m-4">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
                >
                    ✕
                </button>
                <h2 className="text-2xl font-bold mb-1 text-gray-800 p-6 pb-0">{isEditing ? 'হোস্টেল তথ্য আপডেট' : 'নতুন হোস্টেল'}</h2>
                <p className="text-gray-500 px-6 text-sm mb-6">আপনার নতুন প্রপার্টির তথ্য দিন</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">হোস্টেলের নাম</label>
                            <input
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. রূপসী বাংলা ছাত্রাবাস"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">সিট ভাড়া (মাসিক)</label>
                            <input
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="e.g. 1000"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">লোকেশন</label>
                            <input
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="e.g. আম্বরখানা, সিলেট"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">যোগাযোগ নাম্বার</label>
                            <input
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                placeholder="e.g. 01712345678"
                                required
                            />
                        </div>
                    </div>



                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">ছবি/ভিডিও আপলোড (Media)</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                            <input
                                type="file"
                                multiple
                                accept="image/*,video/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleFileChange}
                            />
                            <div className="flex flex-col items-center gap-2 text-gray-500">
                                <span className="text-2xl">📷</span>
                                <span className="text-sm">ছবি বা ভিডিও নির্বাচন করতে ক্লিক করুন</span>
                            </div>
                        </div>
                        {mediaPreviews.length > 0 && (
                            <div className="grid grid-cols-3 gap-2 mt-4">
                                {mediaPreviews.map((src, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group shadow-sm bg-gray-100">
                                        {src.includes('video') || src.endsWith('.mp4') ? (
                                            <video src={src} className="w-full h-full object-cover" />
                                        ) : (
                                            <img src={src} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => removeMedia(idx)}
                                            className="absolute top-1 right-1 bg-red-500/80 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">ম্যাপ লোকেশন</label>
                        <div className="h-[300px] w-full rounded-xl overflow-hidden border border-gray-200">
                            <MapPicker
                                onLocationSelect={(lat, lng) => setCoords({ lat, lng })}
                                initialLocation={coords || undefined}
                            />
                        </div>
                        <p className="text-xs text-gray-500">* ম্যাপে ক্লিক করে সঠিক লোকেশন সেট করুন</p>
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            বাতিল
                        </Button>
                        <Button type="submit">
                            {isEditing ? 'আপডেট করুন' : 'হোস্টেল যোগ করুন'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
