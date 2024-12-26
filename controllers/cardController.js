import Card from "../models/cardModel.js";
import { promises as fsPromises } from "fs";
import path from "path";

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

    let newImagePath = card.image;
    let newIconPath = card.icon;

    if (files.image && files.image[0]) {
      const oldImagePath = path.join(
        process.cwd(),
        "uploads",
        card.image.split("/").pop()
      );
      if (await fsPromises.stat(oldImagePath).catch(() => false)) {
        await fsPromises.unlink(oldImagePath); // Удаляем старый файл
      }
      newImagePath = `/uploads/${files.image[0].filename}`;
    }

    if (files.icon && files.icon[0]) {
      const oldIconPath = path.join(
        process.cwd(),
        "uploads",
        card.icon.split("/").pop()
      );
      if (await fsPromises.stat(oldIconPath).catch(() => false)) {
        await fsPromises.unlink(oldIconPath); // Удаляем старый файл
      }
      newIconPath = `/uploads/${files.icon[0].filename}`;
    }

    const updatedCard = await Card.findByIdAndUpdate(
      id,
      {
        ...body,
        image: newImagePath,
        icon: newIconPath,
      },
      { new: true }
    );

    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;

    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    const imagePath = path.join(
      process.cwd(),
      "uploads",
      card.image.split("/").pop()
    );
    const iconPath = path.join(
      process.cwd(),
      "uploads",
      card.icon.split("/").pop()
    );

    if (await fsPromises.stat(imagePath).catch(() => false)) {
      await fsPromises.unlink(imagePath);
    }

    if (await fsPromises.stat(iconPath).catch(() => false)) {
      await fsPromises.unlink(iconPath);
    }

    await Card.findByIdAndDelete(id);

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
