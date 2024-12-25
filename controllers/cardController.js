import Card from "../models/cardModel.js";
import fs from 'fs';
import path from 'path';

export const createCard = async (req, res) => {
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

export const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { files, body } = req;

    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    let newImagePath = card.image;  // Default to current image path
    let newIconPath = card.icon;    // Default to current icon path

    // Delete old image if new image uploaded
    if (files.image && files.image[0]) {
      const oldImagePath = path.join(process.cwd(), 'uploads', card.image.split('/').pop());
      if (fs.existsSync(oldImagePath)) {
        await fs.unlink(oldImagePath);  // Delete old image
      }
      newImagePath = `/uploads/${files.image[0].filename}`;  // New image path
    }

    // Delete old icon if new icon uploaded
    if (files.icon && files.icon[0]) {
      const oldIconPath = path.join(process.cwd(), 'uploads', card.icon.split('/').pop());
      if (fs.existsSync(oldIconPath)) {
        await fs.unlink(oldIconPath);  // Delete old icon
      }
      newIconPath = `/uploads/${files.icon[0].filename}`;  // New icon path
    }

    const updatedCard = await Card.findByIdAndUpdate(id, {
      ...body,
      image: newImagePath,
      icon: newIconPath,
    }, { new: true });

    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete Card
export const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;

    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    const imagePath = path.join(process.cwd(), 'uploads', card.image.split('/').pop());
    const iconPath = path.join(process.cwd(), 'uploads', card.icon.split('/').pop());

    if (fs.existsSync(imagePath)) {
      await fs.unlink(imagePath);  // Delete old image
    }

    if (fs.existsSync(iconPath)) {
      await fs.unlink(iconPath);  // Delete old icon
    }

    await Card.findByIdAndDelete(id);  // Delete card from the database

    res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCardById = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.status(200).json(card);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    return res.status(200).json(cards);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
