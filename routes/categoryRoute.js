import express from "express";
import * as categoryConttroller from "../controllers/categoryController.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router.use(checkAuth);

router.post("/category", categoryConttroller.createCategory);

router.get("/category/all", categoryConttroller.getAllCategories);
router.get("/category/:id", categoryConttroller.getCategoryById);

router.put("/category/:id", categoryConttroller.updateCategory);

router.delete("/category/:id", categoryConttroller.deleteCategory);

export default router;
