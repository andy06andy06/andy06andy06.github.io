'use client';

import { useState, useEffect } from 'react';
import { Wifi, Battery, Volume2, Search, Menu } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface TaskbarProps {
    apps: Array<{ id: string; name: string; icon: React.ElementType; color: string }>;
    openWindows: string[];
    activeWindow: string | null;
    minimizedWindows: string[];
    onWindowClick: (id: string) => void;
    onStartClick: () => void;
}

export default function Taskbar({
    apps,
    openWindows,
    activeWindow,
    minimizedWindows,
    onWindowClick,
    onStartClick
}: TaskbarProps) {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute bottom-0 left-0 w-full h-12 bg-white border-t-4 border-black flex items-center justify-between px-2 z-50 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 h-full py-1">
                {/* Start Button */}
                <button 
                    onClick={onStartClick}
                    className="h-full px-4 bg-[var(--primary-yellow)] border-2 border-black border-b-[4px] border-r-[4px] font-bold active:border-b-2 active:border-r-2 active:translate-y-[2px] active:translate-x-[2px] transition-all flex items-center gap-2 shrink-0"
                >
                    <Menu size={16} />
                    <span>START</span>
                </button>
                {/* Separator */}
                <div className="w-0.5 h-8 bg-black/20 mx-1 shrink-0"></div>
                
                {/* Open Windows */}
                <div className="flex items-center gap-2 h-full">
                    {openWindows.map((windowId) => {
                        const app = apps.find(a => a.id === windowId);
                        if (!app) return null;
                        const Icon = app.icon;
                        const isActive = activeWindow === windowId;
                        const isMinimized = minimizedWindows.includes(windowId);

                        return (
                            <button
                                key={windowId}
                                onClick={() => onWindowClick(windowId)}
                                className={twMerge(
                                    clsx(
                                        "h-full px-3 flex items-center gap-2 border-2 border-black font-bold text-sm min-w-[120px] max-w-[160px] truncate shrink-0 transition-all",
                                        isActive && !isMinimized
                                            ? "bg-gray-200 border-t-[3px] border-l-[3px] translate-y-[1px] translate-x-[1px]"
                                            : "bg-white border-b-[3px] border-r-[3px] hover:bg-gray-50 active:border-b-2 active:border-r-2 active:translate-y-[1px] active:translate-x-[1px]"
                                    )
                                )}
                            >
                                <Icon size={14} className="shrink-0" style={{ color: app.color }} />
                                <span className="truncate">{app.name}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="flex items-center gap-4 h-full pr-2 shrink-0">
                <div className="hidden md:flex items-center gap-3">
                    <Wifi size={16} className="text-black" />
                    <Volume2 size={16} className="text-black" />
                    <Battery size={16} className="text-black" />
                </div>
                <div className="font-bold border-l-2 border-black/20 pl-4 h-8 flex items-center">
                    {time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '••:••'}
                </div>
            </div>
        </div>
    );
}
