import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import Nppbar from "./Nppbar";
import anime from "../assets/tenor.gif";

import "../assets/style/Men.css";
const Men = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("https://fakestoreapi.com/products", { withCredentials: false })
          .then((data) => {
            let real = data.data;
            const men = real.filter(
              (sortt) =>
                sortt.category === "men's clothing" ||
                sortt.category === "electronics"
            );
            setData(men);
            setLoading(false);
          });
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Nppbar />
      {loading ? (
        <div className="loader">
          <img src={anime} style={{ width: "100px" }} alt="loading..." />
        </div>
      ) : (
        <Card data={data} />
      )}
    </div>
  );
};

export default Men;
