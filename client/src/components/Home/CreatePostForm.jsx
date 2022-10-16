import Form from "react-bootstrap/Form";

const CreatePostForm = ({ setTitle, setBody }) => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Post title</Form.Label>
        <Form.Control
          type="text"
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Post body</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          onChange={(e) => setBody(e.target.value)}
        />
      </Form.Group>
    </Form>
  );
};

export default CreatePostForm;
