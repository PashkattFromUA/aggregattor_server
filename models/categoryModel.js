import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  slug: { type: String, required: true },
  name: {
    en: { type: String, required: true },
    ru: { type: String, required: true },
    ua: { type: String, required: true },
  },
  description: {
    en: { type: String, required: true },
    ru: { type: String, required: true },
    ua: { type: String, required: true },
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
