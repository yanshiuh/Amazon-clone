import React from "react";
import "./Product.css";
import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router";

function Product({ id, title, price, rating, image }) {
  const [{ basket, tempBasket, currentItem }, dispatch] = useStateValue();
  const history = useHistory();

  const toProductDetails = () => {
    dispatch({
      type: "SET_CURRENTITEM",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });

    history.push("./productDetails");
  };

  const addToBasket = () => {
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });

    dispatch({
      type: "ADD_TO_TEMPBASKET",
      item: {
        id: id,
        title: title,
        image: image,
      },
    });

    history.push("/");
  };

  return (
    <div className="product">
      <div className="product_info">
        <p>{title}</p>
        <p className="product_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>

        <div className="product_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>
                <StarIcon style={{ color: "gold" }} />
                {/* <StarHalfIcon style={{ color: "gold" }} /> */}
              </p>
            ))}
        </div>
      </div>

      <img src={image} alt="" onClick={toProductDetails} />

      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;
