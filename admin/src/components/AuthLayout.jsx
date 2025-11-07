import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-100 to-orange-300">
      <div className="bg-white shadow-xl rounded-3xl w-[400px] p-8">
        {/* Здесь будет LoginPage или SignupPage */}
        <Outlet />
      </div>
    </div>
  );
}
