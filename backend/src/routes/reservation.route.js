import express from "express"
import { createReservation, deleteReservationById, getReservations, getReservationById, updateReservationById } from "../controllers/reservation.controller.js"
import { authMiddleware } from "../lib/utils.js";
const router = express.Router();

// CREATE
/**
 * @openapi
 * /api/reservations:
 *   post:
 *     summary: Create reservation
 *     tags:
 *       - Reservations
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tableId
 *               - staffId
 *               - customerNumber
 *               - startTime
 *               - endTime
 *             properties:
 *               tableId:
 *                 type: string
 *               staffId:
 *                 type: string
 *               customerNumber:
 *                 type: number
 *               startTime:
 *                 type: string
 *               endTime:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reservation created
 */
router.post("/", authMiddleware, createReservation);

// READ
/**
 * @openapi
 * /api/reservations:
 *   get:
 *     summary: Get all reservations
 *     tags:
 *       - Reservations
 *     responses:
 *       200:
 *         description: List of reservations
 */
router.get("/", getReservations)

/**
 * @openapi
 * /api/reservations/{id}:
 *   get:
 *     summary: Get reservation by ID
 *     tags:
 *       - Reservations
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Reservation ID
 *     responses:
 *       200:
 *         description: Reservation found
 *       404:
 *         description: Reservation not found
 */
router.get("/:id", getReservationById)

// UPDATE
/**
 * @openapi
 * /api/reservations/{id}:
 *   put:
 *     summary: Update reservation
 *     tags:
 *       - Reservations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reservation updated
 *       404:
 *         description: Reservation not found
 */
router.put("/:id", updateReservationById)

// DELETE
/**
 * @openapi
 * /api/reservations/{id}:
 *   delete:
 *     summary: Delete reservation
 *     tags:
 *       - Reservations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reservation deleted
 *       404:
 *         description: Reservation not found
 */
router.delete("/:id", deleteReservationById)


export default router;