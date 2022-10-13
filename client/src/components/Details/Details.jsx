import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Details.scss";
import { Container } from "react-bootstrap";

const Details = ({ auth }) => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    axios
      .request({
        method: "GET",
        url: `http://localhost:4000/api/posts/${id}`,
        signal: controller.signal,
        headers: {
          "auth-token": auth,
        },
      })
      .then((response) => {
        setDetails(response);
        console.log(response);
      })
      .catch((error) => {
        if (error.message !== "canceled") {
          console.log(error);
        }
      });
    return () => controller.abort();
  });

  return (
    <section className="postDetails">
      <Container>
        {details && details.data.result.title}
        <br />
        {details && details.data.result.content}
      </Container>
    </section>
  );
};

export default Details;
