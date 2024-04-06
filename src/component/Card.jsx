import React from "react";
import "../assets/style/Card.css";
import { AppContext } from "./AppContext";
import { useContext } from "react";
import axios from "axios";

const Card = ({ data }) => {
  const { username } = useContext(AppContext);

  const handleClick = async (item) => {
    const clickedItem = { ...item, name: username };
    await axios
      .post("http://localhost:6001/user/addToCart", {
        clickedItem,
        name: clickedItem.name,
      })
      .then((data) => {
        if (data.data.message === "Added to cart") {
          console.log("successfully added!");
        }
      });
  };

  return (
    <div className="second">
      <h1 className="featureLine">
        Featur<span className="middle">ed pr</span>oducts
      </h1>
      <div className="cardParent">
        {data &&
          data.map((item) => (
            <div key={item.id}>
              <div className="card">
                <img
                  className="cardImage"
                  src={item.image}
                  alt="product-logo"
                />
                <div>
                  <h5 className="cardTitle">{item.title}</h5>
                  <div
                    className="textthings"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p className="cardCategory">{item.category}</p>
                    <p className="cardPrice">₹{Math.round(item.price * 83)}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleClick(item)}
                  className="add-button"
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Card;
