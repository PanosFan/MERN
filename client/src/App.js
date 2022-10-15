import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCookie } from "./utils/cookies";
import { setAuth } from "./redux/auth";
import { setUser } from "./redux/user";
import "./App.scss";

// comnponents
import PageNavbar from "./components/Layout/PageNavbar/PageNavbar";
import Register from "./components/Auth/Register/Register";
import Footer from "./components/Layout/Footer/Footer";
import Error from "./components/Layout/Error/Error";
import Details from "./components/Details/Details";
import Login from "./components/Auth/Login/Login";
import Home from "./components/Home/Home";
import EditPassword from "./components/User/EditPassword";

const App = () => {
  // redux
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  // get data from cookies if they are set
  useEffect(() => {
    dispatch(setAuth(getCookie("auth")));
    dispatch(setUser(getCookie("user")));
  }, []);

  return (
    <BrowserRouter>
      <PageNavbar />
      <Routes>
        {auth ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/user/password" element={<EditPassword />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
            <Route path="*" element={<Error />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
