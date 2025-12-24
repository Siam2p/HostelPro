import { Metadata } from 'next';
import HostelListClient from '@/components/HostelListClient';

export const metadata: Metadata = {
    title: 'All Hostels | HostelPro',
    description: 'Browse all available student hostels. Compare prices, ratings, and facilities to find your perfect match.',
};

export default function HostelsPage() {
    return <HostelListClient />;
}
