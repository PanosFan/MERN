import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./Details.scss";

const Details = () => {
  // grab id from url
  const { id } = useParams();

  // redux
  const { auth } = useSelector((state) => state.auth);

  // fetch post
  const { response } = useAxios({
    url: `http://localhost:4000/api/posts/${id}`,
    auth,
  });

  return (
    <section className="postDetails">
      <Container>
        <p>{response && response.data.result.title}</p>
        <p>{response && response.data.result.content}</p>
      </Container>
    </section>
  );
};

export default Details;
