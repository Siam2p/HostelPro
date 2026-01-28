"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useData } from '@/context/DataContext';
import { User } from '@/lib/types';

export default function UsersSection() {
    const { users, deleteUser, updateUser } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'manager' | 'user'>('all');

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const handleToggleBlock = (user: User) => {
        const newStatus = user.status === 'blocked' ? 'active' : 'blocked';
        updateUser({ ...user, status: newStatus });
    };

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-700">
            <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">ব্যবহারকারী ব্যবস্থাপনা</h2>
                    <p className="text-slate-500 font-medium">সিস্টেমের ব্যবহারকারী নিয়ন্ত্রণ করুন এবং প্রয়োজনে অ্যাক্সেস বন্ধ করুন।</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="নাম বা ইমেইল দিয়ে খুঁজুন..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-80 h-12 pl-12 pr-6 rounded-2xl bg-white border border-slate-200 focus:border-primary-light focus:ring-4 focus:ring-primary-light/10 outline-none transition-all font-medium text-sm"
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                    </div>
                    <select
                        title='userRole'
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value as 'all' | 'admin' | 'manager' | 'user')}
                        className="h-12 px-3 rounded-2xl bg-white border border-slate-200 focus:border-primary-light outline-none transition-all font-bold text-sm text-slate-700"
                    >
                        <option value="all">সব রোল</option>
                        <option value="admin">অ্যাডমিন</option>
                        <option value="manager">ম্যানেজার</option>
                        <option value="user">ইউজার</option>
                    </select>
                </div>
            </header>

            <Card className="border-none shadow-2xl shadow-slate-200/60 rounded-[2.5rem] bg-white overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="p-6 font-black text-slate-400 uppercase tracking-widest text-[10px]">ID & নাম</th>
                                <th className="p-6 font-black text-slate-400 uppercase tracking-widest text-[10px]">যোগাযোগ</th>
                                <th className="p-6 font-black text-slate-400 uppercase tracking-widest text-[10px]">রোল ও স্ট্যাটাস</th>
                                <th className="p-6 font-black text-slate-400 uppercase tracking-widest text-[10px]">অ্যাকশনসমূহ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredUsers.map(user => (
                                <tr key={user.id} className="hover:bg-slate-50/30 transition-colors group">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-2xl bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-600 font-black text-lg group-hover:from-primary-dip group-hover:to-primary-dipto group-hover:text-white transition-all duration-300">
                                                {user.name[0]}
                                            </div>
                                            <div>
                                                <p className={`font-black text-sm ${user.status === 'blocked' ? 'text-rose-500 line-through' : 'text-slate-900'}`}>{user.name}</p>
                                                <p className="text-[10px] text-slate-400 font-bold">UID: #{user.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <p className="text-sm font-bold text-slate-700">{user.email}</p>
                                        <p className="text-xs text-slate-400 font-medium">{user.phone || 'মোবাইল নেই'}</p>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex flex-col gap-1.5">
                                            <Badge variant={
                                                user.role === 'admin' ? 'success' :
                                                    user.role === 'manager' ? 'warning' : 'default'
                                            } className="w-fit px-3 py-1 rounded-lg font-black tracking-wider uppercase text-[9px]">
                                                {user.role}
                                            </Badge>
                                            {user.status === 'blocked' && (
                                                <Badge variant="danger" className="w-fit px-3 py-1 rounded-lg font-black tracking-wider uppercase text-[9px]">
                                                    Blocked
                                                </Badge>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-2">
                                            {user.role !== 'admin' && (
                                                <button
                                                    onClick={() => handleToggleBlock(user)}
                                                    className={`p-2.5 rounded-xl transition-all duration-300 ${user.status === 'blocked'
                                                        ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white'
                                                        : 'bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white'
                                                        }`}
                                                    title={user.status === 'blocked' ? 'Unblock User' : 'Block User'}
                                                >
                                                    {user.status === 'blocked' ? '🔓' : '🚫'}
                                                </button>
                                            )}

                                            <button
                                                onClick={() => {
                                                    if (confirm('আপনি কি নিশ্চিত যে এই ইউজারকে মুছে ফেলতে চান?')) {
                                                        deleteUser(user.id);
                                                    }
                                                }}
                                                className="p-2.5 rounded-xl bg-slate-100 text-slate-400 hover:bg-rose-600 hover:text-white transition-all duration-300"
                                                title="Delete User"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredUsers.length === 0 && (
                    <div className="p-20 text-center">
                        <div className="text-5xl mb-4 text-slate-200">📭</div>
                        <h4 className="text-xl font-black text-slate-900 mb-2">কোনো ব্যবহারকারী পাওয়া যায়নি</h4>
                        <p className="text-slate-400 font-medium">অনুগ্রহ করে আপনার সার্চ ফিল্টার যাচাই করুন।</p>
                    </div>
                )}
            </Card>
        </div>
    );
}
