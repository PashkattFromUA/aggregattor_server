import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nameEn: {
    type: String,
    required: true,
  },
  nameUa: {
    type: String,
    required: true,
  },
  nameRu: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
