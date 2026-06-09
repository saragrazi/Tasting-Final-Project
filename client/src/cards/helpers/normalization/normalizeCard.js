const normalizeCard = card => {
    return {
        title: card.title,
    subtitle: card.subtitle,
    ingredients: card.ingredients,
    cookingSteps: card.cookingSteps,
    category: card.category,
    user_id: card.user_id,
    };
};

export default normalizeCard;