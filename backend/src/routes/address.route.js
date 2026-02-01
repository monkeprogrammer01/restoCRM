import express from "express";
import { createAddress } from "../controllers/address.controller.js";

const router = express.Router();

/**
 * @openapi
 * /api/address:
 *   post:
 *     summary: Sign up
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - phoneNumber
 *               - password
 *             properties:
 *               fullName:
 *                  type: string
 *                  example: Ivan Ivanov
 *               phoneNumber:
 *                 type: string
 *                 example: 87771234567
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       201:
 *         description: User registered
 */
router.post("/", createAddress);

export default router;