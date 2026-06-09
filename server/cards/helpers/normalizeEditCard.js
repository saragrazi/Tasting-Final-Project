
const normalizeEditCard = async (rawCard, userId) => {  
    return {
      ...rawCard,
      user_id: rawCard?.user_id || userId,
    };
  };
  
module.exports = normalizeEditCard;
  