import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AppContext } from "./AppContext";
import React, { useContext, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUsername } = useContext(AppContext);

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await axios.post("http://localhost:6001/user/login", {
      email,
      password,
    });
    if (response.data.message === "user logedIn") {
      const loggedInUser = response.data.username;
      // const token = response.data.accessToken;

      // const key = response.data.key;
      // const user = jwt.verify(token, Buffer.from(key, "base64"));
      // console.log("key", key);

      // console.log(token);
      setUsername(loggedInUser);
      navigate("/");
      toast.success("Succesfully login");
    } else if (response.data.message === "user not found!!") {
      toast.error("invalid credietial");
    }
  }
  return (
    <div className="container">
      <Form method="POST" onSubmit={handleSubmit}>
        <InputGroup className="mt-5">
          <InputGroup.Text>Email and Password</InputGroup.Text>
          <Form.Control
            aria-label="Email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
          />
          <Form.Control
            aria-label="Password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            required
          />
        </InputGroup>
        <button type="submit" className="mt-4 w-100 border-0 p-2">
          login
        </button>
      </Form>
      <p>
        Incase you don't have account, <Link to="/signup"> you can Signup</Link>
      </p>
      <p>
        Forget password? Do reset here <Link to="/forgot">Forgot password</Link>
      </p>
    </div>
  );
};

export default Login;
