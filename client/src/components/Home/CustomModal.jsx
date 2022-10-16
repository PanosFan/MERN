import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import axios from "axios";

const CustomModal = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { auth } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .request({
        data: { title, content: body },
        method: "POST",
        url: "http://ec2-52-28-61-139.eu-central-1.compute.amazonaws.com:4000/api/posts",
        headers: {
          "auth-token": auth,
        },
      })
      .then((response) => {
        setError("");
        setMessage("Post created");
        setTimeout(() => {
          handleClose();
        }, 1500);
        console.log(response);
      })
      .catch((error) => {
        setError(error.response.data.error);
        console.log(error);
      });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="mb-3" variant="primary" onClick={handleShow}>
        Create new post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Post title</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Post body</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setBody(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {message && <span className="text-success me-auto">{message}</span>}
          {error && <span className="text-danger me-auto">{error}</span>}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomModal;
