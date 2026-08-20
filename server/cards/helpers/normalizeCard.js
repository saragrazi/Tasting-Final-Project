const { getUser } = require("../../users/models/usersAccessDataService");

const DEFAULT_IMAGE = {
  url: "https://cdn.pixabay.com/photo/2018/03/07/18/42/menu-3206749_640.jpg",
  alt: "תמונת מתכון",
};

const normalizeCard = async (rawCard, userId) => {
  const rawImages = rawCard?.images?.length
    ? rawCard.images
    : rawCard?.image
    ? [rawCard.image]
    : [];

  const images = rawImages.slice(0, 3).map(({ url, alt } = {}) => ({
    url: url || DEFAULT_IMAGE.url,
    alt: alt || DEFAULT_IMAGE.alt,
  }));

  if (images.length === 0) images.push(DEFAULT_IMAGE);

  const author = await getUser(rawCard?.user_id || userId);
  const authorName = `${author.name.first} ${author.name.last}`;

  return {
    ...rawCard,
    images,
    image: images[0],
    user_id: rawCard?.user_id || userId,
    authorName,
  };
};

module.exports = normalizeCard;
