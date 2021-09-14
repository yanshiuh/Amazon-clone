import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import { useEffect } from "react";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Showbar from "./Showbar";
import Footer from "./Footer";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";
import ProductDetails from "./ProductDetails";

const promise = loadStripe(
  "pk_test_51JWZkQC6eTeFqYf0IzWpDndgsFFTPXV5VI5uMYzsPrDmA7S60uxK1aGh7knRCenMg3L1ii5p2diHYiyZ2Q5IVQ8I006AJrw5Sk"
);

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...
    auth.onAuthStateChanged((authUser) => {
      console.log("the use is ", authUser);

      if (authUser) {
        // the user just logged in / was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    document.title = "Amazon clone";
  }, []);

  return (
    // BEM naming convention
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/checkout">
            <Header />
            <Checkout />
            <Footer />
          </Route>

          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>

          <Route path="/orders">
            <Header />
            <Orders />
          </Route>

          <Route path="/productDetails">
            <Header />
            <ProductDetails />
            <Footer />
          </Route>

          <Route path="/">
            <Header />
            <Showbar />
            <Home />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
