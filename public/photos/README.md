# Photos

Each folder here is one pin on the map in the `Photos.jpg` window. The site reads these folders when it is built, so adding photos never requires editing code.

```
public/photos/
├── kyoto/
│   ├── place.json
│   ├── 2025-03_kiyomizu-dera.jpg
│   └── 2025-04_philosophers-path.jpg
└── taipei/
    ├── place.json
    └── 2024-11_elephant-mountain.jpg
```

## Add a photo to an existing place

Put the file in that place's folder, named `YYYY-MM_short-title.jpg`:

- `2025-03` becomes the date shown next to the photo (`2025/03`). `2025-03-15_...` also works. Without a date prefix the photo still appears, just with no date.
- Photos are ordered by file name, so dated photos appear oldest first.
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, `.gif`, `.svg`.
- Resize photos so the long edge is at most 1600px before adding them. The site is a static export and serves images exactly as they are.

## Add a new place

1. Create a folder. Its name is only an ID: use lowercase letters and hyphens, e.g. `new-york`.
2. Add a `place.json` inside it:

   ```json
   { "name": "New York, USA", "coords": [-74.006, 40.7128], "color": "#fdba74" }
   ```

   - `coords` is `[longitude, latitude]`. In Google Maps, right-click a spot to copy `latitude, longitude`, then swap the two numbers.
   - `color` is the pin colour and is optional.
3. Add at least one photo. A place with no photos gets no pin.

The build fails with a message naming the folder if `place.json` is missing or invalid.

## Other notes

- Folders starting with `_` are ignored, so `_drafts/` is a handy place for photos that are not ready.
- The `*_placeholder-*.svg` files are samples. Delete them once real photos are in.
- While running `npm run dev`, refresh the page to see newly added photos.
