import "../styles/Sidebar.css";

export default function MainPage() {
  const orders = [
    { id: 1, title: "Маргарита", status: "Готовится", price: "2500₸" },
    { id: 2, title: "Пепперони", status: "Готов", price: "2700₸" },
    { id: 3, title: "4 Сыра", status: "В пути", price: "3000₸" },
  ];

  return (
    <div className="main-page">
      <header>
        <h1>Добро пожаловать, Арсен 👋</h1>
        <p>Ваши текущие заказы</p>
      </header>

      <div className="orders-grid">
        {orders.map((order) => (
          <div className="order-card" key={order.id}>
            <h3>{order.title}</h3>
            <p>Статус: <b>{order.status}</b></p>
            <p className="price">{order.price}</p>
            <button>Подробнее</button>
          </div>
        ))}
      </div>
    </div>
  );
}
