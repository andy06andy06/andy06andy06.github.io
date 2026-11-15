# Photos

Photos are organised as **country / city**. Each city folder is one pin on the map in the `Photos.jpg` window. The site reads these folders when it is built, so adding photos never requires editing code.

```
public/photos/
├── japan/
│   ├── kyoto/
│   │   ├── place.json
│   │   ├── 2025-03_kiyomizu-dera.jpg
│   │   └── 2025-04_philosophers-path.jpg
│   └── tsukuba/
│       ├── place.json
│       └── 2025-10_campus.jpg
└── taiwan/
    └── taipei/
        ├── place.json
        └── 2024-11_elephant-mountain.jpg
```

## Add a photo to an existing city

Put the file in that city's folder, named `YYYY-MM_short-title.jpg`:

- `2025-03` becomes the date shown next to the photo (`2025/03`). `2025-03-15_...` also works. Without a date prefix the photo still appears, just with no date.
- Photos are ordered by file name, so dated photos appear oldest first.
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, `.gif`, `.svg`.
- Resize photos so the long edge is at most 1600px before adding them. The site is a static export and serves images exactly as they are.

## Add a new city

1. Create a folder for the city inside its country folder, creating the country folder first if it is new, e.g. `usa/new-york/`. Folder names are only used for organising: use lowercase letters and hyphens.
2. Add a `place.json` inside the city folder:

   ```json
   { "name": "New York, USA", "coords": [-74.006, 40.7128], "color": "#fdba74" }
   ```

   - `name` is the label shown on the map.
   - `coords` is `[longitude, latitude]`. In Google Maps, right-click a spot to copy `latitude, longitude`, then swap the two numbers.
   - `color` is the pin colour and is optional.
3. Add at least one photo. A city with no photos gets no pin.

The build fails with a message naming the folder if a city's `place.json` is missing or invalid, or if a photo is placed directly in a country folder instead of a city folder.

## Other notes

- Folders starting with `_` are ignored at both levels, so `_drafts/` or `japan/_drafts/` are handy places for photos that are not ready.
- The `*_placeholder-*.svg` files are samples. Delete them once real photos are in.
- While running `npm run dev`, refresh the page to see newly added photos.
