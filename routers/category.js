import express from "express";
import { category_controller } from "../controllers/category_controller.js";
const router = express.Router();
router.get("/", category_controller.getAllSubCategory);
router.post("/", category_controller.createSubCategory);
router.put("/", category_controller.updateSubCategory);
router.delete("/", category_controller.deleteSubCategory);

export default router;
