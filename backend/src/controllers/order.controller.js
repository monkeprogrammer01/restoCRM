import Order from "../models/order.model.js";
import Notification from "../models/notification.model.js";
import { getIO } from "../lib/socket.js";

// CREATE
export const createOrder = async (req, res) => {
  try {
    const { tableId, staffId, status, total_check, items } = req.body;

    const newOrder = await Order.create({
      tableId,
      staffId,
      status,
      total_check,
      items,
    });

    const newNotification = await Notification.create({
      userId: staffId,
      type: "ORDER",
      message: `New order created: ${newOrder._id}`,
    });

    console.log(newNotification.message);

    const io = getIO();
    io.to(staffId.toString()).emit("newNotification", newNotification);

    return res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error in createOrderController:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// READ ALL
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error in getOrders:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// READ BY ID
export const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error("Error in getOrderById:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE
export const deleteOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error in deleteOrderById:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE
export const updateOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error in updateOrderById:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
