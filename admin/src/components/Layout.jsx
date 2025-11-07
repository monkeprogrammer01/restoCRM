import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div style={{
      backgroundColor: "#f8f9fb",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}>
      <Navbar />
      <main style={{ flex: 1, padding: "40px 60px" }}>
        <Outlet />
      </main>
    </div>
  );
}
