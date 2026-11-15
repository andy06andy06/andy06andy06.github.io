# Cheng-En Chiang - Personal Portfolio

Hello! 👋 Welcome to my personal portfolio repository.

This is the personal portfolio website of Cheng-En Chiang, an AI Research Engineer specializing in computer vision, deep learning, and ML infrastructure.

## Visit the Website
[https://andy06andy06.github.io/](https://andy06andy06.github.io/)

## Adding photos to the map

The `Photos.jpg` window shows a world map with a pin for each place.

1. Resize the photo so its long edge is at most 1600px (the site is a static export, so images are served as-is) and put it in `public/photos/`.
2. In `src/data/portfolio.tsx`, add the photo to an existing entry in `photoSpots`, or add a new place:

```ts
{
    id: "kyoto",
    name: "Kyoto, Japan",
    coords: [135.7681, 35.0116], // [longitude, latitude]
    color: "#f9a8d4",            // pin colour
    photos: [
        { src: "/photos/kyoto-1.jpg", date: "2025/03", alt: "Kiyomizu-dera at dusk" },
    ]
}
```

The pin is placed automatically from the coordinates. The entries currently in `photoSpots` use placeholder images and can be replaced.
