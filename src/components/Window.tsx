'use client';

import React, { useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { X, Minus } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface WindowProps {
    id: string;
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    isActive: boolean;
    isMinimized: boolean;
    onClose: (id: string) => void;
    onMinimize: (id: string) => void;
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
    isMinimized,
    onClose,
    onMinimize,
    onBringToFront,
    headerColor = '#fde047', // Default to yellow
    className,
    defaultPosition = { x: 50, y: 50 }
}: WindowProps) {
    const windowRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = React.useState(defaultPosition);
    const [customSize, setCustomSize] = React.useState<{ width: number; height: number } | null>(null);
    const dragControls = useDragControls();

    const handleResizeStart = (e: React.PointerEvent, direction: 'e' | 's' | 'se') => {
        e.stopPropagation();
        e.preventDefault();
        if (isMinimized) return;

        const startX = e.clientX;
        const startY = e.clientY;
        const rect = windowRef.current?.getBoundingClientRect();
        if (!rect) return;
        
        const startWidth = rect.width;
        const startHeight = rect.height;

        const onPointerMove = (moveEvent: PointerEvent) => {
            let newWidth = startWidth;
            let newHeight = startHeight;

            if (direction === 'e' || direction === 'se') {
                newWidth = startWidth + (moveEvent.clientX - startX);
            }
            if (direction === 's' || direction === 'se') {
                newHeight = startHeight + (moveEvent.clientY - startY);
            }

            setCustomSize({
                width: Math.max(300, newWidth),
                height: Math.max(200, newHeight)
            });
        };

        const onPointerUp = () => {
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
        };

        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
    };

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                const isMobile = window.innerWidth < 768;
                if (isMobile) {
                    setPosition({ x: 16, y: 16 });
                } else {
                    setPosition(defaultPosition);
                }
            };
            
            // Set initially
            handleResize();
            
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [defaultPosition.x, defaultPosition.y]);

    if (!isOpen) return null;

    return (
        <motion.div
            ref={windowRef}
            drag={!isMinimized}
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
                isMinimized 
                ? { opacity: 0, scale: 0.8, y: 100, transition: { duration: 0.2 } } 
                : { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', bounce: 0, duration: 0.3 } }
            }
            exit={{ opacity: 0, scale: 0.95 }}
            onPointerDown={() => {
                if (!isMinimized) onBringToFront(id);
            }}
            className={twMerge(
                clsx(
                    "absolute flex flex-col bg-white border-4 border-black rounded-lg overflow-hidden",
                    isActive ? "shadow-[12px_12px_0_0_#000] z-40" : "shadow-[6px_6px_0_0_#000] z-30 opacity-95",
                    "max-w-[calc(100vw-32px)] max-h-[calc(100vh-120px)]",
                    isMinimized && "pointer-events-none",
                    className
                )
            )}
            style={{
                left: position.x,
                top: position.y,
                minWidth: 'min(300px, 90vw)',
                minHeight: 'min(200px, 50vh)',
                ...(customSize && { width: customSize.width, height: customSize.height }),
            }}
        >
            {/* Title Bar */}
            <div
                className="flex items-center justify-between px-3 py-2 border-b-4 border-black cursor-grab active:cursor-grabbing select-none"
                style={{ backgroundColor: headerColor, touchAction: "none" }}
                onPointerDown={(e) => {
                    if (!isMinimized) {
                        onBringToFront(id);
                        dragControls.start(e);
                    }
                }}
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
                        onClick={(e) => {
                            e.stopPropagation();
                            onMinimize(id);
                        }}
                        onPointerDown={(e) => e.stopPropagation()}
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
            <div 
                className="flex-1 overflow-auto p-4 cursor-auto bg-white relative z-0" 
                onPointerDown={(e) => {
                    if (!isMinimized) onBringToFront(id);
                    e.stopPropagation();
                }}
            >
                {children}
            </div>

            {/* Resize Handles */}
            {!isMinimized && (
                <>
                    {/* Right edge */}
                    <div 
                        className="absolute top-0 right-0 w-2 h-full cursor-e-resize z-50 touch-none"
                        onPointerDown={(e) => handleResizeStart(e, 'e')}
                    />
                    {/* Bottom edge */}
                    <div 
                        className="absolute bottom-0 left-0 w-full h-2 cursor-s-resize z-50 touch-none"
                        onPointerDown={(e) => handleResizeStart(e, 's')}
                    />
                    {/* Bottom-Right corner */}
                    <div 
                        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50 touch-none"
                        onPointerDown={(e) => handleResizeStart(e, 'se')}
                    />
                </>
            )}
        </motion.div>
    );
}
