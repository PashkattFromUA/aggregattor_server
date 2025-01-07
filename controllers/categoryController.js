import Category from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
  try {
    const {
      slug,
      name: { en, ru, ua },
    } = req.body;

    const catObj = {
      slug,
      name: { en, ru, ua },
    };

    const category = await Category.create(catObj);

    return res.status(201).json(category);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const category = await Category.findOneAndUpdate(
      {
        _id: categoryId,
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json(category);
  } catch (err) {
    res.status(400).json({ message: "Category to update task" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const category = await Category.findByIdAndDelete({
      _id: categoryId,
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete category" });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const locale = req.headers["accept-language"] || "en";

    const category = await Category.findOne({
      _id: categoryId,
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const localizedCategory = {
      name: category.name[locale] || category.name["en"],
      description: category.description[locale] || category.name["en"],
      slug: category.slug,
      id: category.id,
    };
    
    console.log(localizedCategory);

    return res.status(200).json(localizedCategory);
  } catch (err) {
    res.status(400).json({ message: "Failed to found category" });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const locale = req.headers["accept-language"] || "en";

    const categories = await Category.find();

    const localizedCategories = categories.map((category) => ({
      name: category.name[locale] || category.name["en"],
      description: category.description[locale] || category.name["en"],
      slug: category.slug,
      id: category.id,
    }));
    console.log(localizedCategories);

    return res.status(200).json(localizedCategories);
  } catch (err) {
    res.status(400).json({ message: "Failed to find all categories" });
  }
};
