import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  categoryEn: {
    type: String,
    required: true,
  },
  categoryRu: {
    type: String,
    required: true,
  },
  categoryUa: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  rating: {
    type: String,
    required: true,
  },
  ratingUrl: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  placeEn: {
    type: String,
    required: true,
  },
  placeUa: {
    type: String,
    required: true,
  },
  placeRu: {
    type: String,
    required: true,
  },
  shortdescriptionEn: {
    type: String,
    required: true,
  },
  shortdescriptionUa: {
    type: String,
    required: true,
  },
  shortdescriptionRu: {
    type: String,
    required: true,
  },
  descriptionEn: {
    type: String,
    required: true,
  },
  descriptionUa: {
    type: String,
    required: true,
  },
  descriptionRu: {
    type: String,
    required: true,
  },
  featuresEn: {
    type: String,
    required: true,
  },
  featuresUa: {
    type: String,
    required: true,
  },
  featuresRu: {
    type: String,
    required: true,
  },
  seoEn: {
    type: String,
    required: true,
  },
  seoUa: {
    type: String,
    required: true,
  },
  seoRu: {
    type: String,
    required: true,
  },
});

const Card = mongoose.model("Card", cardSchema);

export default Card;
