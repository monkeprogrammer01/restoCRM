import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import LoginPage from "./pages/LoginPage.jsx"
import OrdersPage from "./pages/Orders.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
function App() {
  return <>

    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />}/>
      </Route>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Route>

    </Routes>
  </>;
}

export default App;
