import React, { useRef } from "react";
import main from "../assets/frontPage.jpg";
import "../assets/style/Main.css";
import { Link } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";

const Main = () => {
  const middleRef = useRef(null);

  const scrollToMiddle = () => {
    middleRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="mainParent">
      <img src={main} alt="wall-logo" />
      <div className="textPart">
        <p>Men & Women & ElectroNic collection</p>
        <h1>
          A simple <br /> guide to
          <br /> minimilist style.
        </h1>
        <button onClick={scrollToMiddle} className="shopNowButton">
          Shop now !
        </button>
        <button className="cartButton">
          <Link className=" text-decoration-none text" to="/cart">
            {" "}
            Cart
            <FaCartArrowDown className="icon" />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Main;
