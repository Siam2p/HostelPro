"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/lib/types';
import { initialData } from '@/lib/data';

interface AuthContextType {
    currentUser: User | null;
    isLoading: boolean;
    login: (role: User['role']) => void;
    logout: () => void;
    updateCurrentUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Restore session
        const stored = sessionStorage.getItem('currentUser');
        if (stored) {
            setCurrentUser(JSON.parse(stored));
        }
        setIsLoading(false);
    }, []);

    const login = (role: User['role']) => {
        // Find mock user by role
        const user = initialData.users.find((u: User) => u.role === role);
        if (user) {
            if (user.status === 'blocked') {
                alert('আপনার অ্যাকাউন্টটি ব্লক করা হয়েছে। অনুগ্রহ করে অ্যাডমিনের সাথে যোগাযোগ করুন।');
                return;
            }
            setCurrentUser(user);
            sessionStorage.setItem('currentUser', JSON.stringify(user));
        }
    };

    const logout = () => {
        setCurrentUser(null);
        sessionStorage.removeItem('currentUser');
    };

    const updateCurrentUser = (user: User) => {
        setCurrentUser(user);
        sessionStorage.setItem('currentUser', JSON.stringify(user));
    };

    return (
        <AuthContext.Provider value={{ currentUser, isLoading, login, logout, updateCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
