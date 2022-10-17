import { FloatingLabel, Button, Form } from "react-bootstrap";

const EditPasswordForm = ({
  setNewPassword,
  setOldPassword,
  setRepeatPassword,
  handleSubmit,
}) => (
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
    <FloatingLabel controlId="floatingPassword" label="Repeat password">
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
);

export default EditPasswordForm;
