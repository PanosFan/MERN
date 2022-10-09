import "./App.scss";
import { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";

// Pages
import PageNavbar from "./components/Layout/PageNavbar/PageNavbar";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Footer from "./components/Layout/Footer/Footer";

const App = () => {
  const [auth, setAuth] = useState(null);

  return (
    <BrowserRouter>
      <PageNavbar auth={auth} />
      <Container>
        {auth ? (
          <Routes>
            <Route path="/" element={<Home auth={auth} />} />
            <Route
              path="*"
              element={<p className="text-info">There's nothing here: 404!</p>}
            />
          </Routes>
        ) : (
          <Routes>
            <Route
              path="/login"
              element={<Login auth={auth} setAuth={setAuth} />}
            />
            <Route
              path="/register"
              element={<Register auth={auth} setAuth={setAuth} />}
            />
            <Route
              path="*"
              element={<p className="text-info">There's nothing here: 404!</p>}
            />
          </Routes>
        )}
      </Container>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
