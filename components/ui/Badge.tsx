import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'success' | 'warning' | 'danger' | 'default' | 'outline';
    className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
    const variants = {
        success: "bg-green-100 text-success",
        warning: "bg-yellow-100 text-warning",
        danger: "bg-red-100 text-danger",
        default: "bg-gray-100 text-text-muted",
        outline: "bg-transparent text-text-muted border border-slate-200"
    };

    return (
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
}
