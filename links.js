/*
 * ============================================================
 *  EDIT THIS FILE — it is the only one you need to touch.
 * ============================================================
 *
 *  icon:  leave empty to get the index number (01, 02, …), which is
 *         the intended look. An inline <svg>…</svg> is drawn in the
 *         accent colour. An emoji works too, but sits oddly against
 *         the rest of the palette.
 *  url:   full URL including https://
 *  badge: optional small tag on the right (or omit)
 */

const SITE = {
  name: "Army Builders",
  handle: "rsvn.dk",

  // Small label above the title.
  eyebrow: "Warhammer 40,000",

  // Optional line under the rule. "" hides it.
  tagline: "",

  // Accent colour. Drives every highlight, glow and rule on the page.
  accent: "#4fe3b0",

  links: [
    {
      icon: "",
      title: "Chaos Daemons",
      description: "Army builder for Chaos Daemons.",
      url: "https://cd.rsvn.dk",
    },
    {
      icon: "",
      title: "Leagues of Votann",
      description: "Army builder for the Leagues of Votann.",
      url: "https://votann.rsvn.dk",
    },
    {
      icon: "",
      title: "Orks",
      description: "Army builder for Orks.",
      url: "https://orks.rsvn.dk",
      badge: "New",
    },
    {
      icon: "",
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

/* "CD.RSVN.DK" for a web address; nothing for mailto:/tel:. */
function hostLabel(url) {
  try {
    const { protocol, hostname } = new URL(url);
    return /^https?:$/.test(protocol) ? hostname.replace(/^www\./, "") : "";
  } catch {
    return "";
  }
}

function renderMasthead() {
  document.documentElement.style.setProperty("--accent", SITE.accent);
  document.title = SITE.name;

  const eyebrow = document.getElementById("eyebrow");
  if (SITE.eyebrow) eyebrow.textContent = SITE.eyebrow;
  else eyebrow.closest(".eyebrow").remove();

  // The first word goes in the lit panel, the remainder alongside it.
  const [lead, ...rest] = SITE.name.split(/\s+/).filter(Boolean);
  const tail = rest.join(" ");
  document.getElementById("title-lead").textContent = lead;

  const titleRest = document.getElementById("title-rest");
  titleRest.textContent = tail;
  titleRest.dataset.text = tail; // the glitch layer copies this

  const handle = document.getElementById("handle");
  if (SITE.handle) handle.textContent = SITE.handle;
  else handle.closest(".rule").remove();

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

    // Index number by default; an icon only if one was given.
    let marker;
    if (link.icon) {
      marker = document.createElement("span");
      marker.className = "link-icon";
      marker.setAttribute("aria-hidden", "true");
      if (isSvg(link.icon)) marker.innerHTML = link.icon;
      else marker.textContent = link.icon;
    } else {
      marker = document.createElement("span");
      marker.className = "link-index";
      marker.setAttribute("aria-hidden", "true");
      marker.textContent = String(i + 1).padStart(2, "0");
    }

    const body = document.createElement("span");
    body.className = "link-body";

    const title = document.createElement("span");
    title.className = "link-title";
    title.textContent = link.title;
    body.appendChild(title);

    if (link.description) {
      const desc = document.createElement("span");
      desc.className = "link-desc";
      desc.textContent = link.description;
      body.appendChild(desc);
    }

    a.append(marker, body);

    if (link.badge) {
      const badge = document.createElement("span");
      badge.className = "link-badge";
      badge.textContent = link.badge;
      a.appendChild(badge);
    }

    const host = hostLabel(link.url);
    if (host) {
      const hostEl = document.createElement("span");
      hostEl.className = "link-host";
      hostEl.setAttribute("aria-hidden", "true");
      hostEl.textContent = host;
      a.appendChild(hostEl);
    }

    const go = document.createElement("span");
    go.className = "link-go";
    go.setAttribute("aria-hidden", "true");
    go.textContent = "▸";
    a.appendChild(go);

    list.appendChild(a);
  });
}

renderMasthead();
renderLinks();
