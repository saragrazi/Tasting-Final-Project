export const SITE_URL = "https://www.my-tasting.com";
export const SITE_NAME = "Tasting";
// Used in <title> tags so the site also surfaces for the Hebrew word "טעימה" (tasting).
export const BRAND_SUFFIX = "Tasting - טעימה";
export const DEFAULT_TITLE = "Tasting - טעימה | קהילת מתכונים לבישול ולאפייה";
export const DEFAULT_DESCRIPTION =
  "Tasting - טעימה. קהילת מתכונים לבישול ואפייה. מצאו מתכונים חדשים עם מרכיבים ושלבי הכנה ברורים, דרגו והגיבו, ושתפו את המתכונים שלכם עם כולם.";
export const DEFAULT_IMAGE = `${SITE_URL}/assets/images/default-recipe.jpg`;

export const absoluteUrl = (path = "") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
