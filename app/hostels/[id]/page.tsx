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
    const hostel = initialData.hostels.find(h => h.id === Number(id));

    return (
        <>
            {hostel && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Accommodation",
                            "name": hostel.name,
                            "description": hostel.description,
                            "image": hostel.image,
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": hostel.location,
                                "addressCountry": "BD"
                            },
                            "offers": {
                                "@type": "Offer",
                                "price": hostel.price,
                                "priceCurrency": "BDT",
                                "availability": "https://schema.org/InStock"
                            },
                            "aggregateRating": {
                                "@type": "AggregateRating",
                                "ratingValue": hostel.rating,
                                "reviewCount": "10"
                            }
                        })
                    }}
                />
            )}
            <HostelDetailsClient initialHostelId={Number(id)} />
        </>
    );
}
