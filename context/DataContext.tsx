"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Hostel, Booking, MockData, User } from '@/lib/types';
import { initialData } from '@/lib/data';

interface DataContextType {
    users: User[];
    hostels: Hostel[];
    bookings: Booking[];
    addBooking: (booking: Booking) => void;
    updateBookingStatus: (id: number, status: Booking['status']) => void;
    addHostel: (hostel: Hostel) => void;
    updateHostel: (hostel: Hostel) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
    const [hostels, setHostels] = useState<Hostel[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        const stored = localStorage.getItem('hostelData');
        if (stored) {
            const data: MockData = JSON.parse(stored);
            setHostels(data.hostels);
            setBookings(data.bookings);
            setUsers(data.users || initialData.users);
        } else {
            setHostels(initialData.hostels);
            setBookings(initialData.bookings);
            setUsers(initialData.users);
            localStorage.setItem('hostelData', JSON.stringify(initialData));
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
                bookings
            };
            localStorage.setItem('hostelData', JSON.stringify(data));
        }
    }, [hostels, bookings, users, isLoaded]);

    const addBooking = (booking: Booking) => {
        setBookings(prev => [...prev, booking]);
    };

    const updateBookingStatus = (id: number, status: Booking['status']) => {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    };

    const addHostel = (hostel: Hostel) => {
        setHostels(prev => [...prev, hostel]);
    };

    const updateHostel = (hostel: Hostel) => {
        setHostels(prev => prev.map(h => h.id === hostel.id ? hostel : h));
    };

    return (
        <DataContext.Provider value={{ users, hostels, bookings, addBooking, updateBookingStatus, addHostel, updateHostel }}>
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
