import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DesktopIconProps {
    id: string;
    name: string;
    icon: LucideIcon;
    color: string;
    onDoubleClick: (id: string) => void;
}

export default function DesktopIcon({ id, name, icon: Icon, color, onDoubleClick }: DesktopIconProps) {
    return (
        <div
            className="flex flex-col items-center justify-center w-24 h-24 gap-2 cursor-pointer group hover:bg-black/5 active:bg-black/10 rounded-xl transition-colors p-2"
            onDoubleClick={() => onDoubleClick(id)}
            // For mobile devices, a single click could also open it
            onClick={(e) => {
                // Simple heuristic: if it's a touch device or we want easier access, fallback to single click
                // Could also implement a custom hook for double-click vs single touch.
                if (window.matchMedia('(hover: none)').matches) {
                    onDoubleClick(id);
                }
            }}
        >
            <div
                className="w-12 h-12 flex items-center justify-center border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] group-hover:shadow-[2px_2px_0_0_#000] group-hover:translate-1 group-active:shadow-none group-active:translate-x-[4px] group-active:translate-y-[4px] bg-white transition-all duration-100"
                style={{ borderColor: color, backgroundColor: '#fff' }}
            >
                <Icon size={28} style={{ color: color }} />
            </div>
            <span className="text-sm font-bold tracking-tight text-center px-1 bg-white/80 border border-transparent group-hover:border-black rounded px-2">
                {name}
            </span>
        </div>
    );
}
