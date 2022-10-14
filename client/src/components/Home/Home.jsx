import SkeletonProfile from "../Skeletons/SkeletonProfile";
import SkeletonPost from "../Skeletons/SkeletonPost";
import PaginatedPosts from "./PaginatedPosts";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import "./Home.scss";

const Home = ({ auth, user }) => {
  const [posts, setPosts] = useState(null);

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
          setPosts(response);
          console.log(response);
        })
        .catch((error) => {
          if (error.message !== "canceled") {
            console.log(error);
          }
        });
      return () => controller.abort();
    }, 1500);
  }, []);

  return (
    <main className="home">
      <Container>
        {posts && (
          <div className="flex">
            <PaginatedPosts posts={posts.data} />
            <h1 className="mb-5">{user}</h1>
          </div>
        )}

        {!posts && (
          <div className="flex">
            <div className="skelletons">
              {[1, 2, 3, 4].map((n) => (
                <SkeletonPost key={n} />
              ))}
            </div>
            <SkeletonProfile />
          </div>
        )}
      </Container>
    </main>
  );
};

export default Home;
