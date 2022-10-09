import "./Login.scss";
import CustomToast from "../CustomToast";
import { useEffect, useState } from "react";
import axios from "axios";

function Login({ auth, setAuth }) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  // useEffect(() => {
  //   const controller = new AbortController();
  //   axios
  //     .request({
  //       data: { email: "panos@email.com", password: "12345" },
  //       signal: controller.signal,
  //       method: "POST",
  //       url: "http://localhost:4000/api/users/login",
  //     })
  //     .then((response) => {
  //       setAuth(response.data["auth-token"]);
  //       setResponse(response);
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       if (error.message !== "canceled") {
  //         setError(error.message);
  //         console.log(error);
  //       }
  //     });
  //   return () => controller.abort();
  // }, []);

  return (
    <section className="login container">
      <p>Login page</p>
      <CustomToast />
    </section>
  );
}

export default Login;
