# LandingSite

A small link-hub page — like Linktree, but self-hosted and yours. One card per
site, each one forwarding to a different page of yours.

Plain HTML, CSS and JavaScript. No framework, no build step, no dependencies,
no tracking.

## Editing your links

Everything you'd want to change lives at the top of **`links.js`**:

```js
const SITE = {
  name: "Your Name",
  handle: "@yourhandle",
  tagline: "Everything I build, in one place.",
  avatar: "",          // image URL, or "" to use your initials
  accent: "#6366f1",   // one colour drives the whole palette

  links: [
    {
      icon: "🌐",                              // emoji, or an inline <svg>…</svg>
      title: "Main Website",
      description: "The home base.",           // optional
      url: "https://example.com",
      badge: "New",                            // optional
    },
  ],

  footer: "Built with a static page and no tracking.",
};
```

Add, remove or reorder entries in `links` — the page renders whatever is there.
`mailto:` and `tel:` links work too, and open in the same tab rather than a new
one.

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
| `styles.css`  | Styling, light/dark themes                           |
| `404.html`    | Served by Cloudflare Pages for unknown paths         |
| `_headers`    | Security and caching headers for Cloudflare Pages    |

## Notes

- Dark mode follows the OS setting; the toggle in the corner overrides it and
  the choice is remembered in `localStorage`.
- Respects `prefers-reduced-motion`.
- `_headers` deliberately omits a `Content-Security-Policy`, because the page
  uses a small inline script to apply the saved theme before first paint. If you
  want a CSP, move that snippet into its own file first.
