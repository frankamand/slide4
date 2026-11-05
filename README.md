# Tilescraper

A match-4 sliding puzzle: slide tiles into the gap, line up four of a colour, and climb the tower. An installable web app: open the site on a phone, choose Install (Android Chrome: ⋮ menu → Install app; iPhone Safari: Share → Add to Home Screen) and it runs full screen and offline.

## Publish on GitHub Pages
1. Create a repository (for example `slide4`) and upload everything in this folder to it, keeping the folders.
2. Settings → Pages → Build and deployment → Source: "Deploy from a branch", Branch: `main`, folder `/ (root)` → Save.
3. After a minute the game is at `https://<your-username>.github.io/slide4/`.

## Updating
Replace `index.html` (and any changed files). Installed copies pick up the new page the next time they are opened online.
If fonts, icons, scripts or sound clips change, also raise `VERSION` in `sw.js`.

## Notes
- High scores are stored per device in the browser.
- `audio/en/*.mp3`: the game's voice, 19 phrases pre-rendered with SAM, the 1982 C64 speech program (via sam-js, a reverse-engineered port). SAM's rights belong to SoftVoice, Inc.; clear this with them before any commercial release.
- Fonts: Monoton, Chakra Petch and JetBrains Mono (SIL Open Font License), from Fontsource.

## Copyright
© 2026 Frank Amand. All rights reserved. The code, music and graphics of Tilescraper may not be copied, modified or redistributed without permission. Third-party parts keep their own licences (see Notes).
