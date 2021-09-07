import React from "react";
import "./Showbar.css";
import SlideItem from "./SlideItem";
import { useStateValue } from "./StateProvider";

function Showbar() {
  const [{ tempBasket }, dispatch] = useStateValue();
  return (
    <div className="showbar">
      {tempBasket.map((item) => (
        <SlideItem id={item.id} image={item.image} title={item.title} />
      ))}
    </div>
  );
}

export default Showbar;
