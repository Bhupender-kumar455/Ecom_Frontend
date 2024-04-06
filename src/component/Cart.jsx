import React, { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { useContext } from "react";
import axios from "axios";
import "../assets/style/Cart.css";
import Nppbar from "./Nppbar";
import close from "../assets/close.png";
const Cart = () => {
  const { username } = useContext(AppContext);

  const [userCart, setUserCart] = useState([]);
  const [price, setPrice] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:6001/user/allCart", { username })
      .then((response) => {
        if (response.data) {
          setUserCart(response.data);
          calculateTotalPrice(response.data);
        } else {
          console.log("not item found");
        }
      });
  }, []);

  const calculateTotalPrice = (cartItem) => {
    let total = 0;
    cartItem.forEach((element) => {
      total += element.price;
    });
    setPrice(total);
  };

  const handleClick = (item) => {
    setUserCart((prevState) => prevState.filter((data) => data != item));
    calculateTotalPrice(item);
  };

  return (
    <div>
      <Nppbar />
      <div className="parent">
        <h2 className="text-center mt-5">This is your Cart</h2>
        <div className="userCartParent">
          {userCart &&
            userCart.map((item, index) => (
              <div className="userCart" key={index}>
                <img src={item.image} alt="product-logo" />
                <h5>{item.title}</h5>
                <p>₹{Math.round(item.price * 83)}</p>
                <img
                  className="crossButton"
                  src={close}
                  alt="close"
                  onClick={() => handleClick(item)}
                  width="10"
                />
              </div>
            ))}
        </div>
      </div>
      <div className="paymentGateway">
        <p>Your totalPrice: Rs {Math.round(price * 83)}</p>
      </div>
    </div>
  );
};

export default Cart;
