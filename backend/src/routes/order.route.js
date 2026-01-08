import express from "express";
import { 
    createCategory, 
    getCategories, 
    getCategoryById, 
    updateCategoryById, 
    deleteCategoryById 
} from "../controllers/category.controller.js";
import { authMiddleware, roleMiddleware } from "../lib/utils.js";

const router = express.Router();

/**
 * @openapi
 * /api/category:
 * get:
 * summary: Get all categories
 * tags:
 * - Categories
 * responses:
 * 200:
 * description: List of categories sorted by order
 */
router.get("/", getCategories);

/**
 * @openapi
 * /api/category/{id}:
 * get:
 * summary: Get category by ID
 * tags:
 * - Categories
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Category found
 * 404:
 * description: Category not found
 */
router.get("/:id", getCategoryById);

/**
 * @openapi
 * /api/category:
 * post:
 * summary: Create a new category
 * tags:
 * - Categories
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - name
 * properties:
 * name:
 * type: string
 * image:
 * type: string
 * order:
 * type: integer
 * responses:
 * 201:
 * description: Category created
 * 400:
 * description: Bad request (name missing)
 */
router.post("/", authMiddleware, roleMiddleware(["admin", "staff"]), createCategory);

/**
 * @openapi
 * /api/category/{id}:
 * put:
 * summary: Update category by ID
 * tags:
 * - Categories
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * name:
 * type: string
 * image:
 * type: string
 * order:
 * type: integer
 * responses:
 * 200:
 * description: Category updated
 * 404:
 * description: Category not found
 */
router.put("/:id", authMiddleware, roleMiddleware(["admin", "staff"]), updateCategoryById);

/**
 * @openapi
 * /api/category/{id}:
 * delete:
 * summary: Delete category by ID
 * tags:
 * - Categories
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Category deleted
 * 404:
 * description: Category not found
 */
router.delete("/:id", authMiddleware, roleMiddleware(["admin", "staff"]), deleteCategoryById);

export default router;