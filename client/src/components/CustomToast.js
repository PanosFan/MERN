import { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function CustomToast({ content = "Toast content", title = "Toast title" }) {
  const [show, setShow] = useState(true);
  const toggleShow = () => setShow(!show);

  return (
    <ToastContainer position="bottom-end" className="p-3">
      <Toast show={show} onClose={toggleShow}>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body>{content}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default CustomToast;
