"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import JsonLd from '@/components/JsonLd';
import BookingApplicationModal from '@/components/BookingApplicationModal';
import { ApplicationDetails } from '@/lib/types';

export default function HostelDetailsClient({ initialHostelId }: { initialHostelId: number }) {
    const router = useRouter();
    const { hostels, addBooking } = useData();
    const { currentUser } = useAuth();

    // Use hostel from context to ensure real-time updates (e.g. occupancy), fallback to initial if needed
    // But since context has "all" hostels, we just find it.
    const hostel = hostels.find(h => h.id === initialHostelId);

    const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
    const [selectedBedId, setSelectedBedId] = useState<string | null>(null);
    const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

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
            setIsApplicationModalOpen(true);
        }
    };

    const handleApplicationSubmit = (applicationData: ApplicationDetails) => {
        if (!currentUser || !hostel || !selectedRoomId || !selectedBedId) return;

        addBooking({
            id: new Date().getTime(),
            userId: currentUser.id,
            hostelId: hostel.id,
            roomId: selectedRoomId,
            bedId: selectedBedId,
            date: new Date().toISOString().split('T')[0],
            status: 'pending',
            userName: currentUser.name,
            hostelName: hostel.name,
            applicationDetails: applicationData
        });

        setIsApplicationModalOpen(false);
        alert(`আপনার আবেদন জমা দেওয়া হয়েছে! \nরুম: ${selectedRoomId}, সিট: ${selectedBedId}`);
        router.push('/');
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
        <div className="pb-10 bg-gray-50/50 min-h-screen">
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
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent flex items-end">
                    <div className="container mx-auto px-3 pb-12">
                        <Badge variant="default" className="mb-4 bg-primary/90 hover:bg-primary border-none text-white px-4 py-1 text-sm font-medium backdrop-blur-sm">
                            ভেরিফাইড হোস্টেল
                        </Badge>
                        <h1 className="text-4xl md:text-6xl text-white font-extrabold mb-4 tracking-tight drop-shadow-sm">
                            {hostel.name}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-white/90 text-lg">
                            <div className="flex items-center gap-2">
                                <span className="text-red-400">📍</span>
                                <span>{hostel.location}</span>
                                <a
                                    href={hostel.coordinates
                                        ? `https://www.google.com/maps/search/?api=1&query=${hostel.coordinates.lat},${hostel.coordinates.lng}`
                                        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hostel.location)}`
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-2 inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs px-2 py-1 rounded-md transition-all backdrop-blur-sm"
                                >
                                    <span>ম্যাপ দেখুন</span>
                                    <span className="text-[10px]">↗</span>
                                </a>
                            </div>
                            <span className="flex items-center gap-2">
                                <span className="text-yellow-400">★</span> {hostel.rating} (৫০+ রিভিউ)
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-3 -mt-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content */}
                    <div className="grow space-y-12">
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
                            <div
                                className="text-lg text-gray-600 leading-relaxed prose prose-slate max-w-none"
                                dangerouslySetInnerHTML={{ __html: hostel.description || 'দুঃখিত, কোনো বর্ণনা পাওয়া যায়নি।' }}
                            />
                        </div>

                        {/* Media Gallery */}
                        {hostel.gallery && hostel.gallery.length > 0 && (
                            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-900">
                                    <span>🖼️</span> ফটো গ্যালারি
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {hostel.gallery.map((img, idx) => (
                                        <div key={idx} className="relative aspect-4/3 rounded-xl overflow-hidden group cursor-pointer border border-gray-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                                            <Image
                                                src={img}
                                                alt={`${hostel.name} gallery ${idx + 1}`}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <span className="text-white bg-black/40 px-3 py-1 rounded-full text-xs backdrop-blur-sm">বড় করে দেখুন</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Location Map */}
                        {hostel.coordinates && (
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                    <span>📍</span> লোকেশন
                                </h2>
                                <p className="text-gray-600 mb-6">{hostel.location}</p>

                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${hostel.coordinates.lat},${hostel.coordinates.lng}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 w-full py-4 bg-white border-2 border-primary/20 text-primary font-bold rounded-xl hover:bg-primary/5 hover:border-primary transition-all group"
                                >
                                    <span className="text-2xl group-hover:scale-110 transition-transform">🗺️</span>
                                    <span>গুগল ম্যাপে লোকেশন দেখুন</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>
                        )}

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
                    <div className="lg:w-[400px] shrink-0">
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

                            {hostel.contact && (
                                <div className="mt-6 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                                    <h3 className="font-bold text-blue-900 mb-2">ম্যানেজারের সাথে যোগাযোগ</h3>
                                    <p className="text-blue-700 text-sm mb-4">যেকোনো তথ্যের জন্য সরাসরি কল করুন</p>
                                    <a href={`tel:${hostel.contact}`} className="flex items-center justify-center gap-2 w-full py-3 bg-white text-primaryDip font-bold rounded-xl border border-blue-200 hover:bg-primaryDip hover:text-white transition-colors">
                                        📞 {hostel.contact}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <BookingApplicationModal
                isOpen={isApplicationModalOpen}
                onClose={() => setIsApplicationModalOpen(false)}
                onSubmit={handleApplicationSubmit}
                initialData={{
                    fullName: currentUser?.name || '',
                    phone: currentUser?.phone || '',
                    email: currentUser?.email || '',
                }}
            />
        </div>
    );
}
