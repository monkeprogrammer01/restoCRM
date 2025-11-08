import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="w-full py-4 bg-white shadow-sm">
      <nav className="max-w-6xl mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-2xl font-semibold">Restaurant</Link>

        <ul className="flex gap-6 text-lg">
          <li><Link to="/menu" className="hover:text-orange-500 transition">Меню</Link></li>
          <li><Link to="/booking" className="hover:text-orange-500 transition">Бронирование</Link></li>
          <li><Link to="/contacts" className="hover:text-orange-500 transition">Контакты</Link></li>
        </ul>
      </nav>
    </header>
  );
}
