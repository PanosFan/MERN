import "./Home.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import SkeletonPost from "../../skeletons/SkeletonPost/SkeletonPost";

const Home = ({ auth }) => {
  let numberOfSkeletonPosts = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const controller = new AbortController();
      axios
        .request({
          method: "GET",
          url: "http://localhost:4000/api/posts/",
          headers: {
            ["auth-token"]: auth,
          },
          signal: controller.signal,
        })
        .then((response) => {
          setLoading(false);
          setResponse(response);
          setError(null);
          console.log(response);
        })
        .catch((error) => {
          if (error.message != "canceled") {
            console.log(error);
            setLoading(false);
            setError(error.message);
          }
        });
      return () => controller.abort();
    }, 2000);
  }, [auth]);

  return (
    <div className="home">
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
          <div>
            {response &&
              response.data.map((item) => (
                <div key={item._id}>
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                </div>
              ))}
          </div>
          <h1>User info</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
