# Ctrl Deploy — marketing site

Static landing page for Ctrl Deploy ("Your SOC 2, owned end to end"), implemented
from the Claude Design project `Ctrl Deploy Site.dc.html`.

## Stack

Zero-build static site — plain HTML, CSS, and a small vanilla-JS file. Deploys to
Vercel (or any static host) with no configuration.

```
index.html              # the page
app.js                  # animated evidence card + FAQ accordion + icon hydration
styles/
  colors_and_type.css   # design-system tokens (OKLCH colors, type scale, spacing)
  marketing.css         # buttons + marketing-kit component styles
assets/                 # logos + founder portrait (see note below)
```

Fonts (IBM Plex Sans / IBM Plex Mono) load from Google Fonts; icons from the
Lucide CDN.

## Local preview

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy

```bash
vercel        # preview
vercel --prod # production
```

## Notes / TODO

- **Assets:** all real now — brand logos (AWS, Drata, OneTrust, CyAlpha, Secureframe,
  Popl, Vanta, Cashmere) and the founder portrait (`founder.jpg`, resized to 666×1000
  / ~140 KB from the original 15 MB).
- **Booking:** the contact section embeds the Calendly inline widget for
  `https://calendly.com/ctrldeploy/admt-assessment`. A `<noscript>` fallback links
  out to the same page. The "Book a 20-min call" buttons scroll to this section.
- Replace the `linkedinUrl`, repo URL, and the "[X] weeks" FAQ placeholder with real values.
