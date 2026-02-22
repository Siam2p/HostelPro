import React, { useState, useEffect } from 'react';
import NextImage from 'next/image';
import dynamic from 'next/dynamic';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { BANGLADESH_LOCATIONS } from '@/lib/locations';
import { isValidBangladeshiPhone } from '@/lib/validation';

const MapPicker = dynamic(() => import('@/components/MapPicker'), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full bg-gray-100 animate-pulse rounded-lg mt-4">ম্যাপ লোড হচ্ছে...</div>
});

interface AddHostelModalProps {
    onClose: () => void;
    editHostelId: number | null;
}

export default function AddHostelModal({ onClose, editHostelId }: AddHostelModalProps) {
    const { currentUser } = useAuth();
    const { addHostel, updateHostel, hostels } = useData();

    // Initialize state directly from props since we'll use a unique key to force remount
    const hostel = editHostelId ? hostels.find(h => h.id === editHostelId) : null;

    const [name, setName] = useState(hostel?.name || '');
    const [price, setPrice] = useState(hostel ? String(hostel.price) : '');
    const [contact, setContact] = useState(hostel?.contact || '');
    const [address, setAddress] = useState(hostel?.location || '');
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(hostel?.coordinates || null);
    const [mediaPreviews, setMediaPreviews] = useState<string[]>(hostel?.gallery || (hostel?.image ? [hostel.image] : []));
    const [features, setFeatures] = useState<string[]>(hostel?.features || []);
    const [description, setDescription] = useState(hostel?.description || '');
    const [category, setCategory] = useState<'Male' | 'Female'>(hostel?.category || 'Male');
    const [division, setDivision] = useState(hostel?.division || '');
    const [district, setDistrict] = useState(hostel?.district || '');
    const [upazila, setUpazila] = useState(hostel?.upazila || '');

    const [newFeature, setNewFeature] = useState('');
    const [activeFormats, setActiveFormats] = useState({
        bold: false,
        italic: false,
        underline: false,
        insertUnorderedList: false,
        insertOrderedList: false
    });
    const [isEditing, setIsEditing] = useState(!!editHostelId);
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [phoneError, setPhoneError] = useState('');

    const editorRef = React.useRef<HTMLDivElement>(null);

    // Initial effect for rich text editor content
    useEffect(() => {
        if (editorRef.current && hostel?.description) {
            editorRef.current.innerHTML = hostel.description;
        }
    }, [hostel?.description]); // Dependency on hostel.description to update if hostel changes

    const resetForm = () => {
        setName('');
        setPrice('');
        setContact('');
        setAddress('');
        setCoords(null);
        setMediaPreviews([]);
        setFeatures([]);
        setNewFeature('');
        if (editorRef.current) {
            editorRef.current.innerHTML = '';
        }
        setDescription(''); // Reset description state
        setCategory('Male');
        setDivision('');
        setDistrict('');
        setUpazila('');
        setIsEditing(false);
        setCurrentStep(1);
        setIsSubmitted(false);
        setPhoneError('');
    };

    // Removed the useEffect that was syncing state with editHostelId and hostels
    // The state is now initialized directly from the 'hostel' prop, and the parent component
    // should pass a unique 'key' prop to AddHostelModal to force remounting when editHostelId changes.

    const execCommand = (command: string, value: string | undefined = undefined) => {
        document.execCommand(command, false, value);
        if (editorRef.current) {
            setDescription(editorRef.current.innerHTML);
            editorRef.current.focus();
        }
        updateActiveFormats();
    };

    const updateActiveFormats = () => {
        setActiveFormats({
            bold: document.queryCommandState('bold'),
            italic: document.queryCommandState('italic'),
            underline: document.queryCommandState('underline'),
            insertUnorderedList: document.queryCommandState('insertUnorderedList'),
            insertOrderedList: document.queryCommandState('insertOrderedList'),
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key.toLowerCase()) {
                case 'b': e.preventDefault(); execCommand('bold'); break;
                case 'i': e.preventDefault(); execCommand('italic'); break;
                case 'u': e.preventDefault(); execCommand('underline'); break;
            }
        }
    };

    const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDivision(e.target.value);
        setDistrict('');
        setUpazila('');
    };

    const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDistrict(e.target.value);
        setUpazila('');
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setMediaPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeMedia = (index: number) => {
        setMediaPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const addFeature = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const trimmed = newFeature.trim();
        if (trimmed && !features.includes(trimmed)) {
            setFeatures(prev => [...prev, trimmed]);
            setNewFeature('');
        }
    };

    const removeFeature = (feature: string) => {
        setFeatures(prev => prev.filter(f => f !== feature));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentUser) return;

        // Phone Validation
        if (!isValidBangladeshiPhone(contact)) {
            alert('সঠিক বাংলাদেশী মোবাইল নাম্বার দিন (যেমন: 01XXXXXXXXX)');
            return;
        }

        // Construct full location string for display
        const fullLocation = `${address}, ${upazila || district}, ${district}`;

        if (isEditing && editHostelId) {
            const existingHostel = hostels.find(h => h.id === editHostelId);
            if (existingHostel) {
                updateHostel({
                    ...existingHostel,
                    name: name,
                    location: fullLocation,
                    contact: contact,
                    coordinates: coords || undefined,
                    price: Number(price),
                    gallery: mediaPreviews,
                    image: mediaPreviews.length > 0 ? mediaPreviews[0] : existingHostel.image,
                    category,
                    division,
                    district,
                    upazila,
                    features: features,
                    description: description,
                    status: 'pending'
                });
            }
        } else {
            const newId = Date.now();
            addHostel({
                id: newId,
                name: name,
                location: fullLocation,
                contact: contact,
                coordinates: coords || undefined,
                price: Number(price),
                description: description,
                rating: 0,
                totalRooms: 5,
                features: features,
                managerId: currentUser.id,
                rooms: [
                    { id: "A1", capacity: 4, occupied: [], price: Number(price) }
                ],
                gallery: mediaPreviews,
                image: mediaPreviews.length > 0 ? mediaPreviews[0] : "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                category,
                division,
                district,
                upazila,
                status: 'pending'
            });
        }
        setIsSubmitted(true);
    };

    const nextStep = () => {
        // Validation logic for steps
        if (currentStep === 1) {
            if (!name || !contact || !division || !district || !upazila) {
                alert('দয়া করে প্রথম ধাপের সকল তথ্য প্রদান করুন।');
                return;
            }
            if (!isValidBangladeshiPhone(contact)) {
                setPhoneError('সঠিক বাংলাদেশী মোবাইল নাম্বার দিন (যেমন: 01XXXXXXXXX)');
                return;
            }
        } else if (currentStep === 2) {
            const isDescEmpty = !description || description.trim() === '' || description === '<p><br></p>';
            if (!price || !address || isDescEmpty || !coords) {
                alert('দয়া করে দ্বিতীয় ধাপের সকল তথ্য (ভাড়া, ঠিকানা, বর্ণনা এবং ম্যাপ লোকেশন) প্রদান করুন।');
                return;
            }
        }
        setCurrentStep(prev => Math.min(prev + 1, 3));
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const availableDistricts = division && BANGLADESH_LOCATIONS[division] ? Object.keys(BANGLADESH_LOCATIONS[division]) : [];
    const availableUpazilas = division && district && BANGLADESH_LOCATIONS[division][district] ? BANGLADESH_LOCATIONS[division][district] : [];

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
            <Card className="w-full max-w-2xl relative bg-white max-h-[90vh] flex flex-col rounded-4xl overflow-hidden shadow-2xl border-none">
                {/* Close Button - Float high above everything */}
                <button
                    onClick={() => {
                        onClose();
                        if (isSubmitted) resetForm();
                    }}
                    className="absolute top-5 right-5 h-10 w-10 rounded-full bg-white/10 hover:bg-gray-100/50 flex items-center justify-center text-gray-500 transition-all z-50 shadow-md hover:scale-110 active:scale-95 border border-gray-100/20 backdrop-blur-xl"
                    aria-label="Close"
                >
                    <span className="text-xl font-bold">✕</span>
                </button>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {isSubmitted ? (
                        <div className="p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
                            <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center text-4xl mb-6">
                                ✅
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">অভিনন্দন!</h3>
                            <p className="text-lg text-gray-600 mb-8 max-w-sm">আপনার হোস্টেলটি <span className="font-bold text-amber-600">পেনন্ডিং অবস্থায় আছে</span>, ২৪ ঘণ্টার মধ্যে অ্যাক্টিভ করা হবে।</p>
                            <Button onClick={() => { onClose(); resetForm(); }} className="w-full max-w-[200px] h-12">
                                বন্ধ করুন
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 p-6 pb-4 border-b border-gray-100">
                                <h2 className="text-2xl font-bold mb-1 text-gray-800">{isEditing ? 'হোস্টেল তথ্য আপডেট' : 'নতুন হোস্টেল'}</h2>
                                <p className="text-gray-500 text-sm mb-4">আপনার নতুন প্রপার্টির তথ্য দিন</p>

                                {/* Step Indicator */}
                                <div className="flex items-center gap-2 mb-2">
                                    {[1, 2, 3].map((step) => (
                                        <React.Fragment key={step}>
                                            <div className={`h-2.5 flex-1 rounded-full transition-colors duration-300 ${currentStep >= step ? 'bg-primary-dip' : 'bg-gray-100'}`} />
                                        </React.Fragment>
                                    ))}
                                </div>
                                <div className="flex justify-between text-xs font-bold text-gray-400">
                                    <span className={currentStep >= 1 ? 'text-primary-dip' : ''}>১. বেসিক তথ্য</span>
                                    <span className={currentStep >= 2 ? 'text-primary-dip' : ''}>২. ঠিকানা ও ভাড়া</span>
                                    <span className={currentStep >= 3 ? 'text-primary-dip' : ''}>৩. সুবিধাদি ও রিভিউ</span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col md:px-6 p-6">

                                {/* STEP 1: Basic Info */}
                                {currentStep === 1 && (
                                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">হোস্টেলের নাম</label>
                                                <input
                                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-light outline-none transition-all"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    placeholder="e.g. রূপসী বাংলা ছাত্রাবাস"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">যোগাযোগ নাম্বার</label>
                                                <input
                                                    className={`w-full p-3 border ${phoneError ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-primaryLight'} rounded-xl focus:ring-2 outline-none transition-all`}
                                                    value={contact}
                                                    onChange={(e) => {
                                                        setContact(e.target.value);
                                                        if (phoneError) setPhoneError('');
                                                    }}
                                                    placeholder="e.g. 01712345678"
                                                    required
                                                />
                                                {phoneError && <p className="text-xs text-red-500 font-medium">{phoneError}</p>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">ক্যাটাগরি</label>
                                                <select
                                                    title='category'
                                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primaryLight outline-none transition-all bg-white"
                                                    value={category}
                                                    onChange={(e) => setCategory(e.target.value as 'Male' | 'Female')}
                                                    required
                                                >
                                                    <option value="Male">ছাত্র (Male)</option>
                                                    <option value="Female">ছাত্রী (Female)</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">বিভাগ</label>
                                                <select
                                                    title='division'
                                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primaryLight outline-none transition-all bg-white"
                                                    value={division}
                                                    onChange={handleDivisionChange}
                                                    required
                                                >
                                                    <option value="">নির্বাচন করুন</option>
                                                    {Object.keys(BANGLADESH_LOCATIONS).map(div => (
                                                        <option key={div} value={div}>{div}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">জেলা</label>
                                                <select
                                                    title='district'
                                                    className={`w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primaryLight outline-none transition-all bg-white ${!division ? 'bg-gray-50 text-gray-400' : ''}`}
                                                    value={district}
                                                    onChange={handleDistrictChange}
                                                    disabled={!division}
                                                    required
                                                >
                                                    <option value="">নির্বাচন করুন</option>
                                                    {availableDistricts.map(dist => (
                                                        <option key={dist} value={dist}>{dist}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">উপজেলা/থানা</label>
                                                <select
                                                    title='upazila'
                                                    className={`w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primaryLight outline-none transition-all bg-white ${!district ? 'bg-gray-50 text-gray-400' : ''}`}
                                                    value={upazila}
                                                    onChange={(e) => setUpazila(e.target.value)}
                                                    disabled={!district}
                                                    required
                                                >
                                                    <option value="">নির্বাচন করুন</option>
                                                    {availableUpazilas.map(upz => (
                                                        <option key={upz} value={upz}>{upz}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 2: Details & Pricing */}
                                {currentStep === 2 && (
                                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">সিট ভাড়া (মাসিক)</label>
                                            <input
                                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primaryLight outline-none transition-all"
                                                type="number"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                placeholder="e.g. 1000"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">বিস্তারিত ঠিকানা (Area/Road/House)</label>
                                            <input
                                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primaryLight outline-none transition-all"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                placeholder="e.g. আম্বরখানা মেইন রোড, হাউজ #১২"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">হোস্টেল বর্ণনা (Description)</label>

                                            <div className='w-full overflow-hidden'>
                                                {/* Toolbar for Rich Text Editor */}
                                                <div className='flex gap-1 mb-0 p-2 bg-gray-50 border border-gray-200 border-b-0 rounded-t-xl flex-wrap'>
                                                    {/* Bold Button */}
                                                    <button
                                                        type="button"
                                                        onClick={() => execCommand('bold')}
                                                        onMouseDown={(e) => e.preventDefault()}
                                                        className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${activeFormats.bold ? 'bg-bg-highlight text-primary-dip' : 'text-gray-600'}`}
                                                        title="Bold (Ctrl+B)"
                                                    >
                                                        <span className="font-bold">B</span>
                                                    </button>
                                                    {/* Italic Button */}
                                                    <button
                                                        type="button"
                                                        onClick={() => execCommand('italic')}
                                                        onMouseDown={(e) => e.preventDefault()}
                                                        className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${activeFormats.italic ? 'bg-bg-highlight text-primary-dip' : 'text-gray-600'}`}
                                                        title="Italic (Ctrl+I)"
                                                    >
                                                        <span className="italic">I</span>
                                                    </button>
                                                    {/* Underline Button */}
                                                    <button
                                                        type="button"
                                                        onClick={() => execCommand('underline')}
                                                        onMouseDown={(e) => e.preventDefault()}
                                                        className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${activeFormats.underline ? 'bg-bg-highlight text-primary-dip' : 'text-gray-600'}`}
                                                        title="Underline (Ctrl+U)"
                                                    >
                                                        <span className="underline">U</span>
                                                    </button>

                                                    <div className='w-px h-6 bg-gray-300 mx-1 self-center'></div>

                                                    {/* Unordered List Button */}
                                                    <button
                                                        type="button"
                                                        onClick={() => execCommand('insertUnorderedList')}
                                                        onMouseDown={(e) => e.preventDefault()}
                                                        className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${activeFormats.insertUnorderedList ? 'bg-bg-highlight text-primary-dip' : 'text-gray-600'}`}
                                                        title="Bullet List"
                                                    >
                                                        • List
                                                    </button>
                                                    {/* Ordered List Button */}
                                                    <button
                                                        type="button"
                                                        onClick={() => execCommand('insertOrderedList')}
                                                        onMouseDown={(e) => e.preventDefault()}
                                                        className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${activeFormats.insertOrderedList ? 'bg-bg-highlight text-primary-dip' : 'text-gray-600'}`}
                                                        title="Numbered List"
                                                    >
                                                        1. List
                                                    </button>

                                                    <div className='w-px h-6 bg-gray-300 mx-1 self-center'></div>

                                                    {/* Clear Formatting Button */}
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            execCommand('removeFormat');
                                                            execCommand('formatBlock', '<p>');
                                                        }}
                                                        className='p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors ml-auto text-xs font-bold'
                                                        title="Clear All Formatting"
                                                    >
                                                        মুছে ফেলুন
                                                    </button>
                                                </div>

                                                {/* Editable Content Area */}
                                                <div
                                                    ref={editorRef}
                                                    contentEditable
                                                    onInput={(e) => {
                                                        setDescription(e.currentTarget.innerHTML);
                                                        updateActiveFormats();
                                                    }}
                                                    onKeyDown={handleKeyDown}
                                                    onKeyUp={updateActiveFormats}
                                                    onClick={updateActiveFormats}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-b-xl min-h-[150px] focus:outline-none bg-white transition-all focus:ring-2 focus:ring-primaryLight/20 focus:border-primaryLight relative cursor-text text-gray-700 leading-relaxed text-[15px]"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">ম্যাপে লোকেশন চিহ্নিত করুন (Map Location)</label>
                                            <p className="text-xs text-gray-500 mb-2">সঠিক লোকেশন পেতে ম্যাপে ক্লিক করুন</p>
                                            <div className="h-[300px] w-full rounded-xl overflow-hidden border-2 border-gray-200">
                                                <MapPicker
                                                    onLocationSelect={(lat, lng) => setCoords({ lat, lng })}
                                                    initialLocation={coords || undefined}
                                                />
                                            </div>
                                            {coords && (
                                                <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                                                    <span>✓</span> লোকেশন সফলভাবে নির্বাচিত হয়েছে
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* STEP 3: Facilities & Media */}
                                {currentStep === 3 && (
                                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                        <div className="space-y-4 pt-2">
                                            <label className="text-sm font-medium text-gray-700">সুবিধাসমূহ (Features)</label>

                                            <div className="flex gap-2">
                                                <input
                                                    className="grow p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-light outline-none transition-all placeholder:text-gray-400"
                                                    value={newFeature}
                                                    onChange={(e) => setNewFeature(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            addFeature();
                                                        }
                                                    }}
                                                    placeholder="e.g. ফ্রি ওয়াইফাই"
                                                />
                                                <Button type="button" onClick={() => addFeature()} className="shrink-0 whitespace-nowrap px-6 py-3 h-[50px]">
                                                    যোগ করুন
                                                </Button>
                                            </div>

                                            {/* Quick Suggestions */}
                                            <div className="flex flex-wrap gap-2">
                                                {['Wifi', 'Generator', 'CCTV', 'Filter Water', 'Laundry', 'Meals'].map(suggestion => (
                                                    <button
                                                        key={suggestion}
                                                        type="button"
                                                        onClick={() => {
                                                            if (!features.includes(suggestion)) {
                                                                setFeatures(prev => [...prev, suggestion]);
                                                            }
                                                        }}
                                                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${features.includes(suggestion)
                                                            ? 'bg-primary-dip text-white border-primary-dip'
                                                            : 'bg-white text-gray-600 border-gray-200 hover:border-primary-extralight hover:text-primary-dip shadow-sm'
                                                            }`}
                                                    >
                                                        + {suggestion}
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Feature Tags Display */}
                                            {features.length > 0 && (
                                                <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-2xl border border-gray-100 min-h-[50px]">
                                                    {features.map(f => (
                                                        <div key={f} className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-xl text-sm font-bold text-gray-700 shadow-sm transition-all hover:border-red-200 hover:text-red-600 group animate-in zoom-in-95 duration-200">
                                                            <span>{f}</span>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeFeature(f)}
                                                                className="text-gray-400 group-hover:text-red-500 transition-colors"
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="img" className="text-sm font-medium text-gray-700">ছবি/ভিডিও আপলোড (Media)</label>
                                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                                                <input
                                                    id='img'
                                                    type="file"
                                                    multiple
                                                    accept="image/*,video/*"
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    onChange={handleFileChange}
                                                />
                                                <div className="flex flex-col items-center gap-2 text-gray-500">
                                                    <span className="text-2xl">📷</span>
                                                    <span className="text-sm">ছবি বা ভিডিও নির্বাচন করতে ক্লিক করুন</span>
                                                </div>
                                            </div>
                                            {mediaPreviews.length > 0 && (
                                                <div className="grid grid-cols-3 gap-2 mt-4">
                                                    {mediaPreviews.map((src, idx) => (
                                                        <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group shadow-sm bg-gray-100">
                                                            {src.includes('video') || src.endsWith('.mp4') ? (
                                                                <video src={src} className="w-full h-full object-cover" />
                                                            ) : (
                                                                <NextImage src={src} alt={`Preview ${idx}`} width={200} height={200} className="w-full h-full object-cover" />
                                                            )}
                                                            <button
                                                                type="button"
                                                                onClick={() => removeMedia(idx)}
                                                                className="absolute top-1 right-1 bg-red-500/80 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="pt-6 flex justify-between gap-3 border-t border-gray-100 mt-6 sticky bottom-0 bg-white/80 backdrop-blur-md pb-4">
                                    {currentStep > 1 ? (
                                        <Button type="button" variant="outline" onClick={prevStep} className="px-6">
                                            পূর্ববর্তী ধাপ
                                        </Button>
                                    ) : (
                                        <Button type="button" variant="outline" onClick={onClose} className="px-6 text-gray-500 border-gray-200 hover:bg-gray-50">
                                            বাতিল করুন
                                        </Button>
                                    )}

                                    {currentStep < 3 ? (
                                        <Button type="button" onClick={nextStep} className="px-8 bg-primary-dip hover:bg-primary-hover shadow-lg shadow-primary-dip/30 transition-all">
                                            পরবর্তী ধাপ
                                        </Button>
                                    ) : (
                                        <Button type="submit" className="px-8 bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/30 transition-all">
                                            {isEditing ? 'আপডেট করুন' : 'হোস্টেল যোগ করুন'}
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </Card>
        </div>
    );
}
