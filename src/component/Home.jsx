import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import Main from "./Main";
import ScrollToTop from "react-scroll-to-top";
import anime from "../assets/tenor.gif";
import Nppbar from "./Nppbar";
import "../assets/style/Home.css";
const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("https://fakestoreapi.com/products", {
            withCredentials: false,
          })
          .then((data) => {
            let realData = data.data;
            setData(realData);
            setLoading(false);
          });
      } catch (error) {
        console.log("Error in fetching data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="homeParent">
      {loading ? (
        <div className="loader">
          <img src={anime} alt="loading..." />
        </div>
      ) : (
        <div className="frontPage">
          <Nppbar />
          <Main />
          <ScrollToTop className="scrollBtn" />
          <Card data={data} />
        </div>
      )}
    </div>
  );
};

export default Home;
