import Reservation from "../models/reservation.model.js";
import Notification from "../models/notification.model.js";
import { getIO } from "../lib/socket.js";
import Table from "../models/table.model.js";
// CREATE
export const createReservation = async (req, res) => {
  try {
    const { staffId, customerName, customerNumber, startTime, endTime, guestCount, orderId } = req.body;
    const start = new Date(startTime);
    const end = new Date(endTime);
    const suitableTables = await Table.findOne({ capacity: {$gte: guestCount} }).sort({capacity: 1, number: 1})

    if (!suitableTables) {
      return res.status(404).json({message: "No tables available for this many guests"})
    }

    let assignedTableId = null;

    for (const table of suitableTables) {
      const isOccupied = await Reservation.find({
        tableId: table.number,
        status: { $ne: "CANCELLED" },
        $or: [{startTime: {$lt: end}, endTime: {$gt: start} }]
      })
      if (!isOccupied) {
        assignedTableId = table.number;
        break;
      }
    }
    if (!assignedTableId) {
      return res.status(400).json({ message: "No tables available for the selected time" });
    }

    const newReservation = await Reservation.create({
      tableId: assignedTableId,
      staffId,
      customerName,
      customerNumber,
      startTime,
      endTime,
      guestCount,
      orderId,
      status: "CONFIRMED"
    });

    const newNotification = await Notification.create({
      userId: staffId,
      type: "RESERVATION",
      message: `New reservation! Table: ${assignedTableId}. Waiter: ${staffId}`,
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

export const getFreeTables = async (req, res) => {
  try {
    
  } catch (error) {
    console.error("Error in getFreeTables", error.message)
    return res.status(500).json({message: "Internal server error"})
  }
}

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
