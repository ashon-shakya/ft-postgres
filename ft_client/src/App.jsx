import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import Header from "./components/Header";
import DefaultLayout from "./layout/DefaultLayout";
import LandingPage from "./pages/LandingPage";
import Auth from "./components/Auth";
import { useUser } from "./context/UserContext";
import { fetchUserAPI } from "./helpers/axiosHelper";

function App() {
  const [count, setCount] = useState(0);
  const { setUser } = useUser();

  const autoLogin = async () => {
    // get accessJWT
    let token = localStorage.getItem("accessJWT");
    if (token) {
      // fetch the user data
      const data = await fetchUserAPI();

      if (data.status == "success") {
        // update user context
        setUser(data.user);
      }
    }
  };

  useEffect(() => {
    // auto login feature call
    autoLogin();
  }, []);

  return (
    <>
      <Routes>
        {/* Public Pages */}
        {/* landing page */}
        <Route index element={<LandingPage />} />
        <Route path="/" element={<DefaultLayout />}>
          {/* login */}
          <Route path="/login" element={<Login />} />
          {/* signup */}
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Private Pages */}
        <Route path="/" element={<DefaultLayout />}>
          {/* dashboard */}
          <Route
            path="/dashboard"
            element={
              <Auth>
                <Dashboard />
              </Auth>
            }
          />
          {/* transaction */}
          <Route
            path="/transaction"
            element={
              <Auth>
                <Transaction />
              </Auth>
            }
          />
        </Route>
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
