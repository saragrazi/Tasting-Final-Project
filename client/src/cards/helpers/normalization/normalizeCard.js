const normalizeCard = card => {
    return {
        title: card.title,
    subtitle: card.subtitle,
    ingredients: card.ingredients,
    cookingSteps: card.cookingSteps,
    category: card.category,
    prepTime: card.prepTime,
    measuringCup: card.measuringCup,
    tips: card.tips,
    videoLink: card.videoLink || "",
    user_id: card.user_id,
    isPrivate: Boolean(card.isPrivate),
    };
};

export default normalizeCard;