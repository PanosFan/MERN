import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Error.scss";

const Error = () => {
  const navigate = useNavigate();

  return (
    <section className="error">
      <Container>
        <Row className="justify-content-center text-center">
          <Col xl={5} lg={6} md={8} sm={10}>
            <h1>An error has occured 404</h1>
            <h1 className="mt-3">
              <span> ¯\ _(ツ)_/¯</span>
            </h1>

            <Button
              variant="outline-warning"
              type="button"
              className="mt-5"
              size="lg"
              onClick={() => navigate(-1)}
            >
              Go back
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Error;
