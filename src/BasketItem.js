import React from "react";
import "./BasketItem.css";
import StarIcon from "@material-ui/icons/Star";
import { useStateValue } from "./StateProvider";

function BasketItem({ id, image, title, price, rating, hideButton }) {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    // remove the item from basket
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <div className="basketItem">
      <img className="basketItem_image" src={image} alt="" />

      <div className="basketItem_info">
        <p className="basketItem_title">{title}</p>
        <p className="basketItem_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>

        <div className="basketItem_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon style={{ color: "gold" }} />
            ))}
        </div>
        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from basket</button>
        )}
      </div>
    </div>
  );
}

export default BasketItem;
