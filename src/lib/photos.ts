import fs from 'fs';
import path from 'path';

import type { PhotoSpot } from '@/data/portfolio';

// public/photos is organised as country / city. Every city folder is one place on the map:
//   public/photos/<country>/<city>/place.json        -> { "name", "coords": [lng, lat], "color"? }
//   public/photos/<country>/<city>/2025-03_title.jpg -> a photo taken in 2025/03
const PHOTOS_DIR = path.join(process.cwd(), 'public', 'photos');
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg']);
const DATE_PREFIX = /^(\d{4})-(\d{2})(?:-(\d{2}))?[_-]?/;
const FALLBACK_COLORS = ['#f9a8d4', '#5eead4', '#fde047', '#d8b4fe', '#fdba74', '#86efac'];

const fail = (message: string): never => {
    throw new Error(`[photos] ${message}`);
};

const isImage = (file: string) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase());

// Sub-folders in name order; names starting with "_" or "." are ignored (drafts, system files)
const listFolders = (dir: string) =>
    fs.readdirSync(dir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_') && !entry.name.startsWith('.'))
        .map((entry) => entry.name)
        .sort();

const readPlaceInfo = (id: string) => {
    const file = path.join(PHOTOS_DIR, id, 'place.json');
    if (!fs.existsSync(file)) fail(`public/photos/${id}/ has no place.json`);

    let info: { name?: unknown; coords?: unknown; color?: unknown };
    try {
        info = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch {
        return fail(`public/photos/${id}/place.json is not valid JSON`);
    }

    const { name, coords, color } = info;
    if (typeof name !== 'string' || !name) fail(`public/photos/${id}/place.json needs a "name"`);
    const [lng, lat] = Array.isArray(coords) ? coords : [];
    if (typeof lng !== 'number' || typeof lat !== 'number' || Math.abs(lng) > 180 || Math.abs(lat) > 90) {
        fail(`public/photos/${id}/place.json needs "coords": [longitude, latitude]`);
    }
    return { name: name as string, coords: [lng, lat] as [number, number], color: typeof color === 'string' ? color : null };
};

export function getPhotoSpots(): PhotoSpot[] {
    if (!fs.existsSync(PHOTOS_DIR)) return [];

    const cityIds = listFolders(PHOTOS_DIR).flatMap((country) => {
        const countryDir = path.join(PHOTOS_DIR, country);
        // Photos or a place.json directly in a country folder would silently never show up
        const stray = fs.readdirSync(countryDir).find((file) => file === 'place.json' || isImage(file));
        if (stray) fail(`public/photos/${country}/${stray} must be inside a city folder, e.g. public/photos/${country}/<city>/${stray}`);
        return listFolders(countryDir).map((city) => `${country}/${city}`);
    });

    return cityIds
        .map((id, index) => {
            const { name, coords, color } = readPlaceInfo(id);

            // Sorted by file name, so date-prefixed photos appear in chronological order
            const photos = fs.readdirSync(path.join(PHOTOS_DIR, id))
                .filter(isImage)
                .sort()
                .map((file) => {
                    const base = path.basename(file, path.extname(file));
                    const dateMatch = base.match(DATE_PREFIX);
                    const title = base.replace(DATE_PREFIX, '').replace(/[-_]+/g, ' ').trim();
                    return {
                        src: `/photos/${[...id.split('/'), file].map(encodeURIComponent).join('/')}`,
                        date: dateMatch ? `${dateMatch[1]}/${dateMatch[2]}` : '',
                        alt: title ? `${title}, ${name}` : name,
                    };
                });

            return { id, name, coords, color: color ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length], photos };
        })
        .filter((spot) => spot.photos.length > 0); // a city with no photos yet gets no pin
}
