import { setPosts, deletePostInStore } from "../../redux/posts";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.scss";

// components
import SkeletonProfile from "../Skeletons/SkeletonProfile";
import SkeletonPost from "../Skeletons/SkeletonPost";
import CreatePostModal from "./CreatePostModal";
import PaginatedPosts from "./PaginatedPosts";
import User from "../User/User";

const Home = () => {
  // redux
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);

  const [error, setError] = useState("");

  // axios
  const { response } = useAxios({
    url: "http://ec2-52-28-61-139.eu-central-1.compute.amazonaws.com:4000/api/posts/",
    auth,
  });

  const deletePost = (id) => {
    axios
      .request({
        method: "DELETE",
        url: `http://ec2-52-28-61-139.eu-central-1.compute.amazonaws.com:4000/api/posts/${id}`,
        headers: {
          "auth-token": auth,
        },
      })
      .then((response) => {
        setError("");
        console.log(response);
        dispatch(deletePostInStore(id));
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  };

  useEffect(() => {
    if (!response) return;
    dispatch(setPosts(response.data));
  }, [response]);

  return (
    <main className="home">
      <Container>
        {error && <p className="text-danger">{error}</p>}
        {posts && (
          <div className="flex">
            <div className="postsWrapper">
              <CreatePostModal />
              <PaginatedPosts deletePost={deletePost} />
            </div>
            <User />
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
