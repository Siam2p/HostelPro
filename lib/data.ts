import { MockData } from "./types";

export const initialData: MockData = {
    currentUser: null,
    users: [
        { id: 1, name: "Alice Student", email: "user@test.com", password: "123", role: "user" },
        { id: 2, name: "Bob Manager", email: "manager@test.com", password: "123", role: "manager" },
        { id: 3, name: "Super Admin", email: "admin@test.com", password: "123", role: "admin" }
    ],
    hostels: [
        {
            id: 101,
            name: "Oceanic Student Living",
            location: "Downtown, Metro City",
            price: 150,
            description: "A premium hostel with ocean views and high-speed wifi. Perfect for students who love serenity.",
            image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            rating: 4.8,
            totalRooms: 10,
            features: ["Wifi", "AC", "Gym", "Meals"],
            managerId: 2,
            rooms: [
                { id: "A1", capacity: 4, occupied: ["S1", "S2"], price: 150 },
                { id: "A2", capacity: 4, occupied: [], price: 150 },
                { id: "A3", capacity: 2, occupied: ["S1"], price: 200 }
            ]
        },
        {
            id: 102,
            name: "Greenwood Backpackers",
            location: "Uptown, Green Valley",
            price: 80,
            description: "Affordable and eco-friendly hostel surrounded by nature.",
            image: "https://images.unsplash.com/photo-1596276020587-8044fe049813?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            rating: 4.2,
            totalRooms: 15,
            features: ["Hiking", "Bonfire", "Shared Kitchen"],
            managerId: 2,
            rooms: [
                { id: "B1", capacity: 6, occupied: ["S3", "S4", "S5"], price: 80 },
                { id: "B2", capacity: 6, occupied: [], price: 80 }
            ]
        },
        {
            id: 103,
            name: "Urban  Hub",
            location: "City Center, Metro City",
            price: 120,
            description: "Modern living in the heart of the city. Close to all universities.",
            image: "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            rating: 4.5,
            totalRooms: 20,
            features: ["Metro Access", "Study Room", "Cafe"],
            managerId: 2,
            rooms: [
                { id: "C1", capacity: 2, occupied: [], price: 120 },
                { id: "C2", capacity: 2, occupied: ["S9"], price: 120 }
            ]
        },
        {
            id: 104,
            name: "Sunset Villa Student Home",
            location: "Westside, Metro City",
            price: 180,
            description: "Luxury student villa with private pool access and premium amenities.",
            image: "https://images.unsplash.com/photo-1512918760532-3edbed135119?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            rating: 4.9,
            totalRooms: 8,
            features: ["Pool", "AC", "Private Bath"],
            managerId: 2,
            rooms: [
                { id: "D1", capacity: 2, occupied: [], price: 180 },
                { id: "D2", capacity: 2, occupied: ["S10"], price: 180 }
            ]
        },
        {
            id: 105,
            name: "Campus Corner",
            location: "North Gate, University Park",
            price: 100,
            description: "Right next to the university gate. Best for students who want to save commute time.",
            image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            rating: 4.3,
            totalRooms: 25,
            features: ["Library", "Fast Food"],
            managerId: 2,
            rooms: [
                { id: "E1", capacity: 4, occupied: ["S12", "S13"], price: 100 },
                { id: "E2", capacity: 4, occupied: [], price: 100 }
            ]
        },
        {
            id: 106,
            name: "Blue Sky Hostel",
            location: "East District, Quiet Zone",
            price: 90,
            description: "A peaceful place for joyful studying.",
            image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            rating: 4.0,
            totalRooms: 12,
            features: ["Garden", "Silence"],
            managerId: 2,
            rooms: [
                { id: "F1", capacity: 3, occupied: [], price: 90 },
                { id: "F2", capacity: 3, occupied: [], price: 90 }
            ]
        }
    ],
    bookings: [
        {
            id: 1, // Changed to number to match interface if needed, or update interface. 
            // Wait, interface said Booking.id is number, but old data has "BK001".
            // I should update interface to string or keep string. Using number 1 for now to match interface.
            // Actually, let's update interface to string or data to number. "BK001" implies string.
            // I'll update interface to string for ID in next step if needed. 
            // For now I'll use 1. But wait, "BK001" is better.
            // I will use "BK001" and force cast or update types.ts. 
            // Let's check types.ts again. types.ts said `id: number`.
            // I'll stick to number `1` for safety or update types.ts. 
            // Let's use 1001 for Booking ID.
            userId: 1,
            hostelId: 101,
            roomId: "A1",
            bedId: "S1", // Old data inferred bedId? 
            // Old data: { id: "BK001", hostelId: 101, roomId: "A1", userId: 1, status: "pending", date: "2024-10-25" }
            // It didn't have bedId explicitly in the object shown in view_file.
            // But the interface has bedId. I should add a dummy bedId "S1".
            date: "2024-10-25",
            status: "pending",
            userName: "Alice Student", // Enriched data
            hostelName: "Oceanic Student Living" // Enriched data
        }
    ]
};
