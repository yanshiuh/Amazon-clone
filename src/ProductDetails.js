import React from "react";
import "./ProductDetails.css";
import { useStateValue } from "./StateProvider";
import StarIcon from "@material-ui/icons/Star";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { useHistory } from "react-router";

function ProductDetails() {
  const [{ currentItem }, dispatch] = useStateValue();
  const history = useHistory();
  const arrivesDate = new Date().getDate() + 7;
  const arrivesMonth = () => {
    const month = new Date().getMonth();

    if (month == 0) return "Jan";
    else if (month == 1) return "Feb";
    else if (month == 2) return "Mar";
    else if (month == 3) return "April";
    else if (month == 4) return "May";
    else if (month == 5) return "June";
    else if (month == 6) return "July";
    else if (month == 7) return "Aug";
    else if (month == 8) return "Sep";
    else if (month == 9) return "Oct";
    else if (month == 10) return "Nov";
    else if (month == 11) return "Dec";
  };
  const arriveDay = () => {
    const today = new Date().getDay();
    let thatDay = "";

    if (today == 0) thatDay = "Sunday";
    else if (today == 1) thatDay = "Monday";
    else if (today == 2) thatDay = "Tuesday";
    else if (today == 3) thatDay = "Wednesday";
    else if (today == 4) thatDay = "Thursday";
    else if (today == 5) thatDay = "Friday";
    else if (today == 6) thatDay = "Saturday";

    return thatDay;
  };

  console.log("currentitem =", currentItem);
  console.log("thatDay: ", arriveDay());

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: currentItem.id,
        title: currentItem.title,
        image: currentItem.image,
        price: currentItem.price,
        rating: currentItem.rating,
      },
    });
  };

  const payNow = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: currentItem.id,
        title: currentItem.title,
        image: currentItem.image,
        price: currentItem.price,
        rating: currentItem.rating,
      },
    });

    history.push("/payment");
  };

  return (
    <div className="productDetails">
      <div className="productDetails_container">
        <img src={currentItem.image} alt="" />

        <div className="productDetails_info">
          <h4 className="productDetails_title">{currentItem.title}</h4>

          <p className="productDetails_price">
            <small>$</small>
            <strong>{currentItem.price}</strong>
          </p>

          <div className="productDetails_rating">
            {Array(currentItem.rating)
              .fill()
              .map((_, i) => (
                <p>
                  <StarIcon style={{ color: "gold" }} />
                  {/* <StarHalfIcon style={{ color: "gold" }} /> */}
                </p>
              ))}
          </div>

          <hr className="infoLine" />

          <div className="productDetails_importantInfo">
            <h4>{`Important information about ${currentItem.title} :`}</h4>
            <p>
              Certain extra features may not be available in all countries and
              languages and are subject to change at any time.
            </p>
          </div>
        </div>
        <div className="productDetails_shipping">
          <p className="price">${currentItem.price}</p>

          <p className="shipping_price">
            + $36.98 Shipping & Import Fees Deposit to Malaysia Details{" "}
          </p>
          <p className="arrives_date">
            Arrives:{" "}
            <strong>{`${arriveDay()}, ${arrivesMonth()} ${arrivesDate}`}</strong>
          </p>

          <p className="location_delivery">
            <LocationOnIcon />
            Deliver To Malaysia
          </p>

          <p className="stock">In stock.</p>

          <p className="support">
            Ships from and sold by Amazon.com Services LLC. <br /> <br />
            Return policy: Eligible for Return, Refund or Replacement <br />
            <br />
            Support: Free Amazon product support included <br /> <br />
          </p>

          <div className="productDetails_shippingButton">
            <button onClick={addToBasket}>Add to Basket</button>
            <button onClick={payNow}>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
