import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Orders.module.css";

// icons
import { FaDotCircle } from "react-icons/fa"; // status icon

// hooks
import useFetch from "../../hooks/useFetch";

function Orders() {
  // states
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && currentUser._id) {
      setUserId(currentUser._id);
    }
  }, []);

  const { data, loading, error } = useFetch(
    userId ? `http://localhost:9000/users/${userId}/orders` : null
  );

  useEffect(() => {
    if (data) {
      setOrders(data.orders);
    }
  }, [data]);

  if (loading) {
    // return <h1>Loading...</h1>;
  }
  if (error) {
    // return <h1>Error: {error}</h1>;
  }

  // changes all the orders' status to "Completed" except the last one
  orders.forEach((order, i) => {
    if (i !== 0) {
      order.status = "Completed";
    }
  });

  return (
    <div className={styles.orders}>
      <h1 className={styles.ordersTitle}>Orders</h1>

      <div className={styles.ordersList}>
        {orders.map((order, i) => (
          <div key={order._id} className={styles.order}>
            <div className={styles.orderHeader}>
              <p className={styles.orderStatus}>
                <FaDotCircle
                  className={
                    styles.orderStatusIcon +
                    " " +
                    (order.status === "Completed"
                      ? styles.completed
                      : styles.pending)
                  }
                />
                {order.status}
              </p>
              <p className={styles.orderDate}>
                {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className={styles.orderItems}>
              {order.items.map((item) => (
                <Link
                  key={item._id}
                  className={styles.orderItem}
                  to={`/products/${item.product_id.slug}`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.orderItemImage}
                  />
                  <div className={styles.orderItemDetails}>
                    <p className={styles.orderItemName}>
                      {item.product_id.title}
                    </p>
                    <p className={styles.orderItemPrice}>
                      Price: ${item.price}
                    </p>
                    <p className={styles.orderItemQuantity}>{item.quantity}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className={styles.orderFooter}>
              <p className={styles.orderTotal}>
                Total: <span>${order.total_amount}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
