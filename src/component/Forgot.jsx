import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
const Forgot = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    toast.error("Coming soon!");
    navigate("/login");
    if (response.data.message === "No account found") {
      toast.error("There are not any user with this Email, Try to SignUp"); // Using toast as a function to display success message
      navigate("/login");
    } else if (response.data.message === "user already exist") {
      toast.error("User already exists with this Email"); // Using toast as a function to display error message
      navigate("/signup");
    }
  }

  return (
    <div className="container">
      <h1 className="text-center" style={{ color: "#dda15e" }}>
        Feature coming soon!
      </h1>
      <h1 className="text-center">Forgot password</h1>
      <form method="POST" onSubmit={handleSubmit}>
        <InputGroup className="mt-5">
          <InputGroup.Text>Email </InputGroup.Text>
          <Form.Control
            value={email}
            aria-label="Email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
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
      <p>
        and if you don't have any account do create it{" "}
        <Link to="/signup">. here</Link>
      </p>
    </div>
  );
};

export default Forgot;
