import React from 'react';
import HomeClient from '@/components/HomeClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HostelPro | Find Best Student Hostels in Bangladesh',
  description: 'Find verified, safe, and affordable student hostels in Dhaka and other major cities. Book your seat online today.',
};

export default function Home() {
  return <HomeClient />;
}
