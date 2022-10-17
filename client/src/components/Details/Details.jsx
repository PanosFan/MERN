import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import User from "../User/User";
import "./Details.scss";

const Details = () => {
  // grab id from url
  const { id } = useParams();

  // redux
  const { posts } = useSelector((state) => state.posts);

  return (
    <section className="postDetails">
      <Container>
        <div className="flex">
          {posts &&
            posts
              .filter((item) => item._id == id)
              .map((item) => (
                <div className="detailsWrapper" key={item._id}>
                  <h3 className="fw-bold">{item.title}</h3>
                  <p className="mt-4">{item.content}</p>
                </div>
              ))}
          <User />
        </div>
      </Container>
    </section>
  );
};

export default Details;
