import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import Order from "./Order";
import "./Orders.css";
import { useStateValue } from "./StateProvider";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    }
  }, [user]);

  console.log(orders);

  return (
    <div className="orders">
      <h1>Your orders</h1>

      {user ? (
        <div className="orders_order">
          {orders?.map((order) => (
            <Order order={order} />
          ))}
        </div>
      ) : (
        <h4>Please login first before checking your order</h4>
      )}
    </div>
  );
}

export default Orders;
