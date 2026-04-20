import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DesktopIconProps {
    id: string;
    name: string;
    icon: LucideIcon;
    color: string;
    onClick: (id: string) => void;
}

export default function DesktopIcon({ id, name, icon: Icon, color, onClick }: DesktopIconProps) {
    return (
        <div
            className="flex flex-col items-center justify-center w-28 h-28 gap-2 cursor-pointer group hover:bg-black/5 active:bg-black/10 rounded-xl transition-colors p-2"
            onClick={() => onClick(id)}
        >
            <div
                className="w-14 h-14 flex items-center justify-center border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] group-hover:shadow-[2px_2px_0_0_#000] group-hover:translate-1 group-active:shadow-none group-active:translate-x-[4px] group-active:translate-y-[4px] bg-white transition-all duration-100"
                style={{ borderColor: color, backgroundColor: '#fff' }}
            >
                <Icon size={32} style={{ color: color }} />
            </div>
            <span className="text-[15px] font-bold tracking-tight text-center px-2 bg-white/80 border border-transparent group-hover:border-black rounded">
                {name}
            </span>
        </div>
    );
}
