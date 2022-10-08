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
          If you don't want to register, you can use this premade account.
          <br />
          <br />
          Email: user@email.com
          <br />
          Password: 123
        </Toast.Body>
      </Toast>
      <Toast show={showB} onClose={toggleShowB}>
        <Toast.Header>
          <strong className="me-auto">Page info</strong>
        </Toast.Header>
        <Toast.Body>
          This is a dockerized MERN app, hosted on AWS using react-bootstrap,
          sass, nginx.
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default CustomToast;
