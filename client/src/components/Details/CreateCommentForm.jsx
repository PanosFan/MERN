import { useState } from "react";
import { Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { pushCommentInStore } from "../../redux/posts";

const CreateCommentForm = ({ id }) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const { auth } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { userID } = useSelector((state) => state.userID);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    axios
      .request({
        data: { comment },
        method: "POST",
        url: `http://ec2-52-28-61-139.eu-central-1.compute.amazonaws.com:4000/api/posts/${id}`,
        headers: {
          "auth-token": auth,
        },
      })
      .then((response) => {
        console.log(response);
        setComment("");
        dispatch(
          pushCommentInStore({
            id,
            comment,
            user,
            userID,
          })
        );
      })
      .catch((error) => {
        setError(error.response.data.error);
        console.log(error);
      });
  };

  return (
    <FloatingLabel
      controlId="floatingTextarea3"
      label="Leave a comment here"
      className="mb-5"
    >
      <Form.Control
        as="textarea"
        placeholder="Leave a comment here"
        style={{ minHeight: "100px" }}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button variant="primary" className="mt-3" onClick={handleSubmit}>
        Submit
      </Button>
      {error && <p className="text-danger mt-2">{error}</p>}
    </FloatingLabel>
  );
};

export default CreateCommentForm;
