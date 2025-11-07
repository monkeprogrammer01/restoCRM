import express from "express"
import { createOrder, deleteOrderById, getOrderById, getOrders, updateOrderById } from "../controllers/order.controller.js";
import { authMiddleware } from "../lib/utils.js";
const router = express.Router();

// CREATE
router.post("/", authMiddleware, createOrder)

// READ
router.get("/", getOrders)
router.get("/:id", getOrderById);

// UPDATE
router.put("/:id", updateOrderById);

// DELETE
router.delete("/:id", deleteOrderById)

export default router;