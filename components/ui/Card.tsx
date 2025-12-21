import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export function Card({ children, className = '', hoverEffect = true }: CardProps) {
    const hoverStyles = hoverEffect
        ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary"
        : "";

    return (
        <div className={`bg-bg-card rounded-2xl p-6 shadow-sm border border-border ${hoverStyles} ${className}`}>
            {children}
        </div>
    );
}
