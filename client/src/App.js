import { useState, useEffect } from "react";
import "./App.scss";
import axios from "axios";
import Home from "./components/Home/Home";
import PageNavbar from "./components/Layout/PageNavbar/PageNavbar";
import Auth from "./components/Auth/Auth";
import Container from "react-bootstrap/Container";
import Footer from "./components/Layout/Footer/Footer";

const App = () => {
  const [auth, setAuth] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    axios
      .request({
        data: { email: "user6@gmail.com", password: "123" },
        signal: controller.signal,
        method: "POST",
        url: "http://localhost:4000/api/users/login",
      })
      .then((response) => {
        setLoading(false);
        setResponse(response);
        setAuth(response.data["auth-token"]);
        console.log(response);
      })
      .catch((error) => {
        if (error.message !== "canceled") {
          setLoading(false);
          setError(error.message);
          console.log(error);
        }
      });
    return () => controller.abort();
  }, []);

  return (
    <>
      <PageNavbar />
      <Container>
        <Auth />
        <Home auth={auth} />
      </Container>
      <Footer />
    </>
  );
};

export default App;
