import { absoluteUrl, SITE_NAME } from "../../config/seoConfig";
import { getCardPath } from "./cardUrl";

const toIsoDuration = (minutes) => {
  const total = Number(minutes);
  if (!total) return undefined;
  const hours = Math.floor(total / 60);
  const remainder = Math.round(total % 60);
  let duration = "P";
  if (hours) duration += `T${hours}H${remainder ? `${remainder}M` : ""}`;
  else duration += `T${remainder}M`;
  return duration;
};

const buildRecipeJsonLd = (card) => {
  if (!card) return null;

  const ingredients = Array.isArray(card.ingredients)
    ? card.ingredients
        .map((ingredient) =>
          [ingredient.quantity, ingredient.name].filter(Boolean).join(" ")
        )
        .filter(Boolean)
    : (card.ingredients || "").split("\n").map((row) => row.trim()).filter(Boolean);

  const instructions = (card.cookingSteps || "")
    .split("\n")
    .map((row) => row.trim())
    .filter(Boolean)
    .map((text) => ({ "@type": "HowToStep", text }));

  const image = card.images?.length
    ? card.images.map((img) => img.url).filter(Boolean)
    : card.image?.url
    ? [card.image.url]
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: card.title,
    description: card.subtitle || undefined,
    image,
    author: card.authorName ? { "@type": "Person", name: card.authorName } : undefined,
    datePublished: card.createdAt || undefined,
    prepTime: toIsoDuration(card.prepTime),
    recipeIngredient: ingredients.length ? ingredients : undefined,
    recipeInstructions: instructions.length ? instructions : undefined,
    aggregateRating:
      card.ratings?.length > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: Number(card.averageRating || 0).toFixed(1),
            ratingCount: card.ratings.length,
          }
        : undefined,
    url: absoluteUrl(getCardPath(card)),
    publisher: { "@type": "Organization", name: SITE_NAME },
  };
};

export default buildRecipeJsonLd;
