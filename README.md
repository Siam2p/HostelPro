# HostelPro - Modern Student Hostel Management System 🏠

**HostelPro** is a modern, responsive, and feature-rich web application designed to simplify hostel management for students, managers, and administrators. Built with **Next.js 15+ (App Router)** and **Tailwind CSS**, it offers a premium user experience with a focus on aesthetics, usability, and functionality.

---

## 🌟 Key Features

### 👤 User (Resident) Features
*   **Hostel Discovery**: Browse hostels with advanced filters (Location, Gender, Category).
*   **Detailed Profiles**: Manage personal information, bio, and contact details.
*   **Booking System**: View current booking status, room/bed details.
*   **Financial Dashboard**: Track monthly fee payments and history.
*   **Notice Board**: Stay updated with hostel-specific announcements.
*   **Reviews**: detailed reviews and ratings for hostels.
*   **Interactive Design**: "Anti-gravity" animations and premium UI components.

### 👔 Manager Features
*   **Dashboard**: Overview of total hostels, residents, and bookings.
*   **Hostel Management**: Add, edit, and manage hostel listings with gallery uploads.
*   **Resident Management**: View resident details, contact info, and manage their status (Active/Inactive).
*   **Booking Management**: Approve or reject booking requests.
*   **Notice Board**: Post and manage notices for residents.
*   **Profile Management**: Dedicated profile section for managers.

### 🛡️ Admin Features
*   **System Overview**: Global view of all users, hostels, and system health.
*   **User Management**: Manage all user roles and permissions.
*   **Security**: Enhanced security settings and profile management.

---

## 🛠️ Technology Stack

*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Maps**: [Leaflet](https://leafletjs.com/) & `react-leaflet` (OpenStreetMap)
*   **State Management**: React Context API (`AuthContext`, `DataContext`)
*   **Data**: Mock data (Client-side simulation)

---

## 📂 Project Structure

```
HostelPro/
├── app/                    # Next.js App Router directories
│   ├── admin/              # Admin dashboard & pages
│   ├── manager/            # Manager dashboard & pages
│   ├── profile/            # User profile pages
│   ├── hostels/            # Hostel listing & details pages
│   ├── login/              # Authentication pages
│   └── ...
├── components/             # Reusable UI components
│   ├── ui/                 # Core UI elements (Card, Button, Badge, etc.)
│   └── ...
├── context/                # Global state (Auth, Data)
├── lib/                    # Utilities and types
│   ├── data.ts             # Mock data source
│   ├── types.ts            # TypeScript interfaces
│   └── ...
└── public/                 # Static assets
```

---

## 🚀 Getting Started (Frontend)

To run this project locally:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Siam2p/HostelPro.git
    cd HostelPro
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open the app**:
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## � Backend Setup Guide (Step-by-Step)

Currently, **HostelPro** relies on client-side mock data (`lib/data.ts`) to simulate a backend. To scale this application for production, you need to implement a real backend. Detailed below is a step-by-step guide to setting up a backend using **Next.js API Routes** and a Database (e.g., MongoDB or PostgreSQL).

### Step 1: Choose Your Stack
*   **Database**: MongoDB (NoSQL) is recommended for flexibility with hostel data, or PostgreSQL (SQL) for structured relationships.
*   **ORM/ODM**: [Prisma](https://www.prisma.io/) (for SQL/Mongo) or [Mongoose](https://mongoosejs.com/) (for Mongo).
*   **Authentication**: [NextAuth.js](https://next-auth.js.org/) (recommended) or Clerk.

### Step 2: Database Setup (Example: MongoDB + Prisma)

1.  **Install Prisma**:
    ```bash
    npm install prisma @prisma/client
    npx prisma init
    ```

2.  **Configure `schema.prisma`**:
    Define your models based on `lib/types.ts`.
    ```prisma
    model User {
      id        String   @id @default(auto()) @map("_id") @db.ObjectId
      email     String   @unique
      password  String
      role      Role     @default(USER)
      bookings  Booking[]
      // ... other fields
    }

    model Hostel {
      id          String    @id @default(auto()) @map("_id") @db.ObjectId
      name        String
      location    String
      rooms       Room[]
      // ... other fields
    }
    
    // ... Define Room, Booking, Notice models
    ```

3.  **Push to Database**:
    ```bash
    npx prisma db push
    ```

### Step 3: Create API Routes

Create backend endpoints in the `app/api` folder. Next.js App Router uses `route.ts` files.

**Example: `app/api/hostels/route.ts`**
```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Your prisma client instance

export async function GET() {
  const hostels = await prisma.hostel.findMany();
  return NextResponse.json(hostels);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newHostel = await prisma.hostel.create({ data: body });
  return NextResponse.json(newHostel);
}
```

### Step 4: Implement Authentication

1.  **Install NextAuth**:
    ```bash
    npm install next-auth
    ```

2.  **Configure NextAuth**: Create `app/api/auth/[...nextauth]/route.ts` to handle login sessions securely using JWTs, replacing the current `AuthContext` dummy logic.

### Step 5: Connect Frontend to Backend

Refactor the **Context API** or Components to fetch data from your new API instead of `lib/data.ts`.

**Before (Current):**
```typescript
// context/DataContext.tsx
const [hostels, setHostels] = useState(initialData.hostels);
```

**After (With Backend):**
```typescript
// context/DataContext.tsx
useEffect(() => {
  fetch('/api/hostels')
    .then(res => res.json())
    .then(data => setHostels(data));
}, []);
```

### Step 6: Image Uploads
For the "Gallery Upload" feature, integrate a storage service like **Cloudinary**, **AWS S3**, or **UploadThing**.
1.  Frontend uploads file -> Gets URL.
2.  Send URL to your API to save in the `Hostel` database model.

---

## 🧪 Testing

*   **Unit Testing**: Use Jest and React Testing Library.
*   **E2E Testing**: Use Cypress or Playwright to test full user flows (Login -> Book Hostel -> View Profile).

---

## 📄 License

This project is open-source and available for personal and educational use.

**Developed with ❤️ by [Siam] for HostelPro**
