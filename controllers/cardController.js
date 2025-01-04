import Card from "../models/cardModel.js";
import { promises as fsPromises } from "fs";
import path from "path";

export const createCard = async (req, res) => {
  try {
    const { files, body } = req;

    if (!files.icon) {
      return res.status(400).json({ message: "Icon are required" });
    }

    const card = await Card.create({
      ...body,
      icon: `/uploads/${files.icon[0].filename}`
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

    let newIconPath = card.icon;

    if (files.icon && files.icon[0]) {
      const oldIconPath = path.join(
        process.cwd(),
        "uploads",
        card.icon.split("/").pop()
      );
      if (await fsPromises.stat(oldIconPath).catch(() => false)) {
        await fsPromises.unlink(oldIconPath); 
      }
      newIconPath = `/uploads/${files.icon[0].filename}`;
    }

    const updatedCard = await Card.findByIdAndUpdate(
      id,
      {
        ...body,
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

    const iconPath = path.join(
      process.cwd(),
      "uploads",
      card.icon.split("/").pop()
    );

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
    const locale = req.headers["accept-language"] || "en";
    const card = await Card.findById(id);

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    const localizedCard = {
      category: card.category[locale] || card.category["en"],
      place: card.place[locale] || card.place["en"],
      shortDescription: card.shortDescription[locale] || card.shortDescription["en"],
      description: card.description[locale] || card.description["en"],
      features: card.features[locale] || card.features["en"],
      seo: card.seo[locale] || card.seo["en"],
      slug: card.slug,
      id: card.id,
      name: card.name,
      rating: card.rating,
      ratingUrl: card.ratingUrl,
      link: card.link,
      icon: card.icon,
    };
    console.log(localizedCard);

    res.status(200).json(localizedCard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllCards = async (req, res) => {
  try {
    const locale = req.headers["accept-language"] || "en";

    const cards = await Card.find();

    const localizedCards = cards.map((card) => ({
      category: card.category[locale] || card.category["en"],
      place: card.place[locale] || card.place["en"],
      shortDescription: card.shortDescription[locale] || card.shortDescription["en"],
      description: card.description[locale] || card.description["en"],
      features: card.features[locale] || card.features["en"],
      seo: card.seo[locale] || card.seo["en"],
      slug: card.slug,
      id: card.id,
      name: card.name,
      rating: card.rating,
      ratingUrl: card.ratingUrl,
      link: card.link,
      icon: card.icon,
    }));
    console.log(localizedCards);
    return res.status(200).json(localizedCards);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
