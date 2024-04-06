import Login from "./component/Login";
import Signup from "./component/Signup";
import Home from "./component/Home";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  redirect,
} from "react-router-dom";
import Men from "./component/Men";
import Women from "./component/Women";
import Cart from "./component/Cart";
import Forgot from "./component/Forgot";
import Notfound from "./component/Notfound";
import { AppContextProvider } from "./component/AppContext";
import Dashboard from "./component/Dashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    axios.post("http://localhost:6001/user/verify").then((res) => {
      if (res.data.message === "authorized") {
        setIsAuthenticated(true);
        <redirect to="/" />;
      } else {
        console.log("not loggedIn");
        setIsAuthenticated(false);
        toast.error("not logged in");
      }
    }, []);
  });
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/cart"
            element={isAuthenticated ? <Cart /> : <Navigate to="/login" />}
          />
          <Route
            path="/men"
            element={isAuthenticated ? <Men /> : <Navigate to="/login" />}
          />
          <Route
            path="/women"
            element={isAuthenticated ? <Women /> : <Navigate to="/login" />}
          />
          <Route
            path="/forgot"
            element={isAuthenticated ? <Forgot /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/cart"
            element={isAuthenticated ? <Cart /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
};

export default App;
