import "./Home.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import SkeletonPost from "../../skeletons/SkeletonPost/SkeletonPost";
import Posts from "./Posts";

const Home = ({ auth }) => {
  let numberOfSkeletonPosts = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const controller = new AbortController();
      axios
        .request({
          method: "GET",
          url: "http://localhost:4000/api/posts/",
          headers: {
            "auth-token": auth,
          },
          signal: controller.signal,
        })
        .then((response) => {
          setLoading(false);
          setResponse(response);

          console.log(response);
        })
        .catch((error) => {
          if (error.message !== "canceled") {
            console.log(error);
            setLoading(false);
          }
        });
      return () => controller.abort();
    }, 2000);
  }, [auth]);

  return (
    <section className="home">
      {loading ? (
        <div className="flex">
          <div>
            {numberOfSkeletonPosts.map((element) => (
              <SkeletonPost key={element} />
            ))}
          </div>
          <h1>test</h1>
        </div>
      ) : (
        <div className="flex">
          <Posts response={response} />
          <h1>User info</h1>
        </div>
      )}
    </section>
  );
};

export default Home;
