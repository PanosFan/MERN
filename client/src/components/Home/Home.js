import "./Home.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import Posts from "./Posts";
import SkeletonPost from "../Skeletons/SkeletonPost";

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
    <section className="home">
      {response && (
        <div className="flex">
          <Posts response={response} />
          <h1>User info</h1>
        </div>
      )}

      {!response && (
        <div className="flex">
          <div className="skelly">
            {[1, 2, 3, 4, 5].map((n) => (
              <SkeletonPost theme="dark" key={n} />
            ))}
          </div>
          <h1>User info</h1>
        </div>
      )}
    </section>
  );
};

export default Home;
