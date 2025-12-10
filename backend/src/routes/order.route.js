import express from "express";
import { createOrder, deleteOrderById, getOrderById, getOrders, updateOrderById } from "../controllers/order.controller.js";
import { authMiddleware } from "../lib/utils.js";

const router = express.Router();

/**
 * @openapi
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: List of orders
 */
router.get("/", getOrders);

/**
 * @openapi
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order found
 *       404:
 *         description: Order not found
 */
router.get("/:id", getOrderById);

/**
 * @openapi
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Order created
 */
router.post("/", authMiddleware, createOrder);

/**
 * @openapi
 * /api/orders/{id}:
 *   put:
 *     summary: Update order by ID
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Order updated
 *       404:
 *         description: Order not found
 */
router.put("/:id", updateOrderById);

/**
 * @openapi
 * /api/orders/{id}:
 *   delete:
 *     summary: Delete order by ID
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted
 *       404:
 *         description: Order not found
 */
router.delete("/:id", deleteOrderById);

export default router;
