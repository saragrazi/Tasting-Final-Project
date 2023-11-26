
const normalizeCard = async (rawCard, userId) => {
  const { url } = rawCard?.image || {};
  const image = {
    url:
      url ||
      "https://cdn.pixabay.com/photo/2018/03/07/18/42/menu-3206749_640.jpg",
    alt: "Recipe card image",
  };

  return {
    ...rawCard,
    image,
    user_id: rawCard?.user_id || userId,
  };
};

module.exports = normalizeCard;
