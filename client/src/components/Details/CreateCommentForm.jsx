import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const CreateCommentForm = () => {
  return (
    <FloatingLabel controlId="floatingTextarea3" label="Leave a comment here">
      <Form.Control
        as="textarea"
        placeholder="Leave a comment here"
        style={{ minHeight: "100px" }}
        className="mb-5"
      />
    </FloatingLabel>
  );
};

export default CreateCommentForm;
