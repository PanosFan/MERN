import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import User from "../User/User";
import "./Details.scss";

import Comments from "./Comments";

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
              .filter((item) => item._id === id)
              .map((item) => (
                <div key={item._id} className="left-side">
                  <div className="detailsWrapper mb-5">
                    <h3 className="fw-bold">{item.title}</h3>
                    <p className="mt-4">{item.content}</p>
                  </div>
                  <Comments posts={posts} id={id} />
                </div>
              ))}
          <User />
        </div>
      </Container>
    </section>
  );
};

export default Details;
