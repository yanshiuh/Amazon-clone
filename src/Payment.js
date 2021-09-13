import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";
import BasketItem from "./BasketItem";
import "./Payment.css";
import { getBasketTotal } from "./reducer";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router-dom";
import { db } from "./firebase";
import firebase from "firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  // The payment process won't be work successfully as we should subscribe to Blaze Plan in firebase

  useEffect(() => {
    console.log("payment start?");
    // generate the special stripe secret whioch allows us to charge a customer
    // const getClientSecret = async () => {
    //   console.log("payment procceed?");
    //   const response = await axios({
    //     method: "post",
    //     url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
    //   });
    //   console.log("payment on?");
    //   setClientSecret(response.data.clientSecret);
    //   console.log("clientSecret: ", clientSecret);
    // };

    // getClientSecret();
    // console.log("payment done?");
  }, [basket]);

  console.log("The Secret is >>>", clientSecret);

  const handleSubmit = async (event) => {
    // do all the fancy stripe stuff
    event.preventDefault();
    setProcessing(true);
    console.log("payment there?");

    if (user) {
      db.collection("users").add({
        email: user.email,
        basket: basket,
        amount: getBasketTotal(basket),
        created: firebase.firestore.FieldValue.serverTimestamp(),
      });

      setTimeout(() => {
        dispatch({
          type: "EMPTY_BASKET",
        });
        history.replace("/orders");
      }, 2500);
    }

    // const payload = await stripe
    //   .confirmCardPayment(clientSecret, {
    //     payment_method: {
    //       card: elements.getElement(CardElement),
    //     },
    //   })
    //   .then(({ paymentIntent }) => {
    //     // paymentIntent = payment confirmation

    //     setSucceeded(true);
    //     setError(null);
    //     setProcessing(false);
    //     console.log("paymnet still proceed?");

    //     db.collection("users").add({
    //       email: user.email,
    //       basket: basket,
    //       amount: getBasketTotal(basket),
    //       created: firebase.firestore.FieldValue.serverTimestamp(),
    //     });

    //     dispatch({
    //       type: "EMPTY_BASKET",
    //     });

    //     history.replace("/orders");
    //   });
  };

  const handleChange = (event) => {
    // Listen for change in the CardElement
    // and display any errors as the customer types their card /// details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : " ");
  };

  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout
          <Link to="/checkout"> ({basket.length} items)</Link>
        </h1>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>

          <div className="payment_address">
            <p>{user ? user?.email : "Guest"}</p>
            <p>Lot 7, Kampung Baru</p>
            <p>08300 Gurun, Kedah</p>
          </div>
        </div>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Review items and delivery</h3>
          </div>

          <div className="payment_items">
            {basket.length == 0 ? (
              <div className="noItemDiv">
                <h4>No item has been selected</h4>
              </div>
            ) : (
              basket.map((item) => (
                <BasketItem
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              ))
            )}
          </div>
        </div>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>

          <div className="payment_details">
            {/* Stripe magic will go here */}

            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment_priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />

                <button
                  disabled={processing || disabled || succeeded || user == null}
                >
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>

                {user ? null : (
                  <span style={{ color: "red", fontSize: "13px" }}>
                    {" "}
                    Please login first before making the payment
                  </span>
                )}
              </div>

              {/* Errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
