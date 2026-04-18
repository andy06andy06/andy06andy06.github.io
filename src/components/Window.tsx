'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Minus } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface WindowProps {
    id: string;
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    isActive: boolean;
    onClose: (id: string) => void;
    onBringToFront: (id: string) => void;
    headerColor?: string;
    className?: string;
    defaultPosition?: { x: number; y: number };
}

export default function Window({
    id,
    title,
    children,
    isOpen,
    isActive,
    onClose,
    onBringToFront,
    headerColor = '#fde047', // Default to yellow
    className,
    defaultPosition = { x: 50, y: 50 }
}: WindowProps) {
    const windowRef = useRef<HTMLDivElement>(null);

    if (!isOpen) return null;

    return (
        <motion.div
            ref={windowRef}
            drag
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onPointerDown={() => onBringToFront(id)}
            className={twMerge(
                clsx(
                    "absolute flex flex-col bg-white border-4 border-black rounded-lg overflow-hidden",
                    isActive ? "shadow-[12px_12px_0_0_#000] z-40" : "shadow-[6px_6px_0_0_#000] z-30 opacity-95",
                    className
                )
            )}
            style={{
                left: defaultPosition.x,
                top: defaultPosition.y,
                minWidth: '350px',
                minHeight: '200px',
            }}
        >
            {/* Title Bar */}
            <div
                className="flex items-center justify-between px-3 py-2 border-b-4 border-black cursor-grab active:cursor-grabbing"
                style={{ backgroundColor: headerColor }}
            >
                <div className="flex items-center gap-2">
                    {/* Decorative lines like in retro OS */}
                    <div className="flex flex-col gap-1 w-6">
                        <div className="h-0.5 bg-black w-full" />
                        <div className="h-0.5 bg-black w-full" />
                        <div className="h-0.5 bg-black w-full" />
                    </div>
                    <span className="font-bold tracking-tight text-black">{title}</span>
                </div>

                <div className="flex items-center gap-2">
                    {/* Minimize Button (Decorative) */}
                    <button
                        className="w-6 h-6 flex items-center justify-center bg-white border-2 border-black border-b-[3px] border-r-[3px] active:border-b-2 active:border-r-2 active:translate-y-[1px] active:translate-x-[1px]"
                    >
                        <Minus size={14} className="text-black" />
                    </button>
                    {/* Close Button */}
                    <button
                        className="w-6 h-6 flex items-center justify-center bg-white border-2 border-black border-b-[3px] border-r-[3px] active:border-b-2 active:border-r-2 active:translate-y-[1px] active:translate-x-[1px]"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose(id);
                        }}
                        onPointerDown={(e) => e.stopPropagation()}
                    >
                        <X size={14} className="text-black" />
                    </button>
                </div>
            </div>

            {/* Window Content */}
            <div className="flex-1 overflow-auto p-4 cursor-auto bg-white" onPointerDown={(e) => e.stopPropagation()}>
                {children}
            </div>
        </motion.div>
    );
}
