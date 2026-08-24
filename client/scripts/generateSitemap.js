/**
 * Generates public/sitemap.xml before every build (see "prebuild" in package.json).
 * Fetches all public recipes from the API so each recipe gets its own sitemap entry.
 * Never throws - if the API is unreachable at build time, falls back to the static routes
 * so a backend hiccup can never fail a deploy.
 */
const fs = require("fs");
const path = require("path");

const SITE_URL = "https://www.my-tasting.com";
const API_URL = process.env.REACT_APP_API_URL || "https://my-tasting.onrender.com";
const OUTPUT_PATH = path.join(__dirname, "..", "public", "sitemap.xml");
const PAGE_SIZE = 100;

const STATIC_ROUTES = [
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/cards", priority: "0.9", changefreq: "daily" },
  { path: "/about", priority: "0.5", changefreq: "monthly" },
  { path: "/terms", priority: "0.3", changefreq: "yearly" },
  { path: "/login", priority: "0.2", changefreq: "yearly" },
  { path: "/signup", priority: "0.2", changefreq: "yearly" },
];

const getCardPath = (card) =>
  `/card-info/${card._id}/${encodeURIComponent(card.title || "")}`;

const fetchAllPublicCards = async () => {
  const cards = [];
  let page = 1;

  while (true) {
    const response = await fetch(
      `${API_URL}/cards/browse?page=${page}&limit=${PAGE_SIZE}`
    );
    if (!response.ok) throw new Error(`API responded with ${response.status}`);
    const { cards: pageCards = [], total = 0 } = await response.json();
    cards.push(...pageCards);
    if (cards.length >= total || pageCards.length === 0) break;
    page += 1;
  }

  return cards;
};

const buildXml = (urls) => {
  const entries = urls
    .map(
      ({ loc, lastmod, changefreq, priority }) => `  <url>
    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
};

const generate = async () => {
  const staticUrls = STATIC_ROUTES.map((route) => ({
    loc: `${SITE_URL}${route.path}`,
    changefreq: route.changefreq,
    priority: route.priority,
  }));

  let cardUrls = [];
  try {
    const cards = await fetchAllPublicCards();
    cardUrls = cards.map((card) => ({
      loc: `${SITE_URL}${getCardPath(card)}`,
      lastmod: card.createdAt ? new Date(card.createdAt).toISOString() : undefined,
      changefreq: "weekly",
      priority: "0.7",
    }));
    console.log(`sitemap: included ${cardUrls.length} recipe pages`);
  } catch (error) {
    console.warn(
      `sitemap: could not fetch recipes from API (${error.message}); writing static routes only`
    );
  }

  fs.writeFileSync(OUTPUT_PATH, buildXml([...staticUrls, ...cardUrls]));
  console.log(`sitemap: wrote ${OUTPUT_PATH}`);
};

generate();
