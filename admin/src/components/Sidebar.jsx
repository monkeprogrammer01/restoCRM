import React from "react";
import { Dashboard, ReceiptLong, RestaurantMenu, People, Logout } from "@mui/icons-material";
import "../styles/Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">🍕 PizzaAdmin</h2>
      <ul className="sidebar-menu">
        <li><Dashboard /> Dashboard</li>
        <li><ReceiptLong /> Orders</li>
        <li><RestaurantMenu /> Menu</li>
        <li><People /> Customers</li>
      </ul>
      <div className="sidebar-footer">
        <Logout /> Logout
      </div>
    </div>
  );
}
