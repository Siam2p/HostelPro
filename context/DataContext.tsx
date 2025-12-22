"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Hostel, Booking, MockData, User, Notice } from '@/lib/types';
import { initialData } from '@/lib/data';

interface DataContextType {
    users: User[];
    hostels: Hostel[];
    bookings: Booking[];
    notices: Notice[];
    addBooking: (booking: Booking) => void;
    updateBookingStatus: (id: number, status: Booking['status']) => void;
    addHostel: (hostel: Hostel) => void;
    updateHostel: (hostel: Hostel) => void;
    deleteHostel: (id: number) => void;
    addNotice: (notice: Notice) => void;
    deleteNotice: (id: number) => void;
    deleteBooking: (id: number) => void;
    updateBooking: (booking: Booking) => void;
    addUser: (user: User) => void;
    deleteUser: (id: number) => void;
    updateUser: (user: User) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
    const [hostels, setHostels] = useState<Hostel[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [notices, setNotices] = useState<Notice[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        const stored = localStorage.getItem('hostelData');
        if (stored) {
            const data: MockData = JSON.parse(stored);
            setHostels(data.hostels);
            setBookings(data.bookings);
            setUsers(data.users || initialData.users);
            setNotices(data.notices || []);
        } else {
            setHostels(initialData.hostels);
            setBookings(initialData.bookings);
            setUsers(initialData.users);
            setNotices([]);
            localStorage.setItem('hostelData', JSON.stringify({ ...initialData, notices: [] }));
        }
        setIsLoaded(true);
    }, []);

    // Save to local storage whenever data changes
    useEffect(() => {
        if (isLoaded) {
            const data: MockData = {
                currentUser: null, // User is handled by AuthContext
                users,
                hostels,
                bookings,
                notices
            };
            localStorage.setItem('hostelData', JSON.stringify(data));
        }
    }, [hostels, bookings, users, notices, isLoaded]);

    const addBooking = (booking: Booking) => {
        setBookings(prev => [...prev, booking]);
    };

    const updateBookingStatus = (id: number, status: Booking['status']) => {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    };

    const updateBooking = (booking: Booking) => {
        setBookings(prev => prev.map(b => b.id === booking.id ? booking : b));
    };

    const deleteBooking = (id: number) => {
        setBookings(prev => prev.filter(b => b.id !== id));
    };

    const addHostel = (hostel: Hostel) => {
        setHostels(prev => [...prev, hostel]);
    };

    const updateHostel = (hostel: Hostel) => {
        setHostels(prev => prev.map(h => h.id === hostel.id ? hostel : h));
    };

    const deleteHostel = (id: number) => {
        setHostels(prev => prev.filter(h => h.id !== id));
        // Optionally remove associated bookings? For now keep them or filter them in UI.
        // setBookings(prev => prev.filter(b => ...));
    };

    const addNotice = (notice: Notice) => {
        setNotices(prev => [notice, ...prev]);
    };

    const deleteNotice = (id: number) => {
        setNotices(prev => prev.filter(n => n.id !== id));
    };

    const addUser = (user: User) => {
        setUsers(prev => [...prev, user]);
    };

    const updateUser = (user: User) => {
        setUsers(prev => prev.map(u => u.id === user.id ? user : u));
    };

    const deleteUser = (id: number) => {
        setUsers(prev => prev.filter(u => u.id !== id));
    };

    return (
        <DataContext.Provider value={{
            users, hostels, bookings, notices,
            addBooking, updateBookingStatus, updateBooking, deleteBooking,
            addHostel, updateHostel, deleteHostel,
            addNotice, deleteNotice,
            addUser, updateUser, deleteUser
        }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
}
