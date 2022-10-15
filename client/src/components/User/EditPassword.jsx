import {
  Col,
  Container,
  FloatingLabel,
  Row,
  Button,
  Form,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import "./EditPassword.scss";
import { useNavigate } from "react-router-dom";

const EditPassword = () => {
  const navigate = useNavigate();
  // redux
  const { auth } = useSelector((state) => state.auth);
  const { userID } = useSelector((state) => state.userID);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== repeatPassword)
      return setError("Passwords need to match");

    axios
      .request({
        data: { password: newPassword, oldPassword: oldPassword },
        method: "PUT",
        url: `http://ec2-52-28-61-139.eu-central-1.compute.amazonaws.com:4000/api/users/change_password/${userID}`,
        headers: {
          "auth-token": auth,
        },
      })
      .then((response) => {
        console.log(response);
        setError("");
        setMessage("Password changed successfully, teleporting back to home!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        setError(error.response.data.error);
        console.log(error);
      });
  };

  return (
    <section className="editPassword">
      <Container>
        <Row className="justify-content-center">
          <Col xl={4} lg={6} md={8} sm={10}>
            <Form>
              <FloatingLabel controlId="floatingInput" label="Old password">
                <Form.Control
                  type="password"
                  className="mb-3"
                  placeholder="Old password"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="New password">
                <Form.Control
                  className="mb-3"
                  type="password"
                  placeholder="New password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPassword"
                label="Repeat password"
              >
                <Form.Control
                  className="mb-3"
                  type="password"
                  placeholder="Repeat password"
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </FloatingLabel>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
            {message && <p className="text-success mt-4">{message}</p>}
            {error && <p className="text-danger mt-4">{error}</p>}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default EditPassword;
