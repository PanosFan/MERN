import SkeletonPost from "../Skeletons/SkeletonPost";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Posts from "./Posts";
import axios from "axios";
import "./Home.scss";

const Home = ({ auth }) => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const controller = new AbortController();
      axios
        .request({
          method: "GET",
          url: "http://localhost:4000/api/posts/",
          signal: controller.signal,
          headers: {
            "auth-token": auth,
          },
        })
        .then((response) => {
          setResponse(response);
          console.log(response);
        })
        .catch((error) => {
          if (error.message !== "canceled") {
            console.log(error);
          }
        });
      return () => controller.abort();
    }, 1500);
  }, [auth]);

  return (
    <main className="home">
      <Container>
        {response && (
          <div className="flex">
            <Posts response={response} />
            <h1 className="mb-5">User info</h1>
          </div>
        )}

        {!response && (
          <div className="flex">
            <div className="skelletons">
              {[1, 2, 3, 4, 5].map((n) => (
                <SkeletonPost theme="dark" key={n} />
              ))}
            </div>
            <h1>User info</h1>
          </div>
        )}
      </Container>
    </main>
  );
};

export default Home;