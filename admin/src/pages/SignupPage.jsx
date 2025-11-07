import React from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
export default function SignupPage() {
  return (
    <AuthLayout title="Регистрация">
      <form className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Имя</label>
          <input
            type="text"
            className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Алексей"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Пароль</label>
          <input
            type="password"
            className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600 transition"
        >
          Создать аккаунт
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Уже есть аккаунт?{" "}
          <Link to="/login" className="text-orange-500 hover:underline">
            Войти
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
