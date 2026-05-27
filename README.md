# Flappy Bird (Next.js)

A browser-based Flappy Bird clone built as a Next.js application. The game runs inside a responsive HTML canvas and uses custom game logic for gravity, jumping, moving pipes, and collision detection.

## What this app does

- Renders a full-screen canvas using a client-side React component at `src/app/components/Canva.tsx`
- Uses `window.requestAnimationFrame` to run the game loop and animate the scene
- Applies gravity and jump physics to the bird character
- Generates a repeating set of pipes with gaps that the bird must fly through
- Tracks score when the bird passes a pipe
- Plays sound effects for jumping, scoring, and crashing
- Resets the game automatically on collisions with pipes or the ground

## Project structure

- `src/app/page.tsx` — main Next.js page that mounts the `Canva` game component
- `src/app/components/Canva.tsx` — game implementation, rendering, and input handling
- `src/app/utils/functions/index.ts` — helper for loading image assets
- `public/flappyBird/` — game assets including images and audio files

## Features

- Full-window canvas rendering
- Keyboard control for jump action
- Dynamic pipe placement and adaptive gaps
- Score display overlayed on the canvas
- Responsive resizing when the browser window changes size
- Native browser audio playback for game events

## Getting started

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open the app in your browser:

```text
http://localhost:3000
```

## Scripts

- `pnpm dev` — run the Next.js development server
- `pnpm build` — build the production version
- `pnpm start` — start the production server
- `pnpm lint` — run ESLint checks

## Notes

- The game is implemented as a client component with `'use client'` because it needs access to browser APIs like `window`, `canvas`, and audio playback.
- Assets are loaded from `public/flappyBird/imagenes` and `public/flappyBird/audios`.
- The component uses a simple axis-aligned bounding box (AABB) collision test for the bird and pipes.

## Learn more

Since this is a Next.js project, you can refer to the official documentation for additional concepts like routing, deployment, and app structure:

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
