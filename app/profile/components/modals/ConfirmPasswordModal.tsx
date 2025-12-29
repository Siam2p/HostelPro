import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AuthInput } from '@/components/ui/AuthInput';

interface ConfirmPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (password: string) => void;
    isSaving: boolean;
}

export function ConfirmPasswordModal({ isOpen, onClose, onConfirm, isSaving }: ConfirmPasswordModalProps) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <Card className="w-full max-w-md p-8 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">পরিচয় নিশ্চিত করুন</h3>
                <p className="text-gray-500 mb-6 text-sm">পরিবর্তনগুলো সেভ করতে আপনার বর্তমান পাসওয়ার্ডটি প্রদান করুন।</p>

                <div className="space-y-4">
                    <AuthInput
                        label="পাসওয়ার্ড"
                        id="confirm-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={error}
                        autoFocus
                    />

                    <div className="flex gap-3 pt-2">
                        <Button variant="outline" onClick={onClose} className="flex-1 rounded-xl h-12">বাতিল</Button>
                        <Button
                            onClick={() => {
                                if (!password) {
                                    setError('পাসওয়ার্ড প্রয়োজন');
                                    return;
                                }
                                onConfirm(password);
                            }}
                            disabled={isSaving}
                            className="flex-1 rounded-xl h-12"
                        >
                            {isSaving ? 'যাচাই করা হচ্ছে...' : 'নিশ্চিত করুন'}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
