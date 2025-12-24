"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { DashboardView } from '@/lib/types';

// Components
import Sidebar from './components/Sidebar';
import OverviewSection from './components/OverviewSection';
import HostelsSection from './components/HostelsSection';
import BookingsSection from './components/BookingsSection';
import ResidentsSection from './components/ResidentsSection';
import ProfileSection from './components/ProfileSection';
import AddHostelModal from './components/AddHostelModal';
import AddNoticeModal from './components/AddNoticeModal';

// Redundant type removed as it's now imported

export default function ManagerDashboard() {
    const { currentUser } = useAuth();
    const { deleteHostel } = useData();
    const router = useRouter();
    const [activeView, setActiveView] = useState<DashboardView>('overview');

    // Modals State
    const [showAddModal, setShowAddModal] = useState(false);
    const [showNoticeModal, setShowNoticeModal] = useState(false);

    // Selection State
    const [selectedHostelId, setSelectedHostelId] = useState<number | null>(null);
    const [editHostelId, setEditHostelId] = useState<number | null>(null);

    useEffect(() => {
        if (!currentUser || currentUser.role !== 'manager') {
            router.push('/login');
        }
    }, [currentUser, router]);

    if (!currentUser || currentUser.role !== 'manager') {
        return null;
    }

    const openEditModal = () => {
        if (selectedHostelId) {
            setEditHostelId(selectedHostelId);
            setShowAddModal(true);
        }
    };

    const handleDeleteHostel = () => {
        if (selectedHostelId && confirm('আপনি কি নিশ্চিত যে আপনি এই হোস্টেলটি ডিলিট করতে চান? এটি আর ফিরিয়ে আনা যাবে না।')) {
            deleteHostel(selectedHostelId);
            setSelectedHostelId(null);
        }
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
        setEditHostelId(null); // Reset edit state on close
    };

    // Callback for creating new hostel
    const handleCreateHostel = () => {
        setEditHostelId(null);
        setShowAddModal(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row font-sans container mx-auto">
            <Sidebar activeView={activeView} setActiveView={setActiveView} />
            {/* Mobile Bottom Navigation */}
            <div className="lg:hidden w-full fixed bottom-0 left-0 bg-white border-t border-gray-200 z-50 px-6 py-3 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <button
                    onClick={() => setActiveView('overview')}
                    className={`flex flex-col items-center gap-1 ${activeView === 'overview' ? 'text-blue-600' : 'text-gray-400'}`}
                >
                    <span className="text-xl">📊</span>
                    <span className="text-[10px] font-medium">Overview</span>
                </button>
                <button
                    onClick={() => setActiveView('hostels')}
                    className={`flex flex-col items-center gap-1 ${activeView === 'hostels' ? 'text-blue-600' : 'text-gray-400'}`}
                >
                    <span className="text-xl">🏨</span>
                    <span className="text-[10px] font-medium">Hostels</span>
                </button>
                <div className="relative -top-6">
                    <button
                        onClick={handleCreateHostel}
                        className="h-14 w-14 bg-blue-600 rounded-full text-white shadow-lg shadow-blue-300 flex items-center justify-center text-2xl hover:bg-blue-700 transition-colors"
                    >
                        +
                    </button>
                </div>
                <button
                    onClick={() => setActiveView('bookings')}
                    className={`flex flex-col items-center gap-1 ${activeView === 'bookings' ? 'text-blue-600' : 'text-gray-400'}`}
                >
                    <span className="text-xl">📝</span>
                    <span className="text-[10px] font-medium">Bookings</span>
                </button>
                <button
                    onClick={() => setActiveView('residents')}
                    className={`flex flex-col items-center gap-1 ${activeView === 'residents' ? 'text-blue-600' : 'text-gray-400'}`}
                >
                    <span className="text-xl">👥</span>
                    <span className="text-[10px] font-medium">Residents</span>
                </button>
                <button
                    onClick={() => setActiveView('profile')}
                    className={`flex flex-col items-center gap-1 ${activeView === 'profile' ? 'text-blue-600' : 'text-gray-400'}`}
                >
                    <span className="text-xl">👤</span>
                    <span className="text-[10px] font-medium">Profile</span>
                </button>
            </div>

            <main className="flex-1 px-3 sm:px-6 py-6 sm:py-8 overflow-hidden h-screen overflow-x-hidden pb-24">
                {activeView === 'overview' && (
                    <OverviewSection
                        setActiveView={setActiveView}
                        setShowAddModal={setShowAddModal} // Opens in "Add" mode implicitly as editHostelId is mostly null unless set
                        setShowNoticeModal={setShowNoticeModal}
                    />
                )}
                {activeView === 'hostels' && (
                    <HostelsSection
                        selectedHostelId={selectedHostelId}
                        setSelectedHostelId={setSelectedHostelId}
                        setShowAddModal={handleCreateHostel}
                        openEditModal={openEditModal}
                        handleDeleteHostel={handleDeleteHostel}
                    />
                )}
                {activeView === 'bookings' && <BookingsSection />}
                {activeView === 'residents' && <ResidentsSection />}
                {activeView === 'profile' && <ProfileSection />}
            </main>

            <AddHostelModal
                isOpen={showAddModal}
                onClose={handleCloseAddModal}
                editHostelId={editHostelId}
            />

            <AddNoticeModal
                isOpen={showNoticeModal}
                onClose={() => setShowNoticeModal(false)}
            />
        </div>
    );
}
