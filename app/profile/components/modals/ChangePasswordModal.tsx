import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AuthInput } from '@/components/ui/AuthInput';

interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (current: string, newP: string) => Promise<boolean>;
}

export function ChangePasswordModal({ isOpen, onClose, onConfirm }: ChangePasswordModalProps) {
    const [currentP, setCurrentP] = useState('');
    const [newP, setNewP] = useState('');
    const [confirmP, setConfirmP] = useState('');
    const [error, setError] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        setError('');
        if (!currentP || !newP || !confirmP) {
            setError('সব ঘর পূরণ করা প্রয়োজন');
            return;
        }
        if (newP !== confirmP) {
            setError('নতুন পাসওয়ার্ডগুলো মিলছে না');
            return;
        }
        if (newP.length < 3) {
            setError('পাসওয়ার্ড অন্তত ৩ অক্ষরের হতে হবে');
            return;
        }

        setIsSaving(true);
        const success = await onConfirm(currentP, newP);
        setIsSaving(false);
        if (success) {
            onClose();
        } else {
            setError('বর্তমান পাসওয়ার্ডটি সঠিক নয়');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <Card className="w-full max-w-sm p-8 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">পাসওয়ার্ড পরিবর্তন</h3>

                <div className="space-y-4">
                    <AuthInput label="বর্তমান পাসওয়ার্ড" id="curr-p" type="password" value={currentP} onChange={(e) => setCurrentP(e.target.value)} />
                    <AuthInput label="নতুন পাসওয়ার্ড" id="new-p" type="password" value={newP} onChange={(e) => setNewP(e.target.value)} />
                    <AuthInput label="নতুন পাসওয়ার্ড নিশ্চিত করুন" id="conf-p" type="password" value={confirmP} onChange={(e) => setConfirmP(e.target.value)} error={error} />

                    <div className="flex gap-3 pt-4">
                        <Button variant="outline" onClick={onClose} className="flex-1 rounded-xl">বাতিল</Button>
                        <Button onClick={handleSubmit} disabled={isSaving} className="flex-1 rounded-xl">
                            {isSaving ? 'আপডেট হচ্ছে...' : 'আপডেট করুন'}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
