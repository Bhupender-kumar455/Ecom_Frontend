import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nppbar from "./Nppbar";
const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:6001/user/dashbored").then((res) => {
      if (res.data.status === 404) {
        navigate("/");
      } else {
        setUser([res.data.userEmail, res.data.userName]);
        navigate("/dashboard");
      }
    });
  }, []);

  return (
    <div>
      <Nppbar />
      <div className="text-center mt-5">
        <h3>User's Name: {user[1]}</h3>
        <h3>User's Email: {user[0]}</h3>
      </div>
    </div>
  );
};

export default Dashboard;
