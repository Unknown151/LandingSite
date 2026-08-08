# LandingSite

A link hub for the rsvn.dk army builders — like Linktree, but self-hosted and
yours. One panel per tool, each forwarding to its own site.

Styled as a dark tactical HUD: mint-on-black, monospace technical labels,
notched panels, scanlines and a glitching title.

Plain HTML, CSS and JavaScript. No framework, no build step, no dependencies,
no tracking.

## Editing your links

Everything you'd want to change lives at the top of **`links.js`**:

```js
const SITE = {
  name: "Army Builders",
  handle: "rsvn.dk",
  eyebrow: "Warhammer 40,000",   // small label above the title
  tagline: "",                   // optional line under the rule; "" hides it
  accent: "#4fe3b0",             // one colour drives every highlight and glow

  links: [
    {
      icon: "",                                         // see below
      title: "Chaos Daemons",
      description: "Army builder for Chaos Daemons.",   // optional
      url: "https://cd.rsvn.dk",
      badge: "Beta",                                    // optional
    },
  ],

  footer: "Fan-made tools. Not affiliated with Games Workshop.",
};
```

Add, remove or reorder entries in `links` — the page renders whatever is there,
and renumbers the panels automatically. `mailto:` and `tel:` links work too, and
open in the same tab rather than a new one.

**About `icon`:** leave it empty and the panel shows its index number (`01`,
`02`, …), which is the intended look. An inline `<svg>…</svg>` is drawn in the
accent colour and fits the style well. An emoji renders fine but its colours sit
oddly against the rest of the palette.

**The title** splits on the first space: the first word goes in the lit panel,
the rest sits alongside it in outline. So `name: "Army Builders"` gives you
`ARMY | BUILDERS`.

## Running it locally

No tooling required — open `index.html` in a browser. Or serve it, which more
closely matches production:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying to Cloudflare Pages

The repo has no build step, so the setup is:

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git**, and pick this repository.
2. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`
3. **Save and Deploy.**

Every push to the production branch redeploys automatically; pushes to other
branches get their own preview URL.

To use your own domain, go to the project's **Custom domains** tab and add it —
if the domain is already on Cloudflare, DNS is wired up for you.

## What's in here

| File          | Purpose                                              |
| ------------- | ---------------------------------------------------- |
| `index.html`  | Page shell                                           |
| `links.js`    | Your content + the rendering logic                   |
| `styles.css`  | Styling, effects, the whole HUD look                 |
| `404.html`    | Served by Cloudflare Pages for unknown paths         |
| `_headers`    | Security and caching headers for Cloudflare Pages    |

## Notes

- **Dark only.** The look rests on a near-black ground, so there is no light
  variant and no theme toggle.
- Every animation — the glitch, the drifting sweep, the blinking marker, the
  panels sliding in — is disabled under `prefers-reduced-motion`.
- No web fonts are loaded. The display face is the system sans at heavy weight
  and the rest is the system monospace, so the page has zero external requests.
- `_headers` omits a `Content-Security-Policy`. Nothing inline remains, so one
  could now be added — `img-src` needs `data:` for the favicon and the grain
  texture.
