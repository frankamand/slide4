# Slide 4

Slide tiles into the gap and line up four of a colour. An installable web app: open the site on a phone, choose Install (Android Chrome: ⋮ menu → Install app; iPhone Safari: Share → Add to Home Screen) and it runs full screen and offline.

## Publish on GitHub Pages
1. Create a repository (for example `slide4`) and upload everything in this folder to it, keeping the folders.
2. Settings → Pages → Build and deployment → Source: "Deploy from a branch", Branch: `main`, folder `/ (root)` → Save.
3. After a minute the game is at `https://<your-username>.github.io/slide4/`.

## Updating
Replace `index.html` (and any changed files). Installed copies pick up the new page the next time they are opened online.
If fonts, icons or scripts change, also raise `VERSION` in `sw.js`.

## Notes
- High scores are stored per device in the browser.
- `js/samjs.min.js` is sam-js, a reverse-engineered port of the 1982 C64 speech program SAM; see `js/samjs-README.md` for its licence notes before any commercial release.
- Fonts: Bricolage Grotesque and JetBrains Mono (SIL Open Font License), from Fontsource.
