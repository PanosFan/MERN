import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import EditPostForm from "./EditPostForm";
import "./EditPostPage.scss";

const EditPostPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { posts } = useSelector((state) => state.posts);
  const { auth } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .request({
        data: { title, content: body },
        method: "PUT",
        url: `http://ec2-52-28-61-139.eu-central-1.compute.amazonaws.com:4000/api/posts/${id}`,
        headers: {
          "auth-token": auth,
        },
      })
      .then((response) => {
        setError("");
        setMessage("Post edited");
        setTimeout(() => {
          navigate("/");
        }, 2000);
        console.log(response);
      })
      .catch((error) => {
        setError(error.response.data.error);
        console.log(error);
      });
  };

  useEffect(() => {
    let post = posts.filter((item) => item._id == id);
    setTitle(post[0].title);
    setBody(post[0].content);
  }, []);

  return (
    <section className="editPost">
      <Container>
        <Row className="justify-content-center">
          <Col xl={4} lg={6} md={8} sm={10}>
            <EditPostForm
              body={body}
              setBody={setBody}
              title={title}
              setTitle={setTitle}
              handleSubmit={handleSubmit}
            />
            {message && <p className="text-success mt-4">{message}</p>}
            {error && <p className="text-danger mt-4">{error}</p>}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default EditPostPage;
