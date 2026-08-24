export const SITE_URL = "https://www.my-tasting.com";
export const SITE_NAME = "Tasting";
// Fixed brand suffix appended to every page's <title> (via Seo.jsx), so it stays
// consistent across the whole site instead of only appearing on one page.
export const BRAND_SUFFIX = "Tasting - טעימה | קהילת מתכונים לבישול ואפייה";
export const DEFAULT_TITLE = BRAND_SUFFIX;
export const DEFAULT_DESCRIPTION =
  "Tasting - טעימה. קהילת מתכונים לבישול ואפייה. מצאו מתכונים חדשים עם מרכיבים ושלבי הכנה ברורים, דרגו והגיבו, ושתפו את המתכונים שלכם עם כולם.";
export const DEFAULT_IMAGE = `${SITE_URL}/assets/images/default-recipe.jpg`;

export const absoluteUrl = (path = "") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
