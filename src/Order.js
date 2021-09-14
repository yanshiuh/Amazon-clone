import React, { useState } from "react";
import "./Order.css";
import moment from "moment";
import BasketItem from "./BasketItem";
import CurrencyFormat from "react-currency-format";
import { userInfo } from "os";
import { useStateValue } from "./StateProvider";

function Order({ order }) {
  console.log(
    "orders:",
    new Date(order.data.created?.toDate()).toLocaleString()
  );
  return (
    <div className="order">
      <h2>Order</h2>
      {/* <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p> */}
      <p style={{ marginTop: "10px" }}>
        Order Time: {new Date(order.data.created?.toDate()).toLocaleString()}
      </p>

      <p className="order_id">
        <small>Order id: {order.id}</small>
      </p>

      {order.data.basket?.map((item) => (
        <BasketItem
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hideButton={true}
        />
      ))}

      <CurrencyFormat
        renderText={(value) => (
          <h3 className="order_total">Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={order.data.amount}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
}

export default Order;
