'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { FeatureCollection } from 'geojson';
import type { Topology } from 'topojson-specification';
import { Plus, Minus, RotateCcw } from 'lucide-react';
import worldData from 'world-atlas/countries-110m.json';

import type { PhotoSpot } from '@/data/portfolio';

const WIDTH = 960;
const HEIGHT = 500;
const MIN_ZOOM = 1;
const MAX_ZOOM = 12;
const FOCUS_ZOOM = 4; // zoom level used when a place is selected
const DRAG_THRESHOLD_PX = 4;
const ANTARCTICA_ID = '010';

const topology = worldData as unknown as Topology;
const countries = (feature(topology, topology.objects.countries) as FeatureCollection).features
    .filter((country) => country.id !== ANTARCTICA_ID);

const projection = geoNaturalEarth1().fitExtent(
    [[10, 10], [WIDTH - 10, HEIGHT - 10]],
    { type: 'FeatureCollection', features: countries },
);
const pathGenerator = geoPath(projection);
const countryPaths = countries.map((country, index) => ({
    key: `${country.id ?? 'country'}-${index}`,
    d: pathGenerator(country) ?? '',
}));

type View = { k: number; x: number; y: number };
const INITIAL_VIEW: View = { k: 1, x: 0, y: 0 };

// Keep the map covering the viewport so it can't be dragged out of sight
const clampView = ({ k, x, y }: View): View => {
    const zoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, k));
    return {
        k: zoom,
        x: Math.min(0, Math.max(WIDTH - WIDTH * zoom, x)),
        y: Math.min(0, Math.max(HEIGHT - HEIGHT * zoom, y)),
    };
};

const zoomAround = (view: View, factor: number, cx: number, cy: number): View => {
    const k = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, view.k * factor));
    const ratio = k / view.k;
    return clampView({ k, x: cx - (cx - view.x) * ratio, y: cy - (cy - view.y) * ratio });
};

interface WorldMapProps {
    spots: PhotoSpot[];
    selectedId: string | null;
    onSelect: (id: string) => void;
}

