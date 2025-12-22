import React from 'react';
import { Metadata } from 'next';
import { initialData } from '@/lib/data';
import HostelDetailsClient from '@/components/HostelDetailsClient';

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
    return initialData.hostels.map((hostel) => ({
        id: hostel.id.toString(),
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const hostel = initialData.hostels.find(h => h.id === Number(id));

    if (!hostel) {
        return {
            title: 'Hostel Not Found | HostelPro',
        };
    }

    return {
        title: `${hostel.name} | HostelPro`,
        description: `${hostel.description} Located in ${hostel.location}. Price: ৳${hostel.price}/month.`,
        openGraph: {
            title: hostel.name,
            description: hostel.description,
            images: [hostel.image],
        }
    };
}

export default async function HostelDetailsPage({ params }: Props) {
    const { id } = await params;

    // Pass the initial ID to custom client component to handle the rest
    // We could pass the full hostel object if we wanted to avoid "useData" reliance for the initial paint,
    // but the Client Component logic already relies on context for "addBooking".
    // For now, passing ID is sufficient to bridge the gap, and we keep using Context in client.
    // However, for pure SEO, the client component will hydrate.
    return <HostelDetailsClient initialHostelId={Number(id)} />;
}
