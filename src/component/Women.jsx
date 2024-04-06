import React from "react";
import Card from "./Card";
import axios from "axios";
import { useState, useEffect } from "react";
import Nppbar from "./Nppbar";
import anime from "../assets/tenor.gif";

const Women = () => {
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
                sortt.category === "women's clothing" ||
                sortt.category === "jewelery"
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
        <div
          className="loader"
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={anime} style={{ width: "100px" }} alt="loading..." />
        </div>
      ) : (
        <Card data={data} />
      )}
    </div>
  );
};

export default Women;
