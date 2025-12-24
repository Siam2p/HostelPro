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
            id: 201,
            name: "রূপসী বাংলা ছাত্রনিবাস",
            location: "ধানমণ্ডি, ঢাকা",
            coordinates: { lat: 23.7500, lng: 90.3800 },
            price: 6500,
            description: "ধানমণ্ডি ১৫ নম্বর সংলগ্ন শান্ত পরিবেশে আধুনিক সুযোগ সুবিধা সম্পন্ন ছাত্র হোস্টেল। ২৪ ঘণ্টা পানি, বিদ্যুৎ এবং হাই-স্পিড ওয়াইফাই সুবিধা রয়েছে।",
            image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            rating: 4.5,
            totalRooms: 12,
            features: ["Wifi", "Laundry", "CCTV", "Filter Water"],
            managerId: 2,
            rooms: [
                { id: "R1-1", capacity: 4, occupied: ["S1", "S2"], price: 6500 },
                { id: "R1-2", capacity: 2, occupied: [], price: 8500 }
            ],
            category: 'Male',
            division: 'ঢাকা',
            district: 'ঢাকা',
            upazila: 'ধানমণ্ডি',
            contact: '01711-223344',
            gallery: [
                "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1512918760532-3edbed135119?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ]
        },
        {
            id: 202,
            name: "গাজীপুর স্টুডেন্ট কেয়ার",
            location: "গাজীপুর সদর, গাজীপুর",
            coordinates: { lat: 23.9999, lng: 90.4200 },
            price: 4500,
            description: "গাজীপুর চৌরাস্তা সংলগ্ন নিরাপদ পরিবেশে মনোরম আবাসন। স্বল্প খরচে উন্নত সেবা প্রদান করাই আমাদের লক্ষ্য।",
            image: "https://images.unsplash.com/photo-1596276020587-8044fe049813?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            rating: 4.2,
            totalRooms: 20,
            features: ["Wifi", "Meals", "Generator"],
            managerId: 2,
            rooms: [
                { id: "G1", capacity: 6, occupied: ["S3", "S4"], price: 4500 }
            ],
            category: 'Male',
            division: 'ঢাকা',
            district: 'গাজীপুর',
            upazila: 'গাজীপুর সদর',
            contact: '01822-334455'
        },
        {
            id: 203,
            name: "ময়নামতি গার্লস হোস্টেল",
            location: "কুমিল্লা সদর, কুমিল্লা",
            coordinates: { lat: 23.4607, lng: 91.1809 },
            price: 5500,
            description: "কুমিল্লা ভিক্টোরিয়া কলেজ এর নিকটবর্তী নিরাপদ এবং সুশৃঙ্খল ছাত্রী হোস্টেল। ছাত্রীদের নিরাপত্তার জন্য সিসিটিভি ক্যামেরা ও সার্বক্ষণিক মহিলা গার্ড রয়েছে।",
            image: "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            rating: 4.7,
            totalRooms: 15,
            features: ["High Security", "Wifi", "Meals", "Study Room"],
            managerId: 2,
            rooms: [
                { id: "M1", capacity: 3, occupied: ["S5", "S6"], price: 5500 }
            ],
            category: 'Female',
            division: 'চট্টগ্রাম',
            district: 'কুমিল্লা',
            upazila: 'কুমিল্লা সদর',
            contact: '01933-445566',
            gallery: [
                "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1596276020587-8044fe049813?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ]
        },
        {
            id: 204,
            name: "জালালাবাদ স্টুডেন্ট হোম",
            location: "সিলেট সদর, সিলেট",
            coordinates: { lat: 24.8949, lng: 91.8687 },
            price: 7000,
            description: "সিলেট শাহজালাল বিশ্ববিদ্যালয় (SUST) সংলগ্ন আধুনিক হোস্টেল। নিরিবিলি পরিবেশে লেখাপড়ার জন্য উপযুক্ত জায়গা।",
            image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            rating: 4.8,
            totalRooms: 10,
            features: ["Wifi", "AC", "Library", "Backpack Storage"],
            managerId: 2,
            rooms: [
                { id: "J1", capacity: 2, occupied: ["S7"], price: 7000 }
            ],
            category: 'Male',
            division: 'সিলেট',
            district: 'সিলেট',
            upazila: 'সিলেট সদর'
        },
        {
            id: 205,
            name: "বরিশাল কীর্তনখোলা ছাত্রাবাস",
            location: "বরিশাল সদর, বরিশাল",
            coordinates: { lat: 22.7010, lng: 90.3535 },
            price: 4000,
            description: "বরিশাল বিএম কলেজ রোড সংলগ্ন ঐতিহ্যবাহী এবং আধুনিক সুযোগ সুবিধা সম্পন্ন ছাত্র হোস্টেল।",
            image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            rating: 4.0,
            totalRooms: 25,
            features: ["Wifi", "Sports", "Common Room"],
            managerId: 2,
            rooms: [
                { id: "B1", capacity: 4, occupied: [], price: 4000 }
            ],
            category: 'Male',
            division: 'বরিশাল',
            district: 'বরিশাল',
            upazila: 'বরিশাল সদর',
            contact: '01711-234567'
        },
        {
            id: 206,
            name: "বগুড়া ব্লু বার্ড হোস্টেল",
            location: "বগুড়া সদর, বগুড়া",
            coordinates: { lat: 24.8481, lng: 89.3730 },
            price: 5000,
            description: "বগুড়া শহরের প্রাণকেন্দ্রে অবস্থিত নিরাপদ আবাসন। উন্নত মান বজায় রাখাই আমাদের অঙ্গীকার।",
            image: "https://images.unsplash.com/photo-1512918760532-3edbed135119?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            rating: 4.3,
            totalRooms: 18,
            features: ["Wifi", "Attached Bath", "Balcony"],
            managerId: 2,
            rooms: [
                { id: "BB1", capacity: 2, occupied: ["S8"], price: 5000 }
            ],
            category: 'Female',
            division: 'রাজশাহী',
            district: 'বগুড়া',
            upazila: 'বগুড়া সদর',
            contact: '01822-345678'
        },
        {
            id: 207,
            name: "যশোর গোল্ডেন কটেজ",
            location: "যশোর সদর, যশোর",
            coordinates: { lat: 23.1664, lng: 89.2081 },
            price: 6000,
            description: "যশোর কেশবপুর মোড় সংলগ্ন আধুনিক ও মনোরম পরিবেশে থাকার সুব্যবস্থা।",
            image: "https://images.unsplash.com/photo-1596276020587-8044fe049813?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            rating: 4.1,
            totalRooms: 14,
            features: ["Wifi", "TV Room", "Daily Care"],
            managerId: 2,
            rooms: [
                { id: "Y1", capacity: 3, occupied: [], price: 6000 }
            ],
            category: 'Male',
            division: 'খুলনা',
            district: 'যশোর',
            upazila: 'যশোর সদর',
            contact: '01933-456789'
        },
        {
            id: 208,
            name: "ব্রহ্মপুত্র ভিউ হোস্টেল",
            location: "ময়মনসিংহ সদর, ময়মনসিংহ",
            coordinates: { lat: 24.7471, lng: 90.4203 },
            price: 4800,
            description: "ব্রহ্মপুত্র নদ সংলগ্ন মনোরম পরিবেশে মানসম্মত আবাসন। বিশ্ববিদ্যালয় এবং বড় কলেজগুলোর কাছাকাছি।",
            image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            rating: 4.4,
            totalRooms: 22,
            features: ["Wifi", "Garden", "Fresh Air"],
            managerId: 2,
            rooms: [
                { id: "BV1", capacity: 4, occupied: [], price: 4800 }
            ],
            category: 'Male',
            division: 'ময়মনসিংহ',
            district: 'ময়মনসিংহ',
            upazila: 'ময়মনসিংহ সদর',
            contact: '01577-889900'
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
