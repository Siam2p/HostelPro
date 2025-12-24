import React, { Suspense } from 'react';
import type { Metadata } from "next";
import { Hind_Siliguri, Outfit } from "next/font/google";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hostel Pro | বাচেলারদের জন্য সেরা হোস্টেল",
    template: "%s | Hostel Pro"
  },
  description: "বাংলাদেশের সেরা ছাত্র হোস্টেল বুকিং প্ল্যাটফর্ম। নিরাপদ পরিবেশ, ভালো খাবার এবং সাশ্রয়ী মূল্যে সিট বুক করুন।",
  keywords: ["hostel", "mess", "bachelor", "student accommodation", "Bangladesh", "dhaka hostel"],
  authors: [{ name: "Hostel Pro Team" }],
  creator: "Hostel Pro",
  metadataBase: new URL("https://hostel-pro.vercel.app"),
  openGraph: {
    title: "Hostel Pro | সেরা ছাত্র হোস্টেল খুঁজুন",
    description: "সহজেই আপনার পছন্দের হোস্টেল বা মেস খুঁজে নিন।verified রিভিউ এবং সেরা দাম।",
    url: "https://hostel-pro.vercel.app",
    siteName: "Hostel Pro",
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hostel Pro | সেরা ছাত্র হোস্টেল খুঁজুন",
    description: "সহজেই আপনার পছন্দের হোস্টেল বা মেস খুঁজে নিন।",
    creator: "@hostelpro",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import { AuthProvider } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// ... imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${hindSiliguri.variable} ${outfit.variable} antialiased flex flex-col min-h-screen font-[family-name:var(--font-outfit),var(--font-hind-siliguri),sans-serif]`}
      >
        <AuthProvider>
          <DataProvider>
            <Suspense fallback={<div className="h-16" />}>
              <Navbar />
            </Suspense>
            <main className="grow">
              {children}
            </main>
            <Footer />
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
