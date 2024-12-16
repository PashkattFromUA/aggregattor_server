import Card from "../models/cardModel.js";

export const createCardWithImages = async (req, res) => {
  try {
    const { files, body } = req;

    if (!files.image || !files.icon) {
      return res.status(400).json({ message: "Image and icon are required" });
    }

    const card = await Card.create({
      ...body,
      image: `/uploads/${files.image[0].filename}`,
      icon: `/uploads/${files.icon[0].filename}`,
    });

    await card.save();
    res.status(201).json(card);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