export default function WorldMap({ spots, selectedId, onSelect }: WorldMapProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const [view, setView] = useState<View>(INITIAL_VIEW);
    const [isDragging, setIsDragging] = useState(false);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const suppressClickRef = useRef(false);
    // Screen px per viewBox unit; pins are sized in screen px so they stay tappable in small windows
    const [svgScale, setSvgScale] = useState(1);

    // The SVG is letterboxed ("meet"), so screen px map to viewBox units through one scale + offset
    const getMetrics = useCallback(() => {
        const rect = svgRef.current?.getBoundingClientRect();
        if (!rect || rect.width === 0) return null;
        const scale = Math.min(rect.width / WIDTH, rect.height / HEIGHT);
        return {
            scale,
            left: rect.left + (rect.width - WIDTH * scale) / 2,
            top: rect.top + (rect.height - HEIGHT * scale) / 2,
        };
    }, []);

    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;
        const measure = () => {
            const metrics = getMetrics();
            if (metrics) setSvgScale(metrics.scale);
        };
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(svg);
        return () => observer.disconnect();
    }, [getMetrics]);

    // Selecting a place (pin or chip) centres it and zooms in enough to separate nearby pins
    useEffect(() => {
        const spot = spots.find((s) => s.id === selectedId);
        const point = spot && projection(spot.coords);
        if (!point) return;
        setView((prev) => {
            const k = Math.max(prev.k, FOCUS_ZOOM);
            return clampView({ k, x: WIDTH / 2 - point[0] * k, y: HEIGHT / 2 - point[1] * k });
        });
    }, [selectedId, spots]);

    // Wheel zoom needs a non-passive listener to stop the window content from scrolling
    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;
        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            const metrics = getMetrics();
            if (!metrics) return;
            const cx = (e.clientX - metrics.left) / metrics.scale;
            const cy = (e.clientY - metrics.top) / metrics.scale;
            setView((prev) => zoomAround(prev, Math.exp(-e.deltaY * 0.002), cx, cy));
        };
        svg.addEventListener('wheel', onWheel, { passive: false });
        return () => svg.removeEventListener('wheel', onWheel);
    }, [getMetrics]);

    const handlePointerDown = (e: React.PointerEvent) => {
        if (e.button !== 0) return;
        const metrics = getMetrics();
        if (!metrics) return;
        const startX = e.clientX;
        const startY = e.clientY;
        const startView = view;
        let moved = false;
        suppressClickRef.current = false;

        const onPointerMove = (moveEvent: PointerEvent) => {
            const dx = moveEvent.clientX - startX;
            const dy = moveEvent.clientY - startY;
            if (!moved && Math.hypot(dx, dy) < DRAG_THRESHOLD_PX) return;
            moved = true;
            suppressClickRef.current = true; // a drag that ends over a pin must not select it
            setIsDragging(true);
            setView(clampView({
                k: startView.k,
                x: startView.x + dx / metrics.scale,
                y: startView.y + dy / metrics.scale,
            }));
        };
        const onPointerUp = () => {
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
            window.removeEventListener('pointercancel', onPointerUp);
            setIsDragging(false);
        };
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);
    };

    const selectSpot = (id: string) => {
        if (suppressClickRef.current) return;
        onSelect(id);
    };

    const zoomButtonClass = "w-8 h-8 flex items-center justify-center bg-white border-2 border-black border-b-[3px] border-r-[3px] active:border-b-2 active:border-r-2 active:translate-y-[1px] active:translate-x-[1px]";

    return (
        <div className="relative w-full h-full bg-cyan-100 overflow-hidden">
            <svg
                ref={svgRef}
                viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                className={`w-full h-full touch-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                onPointerDown={handlePointerDown}
                role="group"
                aria-label="World map of places I have photographed"
            >
                <g
                    style={{
                        transform: `translate(${view.x}px, ${view.y}px) scale(${view.k})`,
                        transformOrigin: '0 0',
                        transition: isDragging ? 'none' : 'transform 0.35s ease-out',
                    }}
                >
                    {countryPaths.map((country) => (
                        <path
                            key={country.key}
                            d={country.d}
                            fill="#fdf6e3"
                            stroke="#000"
                            strokeWidth={1}
                            strokeLinejoin="round"
                            vectorEffect="non-scaling-stroke"
                        />
                    ))}

                    {spots.map((spot) => {
                        const point = projection(spot.coords);
                        if (!point) return null;
                        const isSelected = spot.id === selectedId;
                        const showLabel = isSelected || hoveredId === spot.id;
                        const labelWidth = spot.name.length * 7.2 + 16;
                        return (
                            // Counter-scale so pins keep the same on-screen size at every zoom level and window size
                            <g key={spot.id} transform={`translate(${point[0]} ${point[1]}) scale(${1 / (view.k * svgScale)})`}>
                                <g
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`${spot.name}, ${spot.photos.length} photos`}
                                    aria-pressed={isSelected}
                                    data-spot-id={spot.id}
                                    className={`cursor-pointer outline-none focus-visible:[&>path]:stroke-[4px] [transform-box:fill-box] ${isSelected ? 'animate-bounce' : ''}`}
                                    onClick={() => selectSpot(spot.id)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            onSelect(spot.id);
                                        }
                                    }}
                                    onPointerEnter={() => setHoveredId(spot.id)}
                                    onPointerLeave={() => setHoveredId(null)}
                                    onFocus={() => setHoveredId(spot.id)}
                                    onBlur={() => setHoveredId(null)}
                                >
                                    {/* Hard offset shadow, then the pin: tip sits exactly on the coordinate */}
                                    <path d="M0 0 L-9 -14 A11 11 0 1 1 9 -14 Z" fill="#000" transform="translate(3 3)" />
                                    <path
                                        d="M0 0 L-9 -14 A11 11 0 1 1 9 -14 Z"
                                        fill={spot.color}
                                        stroke="#000"
                                        strokeWidth={2.5}
                                        strokeLinejoin="round"
                                    />
                                    <text x={0} y={-16} textAnchor="middle" fontSize={12} fontWeight={900} fill="#000">
                                        {spot.photos.length}
                                    </text>
                                </g>
                                {showLabel && (
                                    <g transform="translate(0 -68)" pointerEvents="none">
                                        <rect x={-labelWidth / 2} y={0} width={labelWidth} height={22} fill="#fff" stroke="#000" strokeWidth={2} />
                                        <text x={0} y={15} textAnchor="middle" fontSize={12} fontWeight={700} fill="#000">
                                            {spot.name}
                                        </text>
                                    </g>
                                )}
                            </g>
                        );
                    })}
                </g>
            </svg>

            {/* Zoom controls (the only way to zoom on touch screens) */}
            <div className="absolute top-2 right-2 flex flex-col gap-1">
                <button type="button" aria-label="Zoom in" className={zoomButtonClass}
                    onClick={() => setView((prev) => zoomAround(prev, 1.6, WIDTH / 2, HEIGHT / 2))}>
                    <Plus size={16} />
                </button>
                <button type="button" aria-label="Zoom out" className={zoomButtonClass}
                    onClick={() => setView((prev) => zoomAround(prev, 1 / 1.6, WIDTH / 2, HEIGHT / 2))}>
                    <Minus size={16} />
                </button>
                <button type="button" aria-label="Reset map view" className={zoomButtonClass}
                    onClick={() => setView(INITIAL_VIEW)}>
                    <RotateCcw size={14} />
                </button>
            </div>
        </div>
    );
}
