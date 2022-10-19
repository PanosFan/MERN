import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCookie } from "./utils/cookies";
import { setAuth } from "./redux/auth";
import { setUser } from "./redux/user";
import "./App.scss";

// comnponents
import PageNavbar from "./components/Layout/PageNavbar/PageNavbar";
import EditPostPage from "./components/EditPostPage/EditPostPage";
import Register from "./components/Auth/Register/Register";
import EditPassword from "./components/User/EditPassword";
import Footer from "./components/Layout/Footer/Footer";
import Error from "./components/Layout/Error/Error";
import Details from "./components/Details/Details";
import Login from "./components/Auth/Login/Login";
import Home from "./components/Home/Home";

const App = () => {
  // redux
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);

  // get data from cookies if they are set
  useEffect(() => {
    dispatch(setAuth(getCookie("auth")));
    dispatch(setUser({ user: getCookie("user"), userID: getCookie("userID") }));
  }, []);

  return (
    <BrowserRouter>
      <PageNavbar />
      <Routes>
        {auth ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/edit/:id" element={<EditPostPage />} />
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
