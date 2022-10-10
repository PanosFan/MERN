import {
  Col,
  Container,
  FloatingLabel,
  Row,
  Button,
  Form,
} from "react-bootstrap";
import validateEmail from "../../../utils/validateEmail";
import { setCookie } from "../../../utils/cookies";
import CustomToast from "../CustomToast";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Login.scss";

function Login({ auth, setAuth }) {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .request({
        data: { email, password },
        method: "POST",
        url: "http://localhost:4000/api/users/login",
      })
      .then((response) => {
        console.log(response);
        if (checked) setCookie("auth", response.data["auth-token"]);
        setAuth(response.data["auth-token"]);
      })
      .catch((error) => {
        setError(error.response.data.error);
        console.log(error);
      });
  };

  return (
    <section className="login">
      <Container>
        <Row className="justify-content-center">
          <Col xl={4} lg={6} md={8} sm={10}>
            <Form>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className={validateEmail(email)}
              >
                <Form.Control
                  type="email"
                  className={validateEmail(email)}
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingPassword"
                label="Password"
                className="mb-3 mt-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FloatingLabel>

              <Form.Check
                type="checkbox"
                id="default-checkbox"
                label="Remember me"
                className="mb-5 text-info"
                onChange={(e) => setChecked(e.currentTarget.checked)}
              />

              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>

            {error && <p className="text-danger mt-4">{error}</p>}
            <p className="mt-3 text-info">
              Not registered yet? <Link to="/register"> Sign up! </Link>
            </p>
          </Col>
        </Row>
      </Container>
      <CustomToast />
    </section>
  );
}

export default Login;
