import express from "express"
import { createReservation, deleteReservationById, getReservations, getReservationById, updateReservationById } from "../controllers/reservation.controller.js"
import { authMiddleware } from "../lib/utils.js";
const router = express.Router();

// CREATE
router.post("/", authMiddleware, createReservation);

// READ
router.get("/", getReservations)
router.get("/:id", getReservationById)

// UPDATE
router.put("/:id", updateReservationById)

// DELETE
router.delete("/:id", deleteReservationById)

export default router;