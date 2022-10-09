import CustomToast from "../CustomToast";
import { useState } from "react";
import "./Register.scss";

const Register = ({ auth, setAuth }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <section className="register container">
      <p>Register page</p>
      <CustomToast />
    </section>
  );
};

export default Register;
