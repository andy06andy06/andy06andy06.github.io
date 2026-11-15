'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MapPin, X } from 'lucide-react';

import WorldMap from '@/components/WorldMap';
import PhotoLightbox from '@/components/PhotoLightbox';
import type { PhotoSpot } from '@/data/portfolio';

export default function Photos({ photoSpots }: { photoSpots: PhotoSpot[] }) {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const selectedSpot = photoSpots.find((spot) => spot.id === selectedId) ?? null;

    return (
        <div className="flex flex-col gap-3 h-full text-black">
            {/* Place chips: same action as clicking a pin, easier when pins are crowded */}
            <div className="flex flex-wrap gap-2 shrink-0">
                {photoSpots.map((spot) => (
                    <button
                        key={spot.id}
                        type="button"
                        aria-pressed={spot.id === selectedId}
                        onClick={() => setSelectedId(spot.id)}
                        className="flex items-center gap-1 px-2 py-1 border-2 border-black text-xs font-bold shadow-[2px_2px_0_0_#000] hover:-translate-y-0.5 transition-transform"
                        style={{ backgroundColor: spot.id === selectedId ? spot.color : '#fff' }}
                    >
                        <MapPin size={12} />
                        {spot.name}
                    </button>
                ))}
            </div>

            <div className="flex flex-col flex-1 min-h-0 border-4 border-black overflow-hidden">
                <div className="flex-1 min-h-0">
                    <WorldMap spots={photoSpots} selectedId={selectedId} onSelect={setSelectedId} />
                </div>

                {/* Sits below the map (not over it) so the selected pin is never covered */}
                <AnimatePresence initial={false} mode="wait">
                    {selectedSpot && (
                        <motion.div
                            key={selectedSpot.id}
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="shrink-0 overflow-hidden bg-white border-t-4 border-black"
                        >
                            <div
                                className="flex items-center justify-between gap-2 px-3 py-1.5 border-b-2 border-black font-black"
                                style={{ backgroundColor: selectedSpot.color }}
                            >
                                <span>
                                    {selectedSpot.name} · {selectedSpot.photos.length} {selectedSpot.photos.length === 1 ? 'photo' : 'photos'}
                                </span>
                                <button
                                    type="button"
                                    aria-label="Close photo panel"
                                    className="w-6 h-6 flex items-center justify-center bg-white border-2 border-black"
                                    onClick={() => setSelectedId(null)}
                                >
                                    <X size={14} />
                                </button>
                            </div>
                            <div className="flex gap-3 p-3 overflow-x-auto">
                                {selectedSpot.photos.map((photo, index) => (
                                    <button
                                        key={`${photo.src}-${index}`}
                                        type="button"
                                        aria-label={`Open photo ${index + 1}${photo.date ? `, ${photo.date}` : ''}`}
                                        onClick={() => setLightboxIndex(index)}
                                        className="shrink-0 bg-white border-2 border-black p-1 shadow-[3px_3px_0_0_#000] hover:-translate-y-1 hover:shadow-[5px_5px_0_0_#000] transition-all"
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={photo.src}
                                            alt={photo.alt}
                                            loading="lazy"
                                            className="w-28 h-20 object-cover border border-black"
                                        />
                                        {photo.date && <span className="block pt-1 text-xs font-bold">{photo.date}</span>}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {selectedSpot && lightboxIndex !== null && (
                <PhotoLightbox
                    spot={selectedSpot}
                    index={lightboxIndex}
                    onChange={setLightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                />
            )}
        </div>
    );
}
