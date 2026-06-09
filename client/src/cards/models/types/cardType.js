import { shape, string, arrayOf } from "prop-types";


const cardType = shape({
  _id: string.isRequired,
  title: string.isRequired,
  subtitle: string.isRequired,
  ingredients: string.isRequired,
  cookingSteps: string.isRequired,
  category: string.isRequired,
  user_id: string.isRequired,
  createdAt: string.isRequired,
  likes: arrayOf(string).isRequired,
});

export default cardType;