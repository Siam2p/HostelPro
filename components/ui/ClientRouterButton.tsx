"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

interface ClientRouterButtonProps {
    href: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    fullWidth?: boolean;
    children: React.ReactNode;
    className?: string;
}

export const ClientRouterButton: React.FC<ClientRouterButtonProps> = ({
    href,
    variant = 'primary',
    fullWidth = false,
    children,
    className = ''
}) => {
    const router = useRouter();

    return (
        <Button
            variant={variant!}
            onClick={() => router.push(href)}
            fullWidth={fullWidth}
            className={className}
        >
            {children}
        </Button>
    );
};
