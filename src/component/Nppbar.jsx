import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import "../assets/style/Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { FaSearch, FaUser } from "react-icons/fa";
import { AppContext } from "./AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Nppbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [user, setUser] = useState(false);
  const navigate = useNavigate();

  const { username } = useContext(AppContext);

  const fetchData = (value) => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((json) => {
        setResult((prevResult) =>
          value && json
            ? json.filter((item) => item.title.toLowerCase().includes(value))
            : []
        );
      });
  };

  useEffect(() => {
    axios.post("http://localhost:6001/user/verify").then((res) => {
      if (res.data.message === "authorized") {
        setUser(true);
      }
    });
  }, []);

  function handleAuthUser() {
    if (user) {
      setTimeout(() => {
        return navigate("/dashboard");
      }, 500);
    } else {
      return toast.error("not logged in");
    }
  }

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarStyle = {
    backgroundColor: scrollPosition > 220 ? "white" : "transparent",
    transition: "background-color 0.3s ease",
  };
  function handleLogout() {
    axios.get("http://localhost:6001/user/logout").then((res) => {
      if (res.data.message === "loggingOut") {
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    });
  }

  return (
    <Navbar expand="lg" style={navbarStyle} className="fixed-top">
      <Container className="container">
        <Navbar.Brand
          style={{
            fontWeight: "bold",
            border: "2px solid black",
            padding: "2px 15px",
          }}
        >
          丂ㄒㄖ尺乇
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto ms-auto my-2 my-lg-0 d-flex justify-content-space-between"
            style={{ maxHeight: "150px" }}
            navbarScroll
          >
            <Nav.Link
              style={{ fontWeight: "bold", margin: "0 10px" }}
              as={Link}
              to="/"
            >
              Home
            </Nav.Link>
            <Nav.Link
              style={{ fontWeight: "bold", margin: "0 10px" }}
              as={Link}
              to="/men"
            >
              Men
            </Nav.Link>
            <Nav.Link
              style={{ fontWeight: "bold", margin: "0 10px" }}
              as={Link}
              to="/women"
            >
              Women
            </Nav.Link>
          </Nav>

          {user ? (
            <div className="d-flex align-items-center fw-bold me-auto">
              <FaUser className="me-1" />
              {username}
            </div>
          ) : (
            <></>
          )}

          <Form
            className="d-flex w-100 ms-4 align-items-center position-relative"
            style={{ maxWidth: "350px" }}
          >
            <FaSearch />
            <Form.Control
              type="search"
              placeholder="Search..."
              className="ms-auto searchBox"
              value={input}
              aria-label="Search"
              style={{ fontWeight: "bold" }}
              onChange={(e) => handleChange(e.target.value)}
            />
            <div
              className="box"
              style={{ position: "absolute", zIndex: "999", maxWidth: "100%" }}
            >
              {result &&
                result.map((item, key) => {
                  return (
                    <div
                      className="searchBox"
                      style={{ backgroundColor: "black" }}
                      key={key}
                    >
                      <img src={item.image} alt="logo" />
                      <p className="text-white">{item.title}</p>
                    </div>
                  );
                })}
            </div>
          </Form>
          {user ? (
            <button className=" mt-2 text-decoration-none exitButton h6">
              <Link className="text-decoration-none " onClick={handleLogout}>
                Logout
              </Link>
            </button>
          ) : (
            <button className="mt-2 px-2 py-1 text-decoration-none exitButton h6">
              <Link to="/login" className="text-decoration-none">
                login
              </Link>
            </button>
          )}

          <button
            className="dashbordButton text-decoration-none mx-3"
            onClick={handleAuthUser}
          >
            Dashboard
          </button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Nppbar;
