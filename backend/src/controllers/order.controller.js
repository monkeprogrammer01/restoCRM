import Order from "../models/order.model.js";
import Notification from "../models/notification.model.js";
import { getIO } from "../lib/socket.js";

// CREATE
export const createOrder = async (req, res) => {
  try {
    const { tableId, userId, status, items, addressId, paymentMethod, paymentStatus } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({message: "Order must have at least one item"})
    }

    let calculatedTotal = 0;
    const itemsWithDetails = await Promise.all(items.map(async (item) => {
      const dish = await Menu.findById(item.dishId);
      if (!dish) throw new Error(`Dish with id ${item.dishId} not found`);
      const itemPrice = dish.price;
      calculatedTotal += itemPrice * item.quantity;

      return {
        dishId: item.dishId,
        quantity: item.quantity,
        price: itemPrice
      };
    })) 

    const newOrder = await Order.create({
      tableId,
      userId,
      status,
      addressId,
      total_check: calculatedTotal,
      items: itemsWithDetails,
    });

    const newNotification = await Notification.create({
      userId: staffId,
      type: "ORDER",
      message: `New order created: #${newOrder._id.toString().slice(-4)} created for ${tableId}`,
    });

    console.log(newNotification.message);

    const io = getIO();
    io.to(staffId.toString()).emit("newNotification", newNotification);

    return res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error in createOrderController:", error.message);
    const status = error.message.includes("not found") ? 404 : 500;
    return res.status(status).json({ message: error.message });
  }
};

// READ ALL
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("staffId", "name")
      .populate("items.dishId", "name image price")
      .sort({createdAt: -1})
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
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, {
      new: true,
      runValidators: true,
    }).populate("staffId", "name");

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (status) {
      const newNotification = await Notification.create({
        userId: updatedOrder.staffId,
        type: "ORDER_UPDATE",
        message: `Order #${updatedOrder._id.toString().slice(-4)} status changed to: ${status}`,
      })

      const io = getIO();
      io.to(updatedOrder.staffId._id.toString()).emit("newNotification", newNotification)
    }


    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error in updateOrderById:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
