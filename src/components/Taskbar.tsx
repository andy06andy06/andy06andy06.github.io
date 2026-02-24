'use client';

import { useState, useEffect } from 'react';
import { Wifi, Battery, Volume2, Search, Menu } from 'lucide-react';

export default function Taskbar() {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute bottom-0 left-0 w-full h-12 bg-white border-t-4 border-black flex items-center justify-between px-2 z-50">
            <div className="flex items-center gap-2 h-full">
                {/* Start Button */}
                <button className="h-8 px-4 bg-[var(--primary-yellow)] border-2 border-black border-b-[4px] border-r-[4px] font-bold active:border-b-2 active:border-r-2 active:translate-y-[2px] active:translate-x-[2px] transition-all flex items-center gap-2">
                    <Menu size={16} />
                    <span>START</span>
                </button>
                {/* Separator */}
                <div className="w-0.5 h-8 bg-black/20 mx-1"></div>
                {/* Search */}
                <button className="h-8 w-8 flex items-center justify-center bg-gray-100 border-2 border-black border-b-[3px] border-r-[3px] active:border-b-2 active:border-r-2 active:translate-y-[1px] active:translate-x-[1px]">
                    <Search size={16} />
                </button>
            </div>

            <div className="flex items-center gap-4 h-full pr-2">
                <div className="flex items-center gap-3">
                    <Wifi size={16} className="text-black" />
                    <Volume2 size={16} className="text-black" />
                    <Battery size={16} className="text-black" />
                </div>
                <div className="font-bold border-l-2 border-black/20 pl-4">
                    {time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '••:••'}
                </div>
            </div>
        </div>
    );
}
