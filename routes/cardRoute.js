import express from "express";
import { createCard, getAllCards, updateCard, deleteCard, getCardById } from "../controllers/cardController.js";
import { upload } from "../middlewares/imagesUpload.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router.use(checkAuth);

router.post(
  "/card",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "icon", maxCount: 1 },
  ]),
  createCard
);

router.get("/cards", getAllCards);
router.get("/card/:id", getCardById);
router.put(
  "/card/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "icon", maxCount: 1 },
  ]),
  updateCard
);
router.delete("/card/:id", deleteCard);

export default router;
