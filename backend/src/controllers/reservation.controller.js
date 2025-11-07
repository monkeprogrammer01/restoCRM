import Reservation from "../models/reservation.model.js";
import Notification from "../models/notification.model.js";
import { getIO } from "../lib/socket.js";

// CREATE
export const createReservation = async (req, res) => {
  try {
    const { tableId, staffId, customerNumber, startTime, endTime } = req.body;

    const newReservation = await Reservation.create({
      tableId,
      staffId,
      customerNumber,
      startTime,
      endTime,
    });

    const newNotification = await Notification.create({
      userId: staffId,
      type: "RESERVATION",
      message: `New reservation! Table: ${tableId}. Waiter: ${staffId}`,
    });

    console.log(newNotification.message);

    const io = getIO();
    io.to(staffId.toString()).emit("newNotification", newNotification);

    return res.status(201).json(newReservation);
  } catch (error) {
    console.error("Error in createReservationController:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// READ ALL
export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    return res.status(200).json(reservations);
  } catch (error) {
    console.error("Error in getReservations:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// READ BY ID
export const getReservationById = async (req, res) => {
  try {
    const reservationId = req.params.id;
    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    return res.status(200).json(reservation);
  } catch (error) {
    console.error("Error in getReservationById:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE
export const deleteReservationById = async (req, res) => {
  try {
    const reservationId = req.params.id;
    const deletedReservation = await Reservation.findByIdAndDelete(reservationId);

    if (!deletedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    return res.status(200).json({ message: "Reservation deleted successfully" });
  } catch (error) {
    console.error("Error in deleteReservationById:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE
export const updateReservationById = async (req, res) => {
  try {
    const reservationId = req.params.id;
    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservationId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    return res.status(200).json(updatedReservation);
  } catch (error) {
    console.error("Error in updateReservationById:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
