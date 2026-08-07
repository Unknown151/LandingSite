/*
 * ============================================================
 *  EDIT THIS FILE — it is the only one you need to touch.
 * ============================================================
 *
 *  icon:  any emoji, or an inline <svg>…</svg> string.
 *  url:   full URL including https://
 *  badge: optional small label shown on the right (or omit)
 */

const SITE = {
  name: "Army Builders",
  handle: "rsvn.dk",

  // Optional line under the handle. "" hides it.
  tagline: "",

  // "" hides the circle entirely. "initials" draws the initials taken
  // from `name`. Anything else is treated as an image URL.
  avatar: "",

  // Accent colour used for highlights and focus rings.
  accent: "#b91c1c",

  links: [
    {
      icon: "👹",
      title: "Chaos Daemons",
      description: "Army builder for Chaos Daemons.",
      url: "https://cd.rsvn.dk",
    },
    {
      icon: "⛏️",
      title: "Leagues of Votann",
      description: "Army builder for the Leagues of Votann.",
      url: "https://votann.rsvn.dk",
    },
    {
      icon: "🧮",
      title: "Point Tracker",
      description: "Keep track of points while you build a list.",
      url: "https://points.rsvn.dk",
    },
  ],

  // Small text at the bottom. Set to "" to hide.
  footer: "Fan-made tools. Not affiliated with Games Workshop.",
};

/* ============================================================
 *  Rendering — you shouldn't need to change anything below.
 * ============================================================ */

const isSvg = (s) => typeof s === "string" && s.trim().startsWith("<svg");

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function renderHeader() {
  document.documentElement.style.setProperty("--accent", SITE.accent);

  const avatar = document.getElementById("avatar");
  if (!SITE.avatar) {
    avatar.remove();
  } else if (SITE.avatar === "initials") {
    avatar.textContent = initials(SITE.name);
  } else {
    const img = document.createElement("img");
    img.src = SITE.avatar;
    img.alt = SITE.name;
    avatar.appendChild(img);
  }

  document.getElementById("name").textContent = SITE.name;
  document.title = SITE.name;

  const handle = document.getElementById("handle");
  if (SITE.handle) handle.textContent = SITE.handle;
  else handle.remove();

  const tagline = document.getElementById("tagline");
  if (SITE.tagline) tagline.textContent = SITE.tagline;
  else tagline.remove();

  const footer = document.getElementById("footer");
  if (SITE.footer) footer.textContent = SITE.footer;
  else footer.remove();
}

function renderLinks() {
  const list = document.getElementById("links");

  SITE.links.forEach((link, i) => {
    const a = document.createElement("a");
    a.className = "link";
    a.href = link.url;
    a.style.setProperty("--i", i);

    // Only open http(s) destinations in a new tab; mailto/tel should not.
    if (/^https?:/i.test(link.url)) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }

    const icon = document.createElement("span");
    icon.className = "link-icon";
    icon.setAttribute("aria-hidden", "true");
    if (isSvg(link.icon)) icon.innerHTML = link.icon;
    else icon.textContent = link.icon || "🔗";

    const text = document.createElement("span");
    text.className = "link-text";

    const title = document.createElement("span");
    title.className = "link-title";
    title.textContent = link.title;
    text.appendChild(title);

    if (link.description) {
      const desc = document.createElement("span");
      desc.className = "link-desc";
      desc.textContent = link.description;
      text.appendChild(desc);
    }

    a.append(icon, text);

    if (link.badge) {
      const badge = document.createElement("span");
      badge.className = "link-badge";
      badge.textContent = link.badge;
      a.appendChild(badge);
    }

    const arrow = document.createElement("span");
    arrow.className = "link-arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "→";
    a.appendChild(arrow);

    list.appendChild(a);
  });
}

/* Theme: remembers the choice, otherwise follows the OS setting. */
function setupTheme() {
  const stored = localStorage.getItem("theme");
  if (stored) document.documentElement.setAttribute("data-theme", stored);

  document.getElementById("theme-toggle").addEventListener("click", () => {
    const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
    const current =
      document.documentElement.getAttribute("data-theme") ||
      (prefersDark ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}

renderHeader();
renderLinks();
setupTheme();
