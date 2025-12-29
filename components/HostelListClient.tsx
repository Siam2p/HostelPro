"use client";

import React, { useState } from "react";
import { useData } from "@/context/DataContext";
import { HostelCard } from "@/components/HostelCard";
import { Button } from "@/components/ui/Button";
import { Search, MapPin, Users, ArrowRight, Filter } from "lucide-react";
import { BANGLADESH_LOCATIONS } from "@/lib/locations";

export default function HostelListClient() {
  const { hostels } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "price_low" | "rating">(
    "all"
  );

  // New Filters State
  const [category, setCategory] = useState<"all" | "Male" | "Female">("all");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Draft states for "Search" button behavior
  const [draftSearchTerm, setDraftSearchTerm] = useState("");
  const [draftCategory, setDraftCategory] = useState<"all" | "Male" | "Female">(
    "all"
  );
  const [draftDivision, setDraftDivision] = useState("");
  const [draftDistrict, setDraftDistrict] = useState("");
  const [draftUpazila, setDraftUpazila] = useState("");

  const handleSearch = () => {
    setSearchTerm(draftSearchTerm);
    setCategory(draftCategory);
    setDivision(draftDivision);
    setDistrict(draftDistrict);
    setUpazila(draftUpazila);
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDraftDivision(e.target.value);
    setDraftDistrict("");
    setDraftUpazila("");
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDraftDistrict(e.target.value);
    setDraftUpazila("");
  };

  const availableDistricts = draftDivision
    ? Object.keys(BANGLADESH_LOCATIONS[draftDivision] || {})
    : [];
  const availableUpazilas =
    draftDivision && draftDistrict
      ? BANGLADESH_LOCATIONS[draftDivision][draftDistrict] || []
      : [];

  // Filter & Sort Logic
  const filteredHostels = hostels
    .filter((h) => {
      const searchTermMatch =
        !searchTerm ||
        h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.location.toLowerCase().includes(searchTerm.toLowerCase());

      const categoryMatch = category === "all" || h.category === category;
      const divisionMatch = !division || h.division === division;
      const districtMatch = !district || h.district === district;
      const upazilaMatch = !upazila || h.upazila === upazila;

      return (
        searchTermMatch &&
        categoryMatch &&
        divisionMatch &&
        districtMatch &&
        upazilaMatch
      );
    })
    .sort((a, b) => {
      if (filterType === "price_low") return a.price - b.price;
      if (filterType === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="min-h-screen bg-bg-body pb-">
      {/* Hero Section */}
      <section className="relative pt-10 pb-10 md:pt-24 md:pb-16 overflow-hidden bg-slate-50">
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-secondary/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-3 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-3 tracking-tight leading-tight text-slate-900">
              খুঁজে নিন আপনার <br />
              <span className="bg-linear-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent">
                সেরা হোস্টেলটি
              </span>
            </h1>
          </div>

          <div className="bg-white p-4 md:p-8 rounded-4xl md:rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] max-w-5xl mx-auto border border-white/50 ring-1 ring-black/5 animate-fade-in-up">
            <div className="space-y-4 md:space-y-6">
              {/* Row 1: Primary Search Bar - Responsive */}
              <div className="flex flex-row gap-2 md:gap-3">
                <div className="relative grow group">
                  <div className="absolute inset-y-0 left-0 pl-4 md:pl-5 flex items-center pointer-events-none group-focus-within:text-primary transition-colors text-gray-400">
                    <Search size={18} className="md:w-[22px] md:h-[22px]" />
                  </div>
                  <input
                    type="text"
                    placeholder="হোস্টেলের নাম বা লোকেশন..."
                    className="w-full pl-10 md:pl-13 pr-4 md:pr-6 py-3 md:py-4 rounded-xl md:rounded-full bg-white border border-gray-100 shadow-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-slate-900 text-sm md:text-lg placeholder:text-gray-400"
                    value={draftSearchTerm}
                    onChange={(e) => setDraftSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  className="shrink-0 rounded-xl md:rounded-full px-5 md:px-10 py-3 md:py-4 text-sm md:text-lg group bg-linear-to-r from-primary to-blue-600 hover:shadow-glow transition-all active:scale-95 text-white"
                >
                  <span className="hidden sm:inline">খুঁজুন</span>
                  <Search size={20} className="sm:hidden" />
                  <ArrowRight
                    className="hidden sm:inline ml-2 group-hover:translate-x-1 transition-transform"
                    size={20}
                  />
                </Button>
              </div>

              {/* Mobile Only: Category & Location Toggle Row */}
              <div className="flex md:hidden items-center gap-3 py-1">
                <Button
                  variant="outline"
                  onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                  className={`grow flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition-all ${
                    isMobileFilterOpen
                      ? "bg-primary/5 border-primary text-primary"
                      : "bg-gray-50/50"
                  }`}
                >
                  <Filter size={14} />
                  ফিল্টার
                  <span
                    className={`ml-auto transition-transform duration-300 ${
                      isMobileFilterOpen ? "rotate-180" : ""
                    }`}
                  >
                    <ArrowRight size={12} className="rotate-90" />
                  </span>
                </Button>
                <div className="relative grow">
                  <select
                    title="sort"
                    className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-100 bg-gray-50/50 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all appearance-none cursor-pointer text-slate-700"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                  >
                    <option value="all">সব দেখুন</option>
                    <option value="price_low">কম দাম</option>
                    <option value="rating">সেরা রেটিং</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                    <ArrowRight size={12} className="rotate-90" />
                  </div>
                </div>
              </div>

              {/* Row 2: Secondary Filters - Desktop Grid / Mobile Stack */}
              <div
                className={`${
                  isMobileFilterOpen
                    ? "flex flex-col animate-fade-in"
                    : "hidden"
                } md:grid md:grid-cols-4 gap-3 md:gap-4`}
              >
                {/* Category Picker */}
                <div className="space-y-1.5 md:space-y-0">
                  <label className="md:hidden text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    ক্যাটাগরি
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                      <Users size={18} />
                    </div>
                    <select
                        title="category"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 md:bg-gray-50/50 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all appearance-none cursor-pointer text-slate-700"
                      value={draftCategory}
                      onChange={(e) => setDraftCategory(e.target.value as any)}
                    >
                      <option value="all">সকল ক্যাটাগরি</option>
                      <option value="Male">ছাত্র (Male)</option>
                      <option value="Female">ছাত্রী (Female)</option>
                    </select>
                  </div>
                </div>

                {/* Division */}
                <div className="space-y-1.5 md:space-y-0">
                  <label className="md:hidden text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    বিভাগ
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                      <MapPin size={18} />
                    </div>
                    <select
                    title="division"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 md:bg-gray-50/50 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all appearance-none cursor-pointer text-slate-700"
                      value={draftDivision}
                      onChange={handleDivisionChange}
                    >
                      <option value="">বিভাগ নির্বাচন</option>
                      {Object.keys(BANGLADESH_LOCATIONS).map((div) => (
                        <option key={div} value={div}>
                          {div}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* District */}
                <div className="space-y-1.5 md:space-y-0">
                  <label className="md:hidden text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    জেলা
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                      <MapPin size={18} />
                    </div>
                    <select
                    title="district"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 md:bg-gray-50/50 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all appearance-none cursor-pointer disabled:opacity-50 text-slate-700"
                      value={draftDistrict}
                      onChange={handleDistrictChange}
                      disabled={!draftDivision}
                    >
                      <option value="">জেলা নির্বাচন</option>
                      {availableDistricts.map((dist) => (
                        <option key={dist} value={dist}>
                          {dist}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Upazila */}
                <div className="space-y-1.5 md:space-y-0">
                  <label className="md:hidden text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    উপজেলা
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                      <MapPin size={18} />
                    </div>
                    <select
                    title="upazila"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 md:bg-gray-50/50 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all appearance-none cursor-pointer disabled:opacity-50 text-slate-700"
                      value={draftUpazila}
                      onChange={(e) => setDraftUpazila(e.target.value)}
                      disabled={!draftDistrict}
                    >
                      <option value="">উপজেলা নির্বাচন</option>
                      {availableUpazilas.map((upz) => (
                        <option key={upz} value={upz}>
                          {upz}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="container mx-auto px-3 py-6 md:py-10">
        <div className="hidden md:flex flex-row justify-between items-center gap-4 mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">
            মোট হোস্টেল পাওয়া গেছে:{" "}
            <span className="text-primary">{filteredHostels.length}</span> টি
          </h2>

          <div className="relative min-w-[200px]">
            <select
              title="sort"
              className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all appearance-none cursor-pointer"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
            >
              <option value="all">সর্ট করুন: সব দেখুন</option>
              <option value="price_low">দাম: কম থেকে বেশি</option>
              <option value="rating">সেরা রেটিং</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
              <ArrowRight size={14} className="rotate-90" />
            </div>
          </div>
        </div>

        {filteredHostels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHostels.map((hostel, index) => (
              <div
                key={hostel.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <HostelCard hostel={hostel} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-border">
            <div className="text-6xl mb-4">🏠❌</div>
            <h3 className="text-2xl font-bold text-text-muted mb-2">
              কোন হোস্টেল পাওয়া যায়নি
            </h3>
            <p className="text-text-muted mb-6">
              আপনার সার্চ ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setFilterType("all");
              }}
            >
              ফিল্টার রিসেট করুন
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
