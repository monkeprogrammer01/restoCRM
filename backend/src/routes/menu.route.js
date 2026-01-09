import express from "express";
import { 
    createMenu, 
    getAllMenu, 
    updateMenuById, 
    deleteMenuById 
} from "../controllers/menu.controller.js";
import { authMiddleware, roleMiddleware } from "../lib/utils.js";
import { upload } from "../lib/cloudinary.js";
const router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     MenuItem:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Menu item ID
 *         name:
 *           type: string
 *           description: Dish name
 *         description:
 *           type: string
 *           description: Dish description
 *         price:
 *           type: number
 *           description: Price in tenge
 *         image:
 *           type: string
 *           description: Image URL
 *         category:
 *           type: string
 *           description: Category ID
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         _id: "507f1f77bcf86cd799439011"
 *         name: "Стейк Рибай"
 *         description: "Сочный стейк из мраморной говядины"
 *         price: 4500
 *         image: "https://example.com/steak.jpg"
 *         category: "507f1f77bcf86cd799439012"
 *         createdAt: "2024-01-08T10:00:00.000Z"
 *         updatedAt: "2024-01-08T10:00:00.000Z"
 */

/**
 * @openapi
 * /api/menu:
 *   get:
 *     summary: Get all menu items
 *     tags:
 *       - Menu
 *     responses:
 *       200:
 *         description: List of menu items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 menu:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MenuItem'
 *       500:
 *         description: Server error
 */
router.get("/", getAllMenu);

/**
 * @openapi
 * /api/menu:
 *   post:
 *     summary: Create a new menu item
 *     tags:
 *       - Menu
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Стейк Рибай"
 *               description:
 *                 type: string
 *                 example: "Сочный стейк из мраморной говядины"
 *               price:
 *                 type: number
 *                 example: 4500
 *               image:
 *                 type: string
 *                 example: "https://example.com/steak.jpg"
 *               category:
 *                 type: string
 *                 description: ID of the category
 *                 example: "507f1f77bcf86cd799439012"
 *     responses:
 *       201:
 *         description: Menu item created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 menuItem:
 *                   $ref: '#/components/schemas/MenuItem'
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - requires admin or staff role
 */
router.post("/", authMiddleware, roleMiddleware(["admin", "staff"]), upload.single("image"), createMenu);

/**
 * @openapi
 * /api/menu/{id}:
 *   put:
 *     summary: Update menu item by ID
 *     tags:
 *       - Menu
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Menu item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Стейк Рибай Premium"
 *               description:
 *                 type: string
 *                 example: "Премиальный стейк"
 *               price:
 *                 type: number
 *                 example: 5500
 *               image:
 *                 type: string
 *                 example: "https://example.com/steak-premium.jpg"
 *               category:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439012"
 *     responses:
 *       200:
 *         description: Menu item updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 menuItem:
 *                   $ref: '#/components/schemas/MenuItem'
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - requires admin or staff role
 *       404:
 *         description: Menu item not found
 */
router.put("/:id", authMiddleware, roleMiddleware(["admin", "staff"]), updateMenuById);

/**
 * @openapi
 * /api/menu/{id}:
 *   delete:
 *     summary: Delete menu item
 *     tags:
 *       - Menu
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Menu item ID
 *     responses:
 *       200:
 *         description: Menu item deleted
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
 *         description: Menu item not found
 */
router.delete("/:id", authMiddleware, roleMiddleware(["admin", "staff"]), deleteMenuById);

export default router;