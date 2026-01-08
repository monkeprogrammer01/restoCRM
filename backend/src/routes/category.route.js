import express from "express"
import { createCategory, getCategories, getCategoryById, updateCategoryById, deleteCategoryById } from "../controllers/category.controller.js"
import { authMiddleware, roleMiddleware } from "../lib/utils.js"

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware(["admin", "staff"]), createCategory)
router.get("/", getCategories)

router.get("/:id", getCategoryById)
router.put("/:id", authMiddleware, roleMiddleware(["admin", "staff"]), updateCategoryById)
router.delete("/:id", authMiddleware, roleMiddleware(["admin", "staff"]), deleteCategoryById)

export default router;