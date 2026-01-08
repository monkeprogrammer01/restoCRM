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
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Category ID
 *         name:
 *           type: string
 *           description: Category name
 *         description:
 *           type: string
 *           description: Category description
 *         icon:
 *           type: string
 *           description: Category icon
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         _id: "507f1f77bcf86cd799439011"
 *         name: "Горячие блюда"
 *         description: "Основные горячие блюда"
 *         icon: "flame"
 *         createdAt: "2024-01-08T10:00:00.000Z"
 *         updatedAt: "2024-01-08T10:00:00.000Z"
 */

/**
 * @openapi
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 categories:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *       500:
 *         description: Server error
 */
router.get("/", getCategories);

/**
 * @openapi
 * /api/categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 category:
 *                   $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getCategoryById);

/**
 * @openapi
 * /api/categories:
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                  type: string
 *     responses:
 *       201:
 *         description: Order created
 */
router.post("/", authMiddleware, roleMiddleware(["admin", "staff"]), createCategory);

/**
 * @openapi
 * /api/categories/{id}:
 *   put:
 *     summary: Update category by ID
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Салаты"
 *               description:
 *                 type: string
 *                 example: "Свежие салаты"
 *               icon:
 *                 type: string
 *                 example: "leaf"
 *     responses:
 *       200:
 *         description: Category updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 category:
 *                   $ref: '#/components/schemas/Category'
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - requires admin or staff role
 *       404:
 *         description: Category not found
 */
router.put("/:id", authMiddleware, roleMiddleware(["admin", "staff"]), updateCategoryById);

/**
 * @openapi
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete category by ID
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - requires admin or staff role
 *       404:
 *         description: Category not found
 */
router.delete("/:id", authMiddleware, roleMiddleware(["admin", "staff"]), deleteCategoryById);

export default router;