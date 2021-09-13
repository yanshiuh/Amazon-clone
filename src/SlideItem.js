import React from "react";
import "./SlideItem.css";
import CancelIcon from "@material-ui/icons/Cancel";
import { useStateValue } from "./StateProvider";

function SlideItem({ id, image, title }) {
  const [{ tempBasket }, dispatch] = useStateValue();

  const removeFromTempBasket = () => {
    dispatch({
      type: "REMOVE_FROM_TEMPBASKET",
      id: id,
    });
  };

  const autoClose = () => {
    setTimeout(() => {
      dispatch({
        type: "REMOVE_FROM_TEMPBASKET",
        id: id,
      });
    }, 5000);
  };

  return (
    <div className="slideItem" onLoad={autoClose}>
      <div className="slideItem_container">
        <img src={image} alt="" />

        <p>
          <strong style={{ color: "black" }}>{title}&nbsp;</strong>
          has been added to your basket
        </p>
      </div>
      <CancelIcon className="cancelButton" onClick={removeFromTempBasket} />
    </div>
  );
}

export default SlideItem;
