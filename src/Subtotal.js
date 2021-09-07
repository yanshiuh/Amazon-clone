import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { useHistory } from "react-router";

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();
  const history = useHistory();

  // var totalPrice = 0;
  // const subtotalPrice = (totalPrice) => {
  //   for (let i = 0; i < basket.length; i++) {
  //     const item = basket[i];
  //     totalPrice += item.price;
  //   }
  //   return totalPrice;
  // };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal (<strong>{basket.length}</strong> items):{" "}
              <strong> {value}</strong>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button onClick={() => history.push("/payment")}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
