import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await axios.post("http://localhost:6001/user/create", {
      name,
      password,
      email,
    });

    // switch (response.data.status) {
    //   case 400:
    //     toast.error(JSON.stringify(response.data.message));
    //     navigate("/signup");
    //     break;
    //   case 200:
    //     toast.success(JSON.stringify(response.data.message));
    //     navigate("/");
    //     break;
    //   default:
    //     toast.error("I don't know why . she runs away");
    //     navigate("/signup");
    //     break;
    // }

    if (response.data.message === "user created") {
      toast.success("User successfully created"); // Using toast as a function to display success message
      navigate("/login");
    } else if (response.data.message === "user already exist") {
      toast.error("User already exists with this Email"); // Using toast as a function to display error message
      navigate("/signup");
    }
  }

  return (
    <div className="container">
      <h1 className="text-center">Signup</h1>
      <form method="POST" onSubmit={handleSubmit}>
        <InputGroup className="mt-5">
          <InputGroup.Text>Name ,Email and Password</InputGroup.Text>
          <Form.Control
            value={name}
            aria-label="Name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            type="text"
            required
          />
          <Form.Control
            value={email}
            aria-label="Email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            type="email"
            required
          />
          <Form.Control
            value={password}
            aria-label="Password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            required
            type="password"
          />
        </InputGroup>
        <button type="submit" className="mt-4 w-100 border-0 p-2">
          SignUp
        </button>
      </form>
      <p>
        incase you have already an Account{" "}
        <Link to="/login">. go for login</Link>
      </p>
    </div>
  );
};

export default Signup;
