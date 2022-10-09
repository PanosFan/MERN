import { Col, Container, Row } from "react-bootstrap";
import CustomToast from "../CustomToast";
import { useState } from "react";
import "./Register.scss";

const Register = ({ auth, setAuth }) => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section className="register">
      <Container>
        <Row className="justify-content-center">
          <Col lg={4} md={6} sm={8}>
            <p style={{ backgroundColor: "red" }}>Register page</p>
          </Col>
        </Row>
      </Container>
      <CustomToast />
    </section>
  );
};

export default Register;
