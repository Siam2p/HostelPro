"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import JsonLd from '@/components/JsonLd';

// Metadata generation would typically be server-side, but this is a client component.
// For a real app, we'd separate the page into a server component layout or similar.
// Since this is a prototype using Context, we'll focus on the client-side UI and JSON-LD.

export default function HostelDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { hostels, addBooking } = useData();
    const { currentUser } = useAuth();

    const idString = Array.isArray(id) ? id[0] : id;
    const hostelId = idString ? parseInt(idString) : -1;
    const hostel = hostels.find(h => h.id === hostelId);

    const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
    const [selectedBedId, setSelectedBedId] = useState<string | null>(null);

    // Scroll to summary when bed is selected
    useEffect(() => {
        if (selectedBedId) {
            document.getElementById('bookingCard')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [selectedBedId]);

    if (!hostel) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 bg-primary/20 rounded-full mb-4"></div>
                    <p className="text-text-muted">লোডিং...</p>
                </div>
            </div>
        );
    }

    const handleBedSelect = (roomId: string, bedNumber: number, isOccupied: boolean) => {
        if (isOccupied) return;
        const bedId = `S${bedNumber}`;
        if (selectedBedId === bedId && selectedRoomId === roomId) {
            setSelectedRoomId(null);
            setSelectedBedId(null);
        } else {
            setSelectedRoomId(roomId);
            setSelectedBedId(bedId);
        }
    };

    const handleBooking = () => {
        if (!currentUser) {
            alert("বুকিং করার জন্য অনুগ্রহ করে লগইন করুন");
            router.push('/login');
            return;
        }

        if (selectedRoomId && selectedBedId) {
            addBooking({
                id: new Date().getTime(),
                userId: currentUser.id,
                hostelId: hostel.id,
                roomId: selectedRoomId,
                bedId: selectedBedId,
                date: new Date().toISOString().split('T')[0],
                status: 'pending',
                userName: currentUser.name,
                hostelName: hostel.name
            });
            alert(`আপনার বুকিং সফল হয়েছে! \nরুম: ${selectedRoomId}, সিট: ${selectedBedId}`);
            router.push('/');
        }
    };

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Hostel',
        name: hostel.name,
        description: hostel.description,
        image: hostel.image,
        address: {
            '@type': 'PostalAddress',
            streetAddress: hostel.location,
            addressCountry: 'BD'
        },
        priceRange: `BDT ${hostel.price}`,
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: hostel.rating,
            reviewCount: 50 // Mock
        }
    };

    return (
        <div className="pb-20 bg-gray-50/50 min-h-screen">
            <JsonLd data={structuredData} />

            {/* Immersive Hero Section */}
            <div className="relative h-[60vh] min-h-[500px] w-full">
                <Image
                    src={hostel.image}
                    alt={hostel.name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end">
                    <div className="container mx-auto px-6 pb-12">
                        <Badge variant="default" className="mb-4 bg-primary/90 hover:bg-primary border-none text-white px-4 py-1 text-sm font-medium backdrop-blur-sm">
                            ভেরিফাইড হোস্টেল
                        </Badge>
                        <h1 className="text-4xl md:text-6xl text-white font-extrabold mb-4 tracking-tight drop-shadow-sm">
                            {hostel.name}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-white/90 text-lg">
                            <span className="flex items-center gap-2">
                                <span className="text-red-400">📍</span> {hostel.location}
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="text-yellow-400">★</span> {hostel.rating} (৫০+ রিভিউ)
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 -mt-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content */}
                    <div className="flex-grow space-y-12">
                        {/* Features */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <span>✨</span> সুবিধাসমূহ
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {hostel.features.map(f => (
                                    <div key={f} className="px-5 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-gray-700 font-medium hover:bg-gray-100 transition-colors cursor-default">
                                        {f}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <span>📝</span> বর্ণনা
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {hostel.description}
                                <br /><br />
                                আমাদের হোস্টেলে আপনি পাবেন সম্পূর্ণ ঘরোয়া পরিবেশ। ছাত্র এবং চাকরিজীদের জন্য আদর্শ। ২৪ ঘণ্টা নিরাপত্তা, ওয়াইফাই এবং সুস্বাদু খাবারের ব্যবস্থা রয়েছে।
                            </p>
                        </div>

                        {/* Room Selection */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <span>🛏️</span> রুম নির্বাচন করুন
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {hostel.rooms.map(room => (
                                    <div key={room.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ring-1 ring-gray-100 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                                            <div>
                                                <h3 className="font-bold text-xl text-gray-800">রুম {room.id}</h3>
                                                <p className="text-sm text-gray-500 mt-1">{room.capacity} জন শেয়ার</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="block text-primary font-bold text-xl">৳{room.price}</span>
                                                <span className="text-xs text-gray-400">/মাস</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-4 gap-4">
                                            {Array.from({ length: room.capacity }).map((_, i) => {
                                                const bedNum = i + 1;
                                                const currentBedId = `S${bedNum}`;
                                                // Assuming logic matches previous implementation for occupancy
                                                const isOccupied = room.occupied.includes(currentBedId);
                                                const isSelected = selectedRoomId === room.id && selectedBedId === currentBedId;

                                                return (
                                                    <button
                                                        key={bedNum}
                                                        onClick={() => handleBedSelect(room.id, bedNum, isOccupied)}
                                                        disabled={isOccupied}
                                                        className={`
                                                            aspect-square rounded-xl flex flex-col items-center justify-center font-bold text-sm transition-all duration-200 relative overflow-hidden group
                                                            ${isOccupied
                                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                                                                : isSelected
                                                                    ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105 ring-2 ring-primary ring-offset-2'
                                                                    : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-primary hover:text-primary hover:bg-blue-50/50'
                                                            }
                                                        `}
                                                    >
                                                        <span className="text-xs mb-1 opacity-70">সিট</span>
                                                        <span className="text-lg">{bedNum}</span>
                                                        {isOccupied && (
                                                            <div className="absolute inset-0 bg-gray-200/50 backdrop-blur-[1px] flex items-center justify-center">
                                                                <span className="text-xs rotate-45 font-bold text-gray-500">BOOKED</span>
                                                            </div>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Booking Sidebar - Sticky */}
                    <div className="lg:w-[400px] flex-shrink-0">
                        <div className="sticky top-24">
                            <Card id="bookingCard" className="bg-white border-gray-200 shadow-xl shadow-gray-200/50 overflow-hidden">
                                <div className="p-6 bg-slate-900 text-white">
                                    <p className="text-gray-400 text-sm mb-1">ভাড়া শুরু</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-bold">৳{hostel.price}</span>
                                        <span className="text-gray-400">/মাস</span>
                                    </div>
                                </div>

                                <div className="p-6 space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                                            <span className="text-gray-600">চেক-ইন</span>
                                            <span className="font-semibold">{new Date().toLocaleDateString('bn-BD')}</span>
                                        </div>

                                        {selectedBedId ? (
                                            <div className="p-4 border border-primary/20 bg-primary/5 rounded-xl space-y-3 animate-in fade-in slide-in-from-top-4">
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-gray-600">নির্বাচিত রুম</span>
                                                    <span className="font-bold text-gray-900 bg-white px-2 py-1 rounded border border-gray-200">{selectedRoomId}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-gray-600">সিট নম্বর</span>
                                                    <span className="font-bold text-gray-900 bg-white px-2 py-1 rounded border border-gray-200">{selectedBedId}</span>
                                                </div>
                                                <div className="pt-3 border-t border-primary/10 flex justify-between items-center">
                                                    <span className="text-primary font-bold">মোট দেয় (মাসিক)</span>
                                                    <span className="text-xl font-bold text-primary">
                                                        ৳{hostel.rooms.find(r => r.id === selectedRoomId)?.price}
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="p-8 text-center border-2 border-dashed border-gray-200 rounded-xl text-gray-400 bg-gray-50/50">
                                                <span className="text-2xl block mb-2">👆</span>
                                                বাম পাশ থেকে রুম এবং সিট নির্বাচন করুন
                                            </div>
                                        )}
                                    </div>

                                    <Button
                                        onClick={handleBooking}
                                        variant={selectedBedId ? "primary" : "secondary"} // Assuming secondary variant is distinct/disabled-look or just use disabled prop
                                        fullWidth
                                        className={`py-4 text-lg font-bold shadow-lg transition-all ${selectedBedId ? 'shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5' : 'opacity-70'}`}
                                        disabled={!selectedBedId}
                                    >
                                        {selectedBedId ? 'বুকিং নিশ্চিত করুন' : 'সিট সিলেক্ট করুন'}
                                    </Button>

                                    <p className="text-xs text-center text-gray-400">
                                        বুকিং কনফার্ম করার পর আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করবেন
                                    </p>
                                </div>
                            </Card>

                            <div className="mt-6 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                                <h3 className="font-bold text-blue-900 mb-2">সাহায্য প্রয়োজন?</h3>
                                <p className="text-blue-700 text-sm mb-4">যেকোনো তথ্যের জন্য আমাদের কল করুন</p>
                                <a href="tel:01700000000" className="flex items-center justify-center gap-2 w-full py-3 bg-white text-blue-600 font-bold rounded-xl border border-blue-200 hover:bg-blue-600 hover:text-white transition-colors">
                                    📞 ০১৭০০-০০০০০০
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
