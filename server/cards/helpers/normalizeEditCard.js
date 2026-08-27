
const normalizeEditCard = async (rawCard, userId) => {
    return {
      ...rawCard,
      user_id: rawCard?.user_id || userId,
      prepTime: rawCard?.prepTime === "" || rawCard?.prepTime === undefined ? null : rawCard.prepTime,
    };
  };
  
module.exports = normalizeEditCard;
  