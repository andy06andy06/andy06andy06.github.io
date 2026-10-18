import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DesktopIconProps {
    id: string;
    name: string;
    subtitle: string;
    icon: LucideIcon;
    color: string;
    onClick: (id: string, el: HTMLElement) => void;
}

export default function DesktopIcon({ id, name, subtitle, icon: Icon, color, onClick }: DesktopIconProps) {
    return (
        <button
            type="button"
            data-icon-id={id}
            className="pointer-events-auto flex flex-col items-center gap-3 cursor-pointer group rounded-xl p-2 outline-none focus-visible:ring-4 focus-visible:ring-black"
            style={{ '--icon-color': color } as React.CSSProperties}
            onClick={(e) => { e.stopPropagation(); onClick(id, e.currentTarget); }}
        >
            <div
                className="w-28 h-28 lg:w-[140px] lg:h-[140px] flex items-center justify-center border-4 border-[var(--icon-color)] rounded-2xl bg-white text-[var(--icon-color)] shadow-[6px_6px_0_0_#000] group-hover:bg-[var(--icon-color)] group-hover:text-white group-hover:shadow-[3px_3px_0_0_#000] group-hover:translate-x-[3px] group-hover:translate-y-[3px] group-active:shadow-none group-active:translate-x-[6px] group-active:translate-y-[6px] transition-all duration-100"
            >
                {/* Hard black drop shadow keeps the white hover glyph readable on light fills like yellow */}
                <Icon className="w-12 h-12 lg:w-16 lg:h-16 group-hover:drop-shadow-[2px_2px_0_#000]" />
            </div>
            <span className="flex flex-col items-center px-2 py-0.5 rounded bg-white/80">
                <span className="text-[15px] lg:text-base font-bold tracking-tight">{name}</span>
                <span className="text-xs lg:text-sm font-medium text-black/60">{subtitle}</span>
            </span>
        </button>
    );
}
