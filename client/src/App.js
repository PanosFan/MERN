import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCookie } from "./utils/cookies";
import { setAuth } from "./redux/auth";
import "./App.scss";

// comnponents
import PageNavbar from "./components/Layout/PageNavbar/PageNavbar";
import Register from "./components/Auth/Register/Register";
import Footer from "./components/Layout/Footer/Footer";
import Error from "./components/Layout/Error/Error";
import Details from "./components/Details/Details";
import Login from "./components/Auth/Login/Login";
import Home from "./components/Home/Home";

const App = () => {
  // local state (will change it soon)
  const [user, setUser] = useState("");

  // redux
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // get data from cookies if they are set
  useEffect(() => {
    dispatch(setAuth(getCookie("auth")));
    setUser(getCookie("user"));
  }, []);

  return (
    <BrowserRouter>
      <PageNavbar />
      <Routes>
        {auth ? (
          <>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/:id/details" element={<Details />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
            <Route path="*" element={<Error />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
