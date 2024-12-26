import mongoose from "mongoose";

const cardSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      en: { type: String, required: true },
      ru: { type: String, required: true },
      ua: { type: String, required: true },
    },
    slug: { type: String, required: true, unique: true },
    rating: { type: String, required: true },
    ratingUrl: { type: String, required: true },
    link: { type: String, required: true },
    icon: { type: String, required: true },
    image: { type: String, required: true },
    place: {
      en: { type: String, required: true },
      ua: { type: String, required: true },
      ru: { type: String, required: true },
    },
    shortDescription: {
      en: { type: String, required: true },
      ua: { type: String, required: true },
      ru: { type: String, required: true },
    },
    description: {
      en: { type: String, required: true },
      ua: { type: String, required: true },
      ru: { type: String, required: true },
    },
    features: {
      en: { type: String, required: true },
      ua: { type: String, required: true },
      ru: { type: String, required: true },
    },
    seo: {
      en: { type: String, required: true },
      ua: { type: String, required: true },
      ru: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const Card = mongoose.model("Card", cardSchema);

export default Card;
