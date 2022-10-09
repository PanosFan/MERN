import {
  Col,
  Container,
  FloatingLabel,
  Row,
  Form,
  Button,
} from "react-bootstrap";
import CustomToast from "../CustomToast";
import validateEmail from "../../../utils/validateEmail";
import { useState } from "react";
import axios from "axios";
import "./Login.scss";

function Login({ auth, setAuth }) {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const controller = new AbortController();
    axios
      .request({
        data: { email, password },
        signal: controller.signal,
        method: "POST",
        url: "http://localhost:4000/api/users/login",
      })
      .then((response) => {
        setAuth(response.data["auth-token"]);
        console.log(response);
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
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
            {error && <p className="text-danger mt-4">{error}</p>}
          </Col>
        </Row>
      </Container>

      <CustomToast />
    </section>
  );
}

export default Login;
