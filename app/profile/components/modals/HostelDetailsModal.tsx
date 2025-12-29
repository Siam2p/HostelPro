import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface HostelDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    hostel: any;
    booking: any;
}

export function HostelDetailsModal({ isOpen, onClose, hostel, booking }: HostelDetailsModalProps) {
    if (!isOpen || !hostel) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <Card className="w-full max-w-2xl p-0 rounded-4xl shadow-3xl animate-in zoom-in-95 duration-300 overflow-hidden border-none text-left">
                <div className="relative h-56">
                    <img src={hostel.image} alt={hostel.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                        <div>
                            <Badge className="bg-blue-500 text-white border-none mb-2 px-3 py-1 font-black text-[10px] uppercase tracking-widest">বর্তমানে বরাদ্দকৃত</Badge>
                            <h3 className="text-3xl font-black text-white tracking-tight">{hostel.name}</h3>
                        </div>
                    </div>
                </div>

                <div className="p-8 bg-white max-h-[60vh] overflow-y-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 pb-8 border-b border-gray-100">
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">রুম নম্বর</p>
                            <p className="text-2xl font-black text-blue-600">রুম {booking.roomId}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">বেড নম্বর</p>
                            <p className="text-2xl font-black text-indigo-600">বেড {booking.bedId}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">ভাড়ার পরিমাণ</p>
                            <p className="text-xl font-black text-gray-800">৳{hostel.price} <span className="text-xs font-bold text-gray-400">/মাস</span></p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">ক্যাটেগরি</p>
                            <Badge className="bg-purple-100 text-purple-700 border-none font-black text-[10px] uppercase">
                                {hostel.category === 'Male' ? 'পুরুষ (MALE)' : 'মহিলা (FEMALE)'}
                            </Badge>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                                সুযোগ-সুবিধা
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {(hostel.facilities || hostel.features || ['Free WiFi', 'CCTV', 'Meals', 'Security']).map((f: string, i: number) => (
                                    <span key={i} className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-[10px] font-black border border-gray-100 uppercase tracking-wider">{f}</span>
                                ))}
                            </div>
                        </div>

                        {hostel.gallery && hostel.gallery.length > 0 && (
                            <div>
                                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-pink-500"></span>
                                    গ্যালারি
                                </h4>
                                <div className="grid grid-cols-3 gap-2">
                                    {hostel.gallery.slice(0, 3).map((imgUrl: string, i: number) => (
                                        <img key={i} src={imgUrl} className="h-20 w-full object-cover rounded-xl border border-gray-100 shadow-xs" alt={`gallery-${i}`} />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div>
                            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                                যোগাযোগ ও ঠিকানা
                            </h4>
                            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                    <span className="block font-bold text-gray-900 mb-1">{hostel.location}</span>
                                    {hostel.address || `${hostel.upazila}, ${hostel.district}, ${hostel.division}`}<br />
                                </p>
                                <div className="mt-3 pt-3 border-t border-gray-200/50 flex flex-col gap-1">
                                    <p className="text-xs text-gray-400">ম্যানেজার: <span className="font-bold text-gray-700">{hostel.managerName || 'সিস্টেম অ্যাডমিন'}</span></p>
                                    <p className="text-xs text-gray-400">ফোন: <span className="font-bold text-gray-700">{hostel.contact || '০১৬XXXXXXXX'}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 bg-gray-50 flex justify-end">
                    <Button onClick={onClose} className="px-10 rounded-2xl h-12 font-black shadow-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 transition-all uppercase tracking-widest text-xs">বন্ধ করুন</Button>
                </div>
            </Card>
        </div>
    );
}
