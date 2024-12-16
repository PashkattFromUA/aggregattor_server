import express from "express";
import { createCard, getAllCards } from "../controllers/cardController.js";
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

export default router;
