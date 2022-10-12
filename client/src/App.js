import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.scss";

// Pages
import PageNavbar from "./components/Layout/PageNavbar/PageNavbar";
import Register from "./components/Auth/Register/Register";
import Footer from "./components/Layout/Footer/Footer";
import Error from "./components/Layout/Error/Error";
import Login from "./components/Auth/Login/Login";
import { getCookie } from "./utils/cookies";
import Home from "./components/Home/Home";

const App = () => {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    setAuth(getCookie("auth"));

    setUser(getCookie("user"));
  }, []);

  return (
    <BrowserRouter>
      <PageNavbar auth={auth} setAuth={setAuth} />
      <Routes>
        {auth ? (
          <>
            <Route path="/" element={<Home auth={auth} user={user} />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
            <Route path="*" element={<Error />} />
          </>
        ) : (
          <>
            <Route
              path="/login"
              element={<Login setAuth={setAuth} setUser={setUser} />}
            />
            <Route
              path="/register"
              element={<Register setAuth={setAuth} setUser={setUser} />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
