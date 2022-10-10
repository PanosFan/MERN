import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.scss";

// Pages
import PageNavbar from "./components/Layout/PageNavbar/PageNavbar";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Footer from "./components/Layout/Footer/Footer";
import { getCookie } from "./utils/cookies";

const App = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const token = getCookie("auth");
    if (token) setAuth(token);
  }, []);

  return (
    <BrowserRouter>
      <PageNavbar auth={auth} />
      <Routes>
        {auth ? (
          <>
            <Route path="/" element={<Home auth={auth} />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
            <Route
              path="*"
              element={<p className="text-info">There's nothing here: 404</p>}
            />
          </>
        ) : (
          <>
            <Route
              path="/login"
              element={<Login auth={auth} setAuth={setAuth} />}
            />
            <Route
              path="/register"
              element={<Register auth={auth} setAuth={setAuth} />}
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
