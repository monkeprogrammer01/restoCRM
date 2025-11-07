import React from "react";
import { Button, IconButton } from "@mui/material";
import {
  Notifications,
  AccountCircle,
  Dashboard,
  ShoppingCart,
  RestaurantMenu,
  People,
} from "@mui/icons-material";

export default function Navbar() {
  return (
    <header
      style={{
        height: "72px",
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 60px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <h2 style={{ fontWeight: 700, color: "#ff9f0a" }}>🍕Admin</h2>

        <nav style={{ display: "flex", gap: "12px" }}>
          <Button
            startIcon={<Dashboard />}
            sx={{
              color: "#333",
              textTransform: "none",
              fontWeight: 500,
              "&:hover": { color: "#ff9f0a" },
            }}
          >
            ГЛАВНАЯ
          </Button>
          <Button
            startIcon={<ShoppingCart />}
            sx={{
              color: "#333",
              textTransform: "none",
              fontWeight: 500,
              "&:hover": { color: "#ff9f0a" },
            }}
          >
            ЗАКАЗЫ
          </Button>
          <Button
            startIcon={<RestaurantMenu />}
            sx={{
              color: "#333",
              textTransform: "none",
              fontWeight: 500,
              "&:hover": { color: "#ff9f0a" },
            }}
          >
            МЕНЮ
          </Button>
          <Button
            startIcon={<People />}
            sx={{
              color: "#333",
              textTransform: "none",
              fontWeight: 500,
              "&:hover": { color: "#ff9f0a" },
            }}
          >
            КЛИЕНТЫ
          </Button>
        </nav>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <IconButton>
          <Notifications sx={{ color: "#666" }} />
        </IconButton>
        <IconButton>
          <AccountCircle sx={{ color: "#666" }} />
        </IconButton>
      </div>
    </header>
  );
}
