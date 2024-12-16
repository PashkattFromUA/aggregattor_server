import express from "express";
import { createCardWithImages } from "../controllers/cardController.js";
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
  createCardWithImages
);

export default router;
