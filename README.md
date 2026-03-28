# MillenETech Website

Official website for MillenETech (Millennial E Technology).

## Local Development

No build step required. Open directly in a browser:

```bash
# Option 1 — Python (built-in)
python3 -m http.server 8080
# then open http://localhost:8080

# Option 2 — Node (npx)
npx serve .
# then open http://localhost:3000

# Option 3 — VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

## Structure

```
/
├── index.html          — Single-page site (all sections)
├── css/
│   ├── main.css        — Design tokens, base styles, all components
│   └── animations.css  — GSAP targets, initial states, keyframes
├── js/
│   ├── main.js         — Nav, GSAP scroll animations, interactions
│   └── particles.js    — Canvas particle network (hero background)
└── assets/
    ├── fonts/          — Local font files (optional, currently via Google Fonts CDN)
    └── icons/          — SVG icon files
```

## External Dependencies (CDN only)

- **Google Fonts** — Syne (display) + DM Sans (body)
- **GSAP 3.12** + ScrollTrigger — scroll animations

## Deployment

Drop the folder on any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages). No build step.

```bash
# Netlify drag-and-drop: drag the /millenetechweb folder to netlify.com/drop
# Vercel CLI:
npx vercel
```
