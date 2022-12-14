import "./CustomToast.scss";
import { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function CustomToast() {
  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(true);
  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = () => setShowB(!showB);

  return (
    <ToastContainer position="bottom-end" className="p-3">
      <Toast show={showA} onClose={toggleShowA}>
        <Toast.Header>
          <strong className="me-auto">Login info</strong>
        </Toast.Header>
        <Toast.Body>
          <p>
            If you don't want to register, you can use this premade account.
          </p>
          Email: <span className="text-primary fw-bold">user@email.com</span>
          <br />
          Password: <span className="text-primary fw-bold">123</span>
          <br />
        </Toast.Body>
      </Toast>
      <Toast show={showB} onClose={toggleShowB}>
        <Toast.Header>
          <strong className="me-auto">Page info</strong>
        </Toast.Header>
        <Toast.Body>
          This is a dockerized MERN app, hosted on AWS using redux, bootstrap,
          nginx, bcrypt, JWT and mongodb which is hosted on atlas.
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default CustomToast;
