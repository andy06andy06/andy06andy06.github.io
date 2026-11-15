'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

import type { PhotoSpot } from '@/data/portfolio';

interface PhotoLightboxProps {
    spot: PhotoSpot;
    index: number;
    onChange: (index: number) => void;
    onClose: () => void;
}

const buttonClass = "w-10 h-10 shrink-0 flex items-center justify-center bg-white border-2 border-black border-b-4 border-r-4 active:border-b-2 active:border-r-2 active:translate-y-[2px] active:translate-x-[2px]";

export default function PhotoLightbox({ spot, index, onChange, onClose }: PhotoLightboxProps) {
    const count = spot.photos.length;
    const photo = spot.photos[index];

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            else if (e.key === 'ArrowLeft') onChange((index - 1 + count) % count);
            else if (e.key === 'ArrowRight') onChange((index + 1) % count);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [index, count, onChange, onClose]);

    if (!photo) return null;

    // Portalled to <body>: the window is a transformed element, which would trap position: fixed
    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center gap-2 sm:gap-4 bg-black/80 p-3 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${spot.name}, photo ${index + 1} of ${count}`}
            onClick={onClose}
        >
            {count > 1 && (
                <button type="button" aria-label="Previous photo" className={buttonClass}
                    onClick={(e) => { e.stopPropagation(); onChange((index - 1 + count) % count); }}>
                    <ChevronLeft size={22} />
                </button>
            )}

            <figure
                className="flex flex-col min-w-0 max-h-full bg-white border-4 border-black shadow-[10px_10px_0_0_#000] p-3"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Static export has no image optimizer, so next/image would add nothing here */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={photo.src}
                    alt={photo.alt}
                    className="min-h-0 max-w-full max-h-[70vh] object-contain border-2 border-black"
                />
                <figcaption className="flex items-center justify-between gap-4 pt-3 text-black font-bold">
                    <span>{spot.name} · {photo.date}</span>
                    <span className="shrink-0 whitespace-nowrap text-sm text-black/60">{index + 1} / {count}</span>
                </figcaption>
            </figure>

            {count > 1 && (
                <button type="button" aria-label="Next photo" className={buttonClass}
                    onClick={(e) => { e.stopPropagation(); onChange((index + 1) % count); }}>
                    <ChevronRight size={22} />
                </button>
            )}

            <button type="button" aria-label="Close photo" autoFocus
                className={`${buttonClass} absolute top-3 right-3`}
                onClick={(e) => { e.stopPropagation(); onClose(); }}>
                <X size={20} />
            </button>
        </div>,
        document.body,
    );
}
