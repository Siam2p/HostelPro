import React, { useState, useEffect } from 'react';
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
    isOpen: boolean;
    onClose: () => void;
    editHostelId: number | null;
}

export default function AddHostelModal({ isOpen, onClose, editHostelId }: AddHostelModalProps) {
    const { currentUser } = useAuth();
    const { addHostel, updateHostel, hostels } = useData();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState(''); // Specific address line
    const [coords, setCoords] = useState<{ lat: number, lng: number } | null>(null);
    const [mediaPreviews, setMediaPreviews] = useState<string[]>([]);
    const [features, setFeatures] = useState<string[]>([]);
    const [newFeature, setNewFeature] = useState('');
    const [description, setDescription] = useState('');
    const [activeFormats, setActiveFormats] = useState({
        bold: false,
        italic: false,
        underline: false,
        insertUnorderedList: false,
        insertOrderedList: false
    });
    const [isEditing, setIsEditing] = useState(false);

    const editorRef = React.useRef<HTMLDivElement>(null);

    // New Fields
    const [category, setCategory] = useState<'Male' | 'Female'>('Male');
    const [division, setDivision] = useState('');
    const [district, setDistrict] = useState('');
    const [upazila, setUpazila] = useState('');

    useEffect(() => {
        if (editHostelId) {
            const hostel = hostels.find(h => h.id === editHostelId);
            if (hostel) {
                setName(hostel.name);
                setPrice(String(hostel.price));
                setContact(hostel.contact || '');
                setAddress(hostel.location); // Mapping 'location' to specific address input for now
                setCoords(hostel.coordinates || null);
                setMediaPreviews(hostel.gallery || (hostel.image ? [hostel.image] : []));
                setFeatures(hostel.features || []);
                setDescription(hostel.description || '');
                if (editorRef.current) {
                    editorRef.current.innerHTML = hostel.description || '';
                }

                // Set new fields if they exist
                if (hostel.category) setCategory(hostel.category);
                if (hostel.division) setDivision(hostel.division);
                if (hostel.district) setDistrict(hostel.district);
                if (hostel.upazila) setUpazila(hostel.upazila);

                setIsEditing(true);
            }
        } else {
            resetForm();
        }
    }, [editHostelId, hostels, isOpen]);

    const resetForm = () => {
        setName('');
        setPrice('');
        setContact('');
        setAddress('');
        setCoords(null);
        setMediaPreviews([]);
        setFeatures([]);
        setNewFeature('');
        setDescription('');
        if (editorRef.current) {
            editorRef.current.innerHTML = '';
        }
        setCategory('Male');
        setDivision('');
        setDistrict('');
        setUpazila('');
        setIsEditing(false);
    };

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
        onClose();
        resetForm();
    };

    const availableDistricts = division && BANGLADESH_LOCATIONS[division] ? Object.keys(BANGLADESH_LOCATIONS[division]) : [];
    const availableUpazilas = division && district && BANGLADESH_LOCATIONS[division][district] ? BANGLADESH_LOCATIONS[division][district] : [];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <Card className="w-full max-w-2xl relative bg-white max-h-[90vh] overflow-y-auto m-4">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
                >
                    ✕
                </button>
                <h2 className="text-2xl font-bold mb-1 text-gray-800 p-6 pb-0">{isEditing ? 'হোস্টেল তথ্য আপডেট' : 'নতুন হোস্টেল'}</h2>
                <p className="text-gray-500 px-6 text-sm mb-6">আপনার নতুন প্রপার্টির তথ্য দিন</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">হোস্টেলের নাম</label>
                            <input
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. রূপসী বাংলা ছাত্রাবাস"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">সিট ভাড়া (মাসিক)</label>
                            <input
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="e.g. 1000"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">ক্যাটাগরি</label>
                            <select
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white"
                                value={category}
                                onChange={(e) => setCategory(e.target.value as 'Male' | 'Female')}
                                required
                            >
                                <option value="Male">ছাত্র (Male)</option>
                                <option value="Female">ছাত্রী (Female)</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">যোগাযোগ নাম্বার</label>
                            <input
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                placeholder="e.g. 01712345678"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">বিভাগ</label>
                            <select
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white"
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
                                className={`w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white ${!division ? 'bg-gray-50 text-gray-400' : ''}`}
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
                                className={`w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white ${!district ? 'bg-gray-50 text-gray-400' : ''}`}
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
                                    className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${activeFormats.bold ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                                    title="Bold (Ctrl+B)"
                                >
                                    <span className="font-bold">B</span>
                                </button>
                                {/* Italic Button */}
                                <button
                                    type="button"
                                    onClick={() => execCommand('italic')}
                                    onMouseDown={(e) => e.preventDefault()}
                                    className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${activeFormats.italic ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                                    title="Italic (Ctrl+I)"
                                >
                                    <span className="italic">I</span>
                                </button>
                                {/* Underline Button */}
                                <button
                                    type="button"
                                    onClick={() => execCommand('underline')}
                                    onMouseDown={(e) => e.preventDefault()}
                                    className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${activeFormats.underline ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
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
                                    className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${activeFormats.insertUnorderedList ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                                    title="Bullet List"
                                >
                                    • List
                                </button>
                                {/* Ordered List Button */}
                                <button
                                    type="button"
                                    onClick={() => execCommand('insertOrderedList')}
                                    onMouseDown={(e) => e.preventDefault()}
                                    className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${activeFormats.insertOrderedList ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
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
                                className="w-full px-4 py-3 border border-gray-200 rounded-b-xl min-h-[150px] focus:outline-none bg-white transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 relative cursor-text text-gray-700 leading-relaxed text-[15px]"
                                data-placeholder="হোস্টেল সম্পর্কে লিখুন..."
                            />
                            {description.length === 0 && (
                                <div className="absolute top-[calc(100%+8px)] left-0 text-gray-300 pointer-events-none select-none text-sm px-4">
                                    {/* Placeholder logic handles via description state check usually, but for contentEditable it's tricky without a real placeholder attribute support. I'll rely on the label above. */}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">বিস্তারিত ঠিকানা (Area/Road/House)</label>
                        <input
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="e.g. আম্বরখানা মেইন রোড, হাউজ #১২"
                            required
                        />
                    </div>

                    <div className="space-y-4 pt-2">
                        <label className="text-sm font-medium text-gray-700">সুবিধাসমূহ (Features)</label>

                        <div className="flex gap-2">
                            <input
                                className="grow p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                value={newFeature}
                                onChange={(e) => setNewFeature(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && addFeature(e)}
                                placeholder="e.g. ফ্রি ওয়াইফাই"
                            />
                            <Button type="button" onClick={() => addFeature()} className="shrink-0 h-[48px] px-6">
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
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600 shadow-sm'
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
                        <label className="text-sm font-medium text-gray-700">ছবি/ভিডিও আপলোড (Media)</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                            <input
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
                                            <img src={src} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
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

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">ম্যাপ লোকেশন</label>
                        <div className="h-[300px] w-full rounded-xl overflow-hidden border border-gray-200">
                            <MapPicker
                                onLocationSelect={(lat, lng) => setCoords({ lat, lng })}
                                initialLocation={coords || undefined}
                            />
                        </div>
                        <p className="text-xs text-gray-500">* ম্যাপে ক্লিক করে সঠিক লোকেশন সেট করুন</p>
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            বাতিল
                        </Button>
                        <Button type="submit">
                            {isEditing ? 'আপডেট করুন' : 'হোস্টেল যোগ করুন'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
