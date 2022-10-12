import {
  Col,
  Container,
  FloatingLabel,
  Row,
  Form,
  Button,
} from "react-bootstrap";
import validateEmail from "../../../utils/validateEmail";
import { setCookie } from "../../../utils/cookies";
import CustomToast from "../CustomToast";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Register.scss";
import capitalizeFirstLetter from "../../../utils/capitalizeFirstLetter";

const Register = ({ setAuth, setUser }) => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [validEmailAddress, setvalidEmailAddress] = useState(true);

  const handleOnBlur = (callback) => {
    callback ? setvalidEmailAddress(true) : setvalidEmailAddress(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .request({
        data: { email, password, name },
        method: "POST",
        url: "http://localhost:4000/api/users/register",
      })
      .then((response) => {
        console.log(response);
        if (checked) {
          setCookie("auth", response.data["auth-token"], 14);
          setCookie("user", capitalizeFirstLetter(response.data.name), 14);
        }
        setUser(capitalizeFirstLetter(response.data.name));
        setAuth(response.data["auth-token"]);
      })
      .catch((error) => {
        setError(error.response.data.error);
        console.log(error);
      });
  };

  return (
    <section className="register">
      <Container>
        <Row className="justify-content-center">
          <Col xl={4} lg={6} md={8} sm={10}>
            <Form>
              <FloatingLabel
                controlId="floatingName"
                label="Name"
                className="mb-3 mt-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className={validEmailAddress ? null : "text-danger"}
                onBlur={(e) => handleOnBlur(validateEmail(email))}
              >
                <Form.Control
                  type="email"
                  className={validEmailAddress ? null : "text-danger"}
                  onBlur={(e) => handleOnBlur(validateEmail(email))}
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
              Already got an account? <Link to="/login"> Sign in! </Link>
            </p>
          </Col>
        </Row>
      </Container>
      <CustomToast />
    </section>
  );
};

export default Register;
