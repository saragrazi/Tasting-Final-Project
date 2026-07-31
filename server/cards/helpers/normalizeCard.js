const { getUser } = require("../../users/models/usersAccessDataService");

const normalizeCard = async (rawCard, userId) => {
  const { url, alt } = rawCard?.image || {};
  const image = {
    url:
      url ||
      "https://cdn.pixabay.com/photo/2018/03/07/18/42/menu-3206749_640.jpg",
    alt: alt || "תמונת מתכון",
  };

  const author = await getUser(rawCard?.user_id || userId);
  const authorName = `${author.name.first} ${author.name.last}`;

  return {
    ...rawCard,
    image,
    user_id: rawCard?.user_id || userId,
    authorName,
  };
};

module.exports = normalizeCard;
