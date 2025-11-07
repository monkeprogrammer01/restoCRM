import "../styles/Order.css"

export default function Order() {
  const orders = [
    { id: 1, title: "Заказ №1", status: "В процессе" },
    { id: 2, title: "Заказ №2", status: "Завершён" },
    { id: 3, title: "Заказ №3", status: "Ожидает" }
  ];

  return (
    <>
      <div className="cards">
        <h3>Текущие заказы</h3>
        {orders.map(order => (
        <div key={order.id} className="card">
          <div className="card-body">
            <h5 className="card-title">{order.title}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">Стол #1</h6>
            <p className="card-text">Сосиска в тесте</p>
            <button className="btn btn-success">Готово</button>
          </div>
        </div>

        ))}
      </div>
    </>
  );
}
