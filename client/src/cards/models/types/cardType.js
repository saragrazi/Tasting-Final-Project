import { shape, string, arrayOf, number, object } from "prop-types";


const cardType = shape({
  _id: string.isRequired,
  title: string.isRequired,
  subtitle: string.isRequired,
  inspiredBy: string,
  ingredients: arrayOf(object).isRequired,
  cookingSteps: string.isRequired,
  category: string.isRequired,
  prepTime: number,
  measuringCup: string,
  tips: string,
  videoLink: string,
  authorName: string,
  user_id: string.isRequired,
  createdAt: string.isRequired,
  likes: arrayOf(string).isRequired,
  ratings: arrayOf(object),
  comments: arrayOf(object),
  averageRating: number,
});

export default cardType;