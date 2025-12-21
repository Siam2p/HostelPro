import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Hostel } from '@/lib/types';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

interface HostelCardProps {
    hostel: Hostel;
}

export function HostelCard({ hostel }: HostelCardProps) {
    // Calculate availability (mock logic based on rooms array if needed, or just static badges)
    // For now, simple logic: if any room has empty spots, it's available.
    const totalCapacity = hostel.rooms.reduce((acc, r) => acc + r.capacity, 0);
    const occupiedCount = hostel.rooms.reduce((acc, r) => acc + r.occupied.length, 0);
    const hasSpace = occupiedCount < totalCapacity;

    return (
        <Card className="h-full flex flex-col p-4">
            <div className="relative h-48 w-full mb-4 rounded-xl overflow-hidden">
                <Image
                    src={hostel.image}
                    alt={hostel.name}
                    fill
                    className="object-cover"
                />
                <div className="absolute top-2 right-2">
                    {hasSpace ? (
                        <Badge variant="success">খালি</Badge>
                    ) : (
                        <Badge variant="danger">বুকড</Badge>
                    )}
                </div>
            </div>

            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="text-xl font-bold text-text-main line-clamp-1">{hostel.name}</h3>
                    <p className="text-text-muted text-sm flex items-center mt-1">
                        <span className="mr-1">📍</span> {hostel.location}
                    </p>
                </div>
                <div className="flex items-center bg-green-50 px-2 py-1 rounded-lg">
                    <span className="text-green-600 font-bold mr-1">★</span>
                    <span className="font-bold text-text-main">{hostel.rating}</span>
                </div>
            </div>

            <p className="text-text-muted text-sm line-clamp-2 mb-4 flex-grow">
                {hostel.description}
            </p>

            <div className="mt-auto border-t border-border pt-4 flex items-center justify-between">
                <div>
                    <p className="text-xs text-text-muted">শুরু মাত্র</p>
                    <p className="text-lg font-bold text-primary">৳{hostel.price}<span className="text-xs text-text-muted font-normal">/মাস</span></p>
                </div>
                <Link href={`/hostels/${hostel.id}`}>
                    <Button variant="outline" className="text-sm px-4 py-2">
                        বিস্তারিত দেখুন
                    </Button>
                </Link>
            </div>
        </Card>
    );
}
