import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { Container } from "react-bootstrap";
import "./Details.scss";

const Details = ({ auth }) => {
  const { id } = useParams();

  const { response, error } = useAxios({
    url: `http://localhost:4000/api/posts/${id}`,
    auth,
  });

  return (
    <section className="postDetails">
      <Container>
        {response && response.data.result.title}
        <br />
        {response && response.data.result.content}
      </Container>
    </section>
  );
};

export default Details;
