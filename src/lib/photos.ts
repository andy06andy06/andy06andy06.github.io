import fs from 'fs';
import path from 'path';

import type { PhotoSpot } from '@/data/portfolio';

// Every folder in public/photos is one place on the map:
//   public/photos/<place-id>/place.json        -> { "name", "coords": [lng, lat], "color"? }
//   public/photos/<place-id>/2025-03_title.jpg -> a photo taken in 2025/03
const PHOTOS_DIR = path.join(process.cwd(), 'public', 'photos');
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg']);
const DATE_PREFIX = /^(\d{4})-(\d{2})(?:-(\d{2}))?[_-]?/;
const FALLBACK_COLORS = ['#f9a8d4', '#5eead4', '#fde047', '#d8b4fe', '#fdba74', '#86efac'];

const fail = (message: string): never => {
    throw new Error(`[photos] ${message}`);
};

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

    return fs.readdirSync(PHOTOS_DIR, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_') && !entry.name.startsWith('.'))
        .map((entry) => entry.name)
        .sort()
        .map((id, index) => {
            const { name, coords, color } = readPlaceInfo(id);

            // Sorted by file name, so date-prefixed photos appear in chronological order
            const photos = fs.readdirSync(path.join(PHOTOS_DIR, id))
                .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
                .sort()
                .map((file) => {
                    const base = path.basename(file, path.extname(file));
                    const dateMatch = base.match(DATE_PREFIX);
                    const title = base.replace(DATE_PREFIX, '').replace(/[-_]+/g, ' ').trim();
                    return {
                        src: `/photos/${encodeURIComponent(id)}/${encodeURIComponent(file)}`,
                        date: dateMatch ? `${dateMatch[1]}/${dateMatch[2]}` : '',
                        alt: title ? `${title}, ${name}` : name,
                    };
                });

            return { id, name, coords, color: color ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length], photos };
        })
        .filter((spot) => spot.photos.length > 0); // a place with no photos yet gets no pin
}
