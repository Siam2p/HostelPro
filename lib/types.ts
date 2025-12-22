export interface User {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'manager' | 'admin';
    password?: string;
    guardianContact?: string;
    phone?: string;
    isManaged?: boolean; // True if the user was created by an admin/manager without self-registration
}

export interface Room {
    id: string;
    capacity: number;
    occupied: string[];
    price: number;
}

export interface Hostel {
    id: number;
    name: string;
    location: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
    price: number;
    description: string;
    image: string;
    rating: number;
    totalRooms: number;
    features: string[];
    managerId: number;
    rooms: Room[];
    gallery?: string[]; // For storing multiple images/videos
    contact?: string;
}

export interface Booking {
    id: number;
    userId: number;
    hostelId: number;
    roomId: string;
    bedId: string;
    date: string;
    status: 'pending' | 'approved' | 'rejected';
    userName: string;
    hostelName: string;
    monthlyFeeStatus?: 'paid' | 'unpaid' | 'pending';
    lastPaymentDate?: string;
    isActive?: boolean;
}

export interface Notice {
    id: number;
    hostelId: number;
    date: string;
    content: string;
    title: string;
}

export interface MockData {
    currentUser: User | null;
    users: User[];
    hostels: Hostel[];
    bookings: Booking[];
    notices?: Notice[];
}
