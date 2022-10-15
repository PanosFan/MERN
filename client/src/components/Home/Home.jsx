import { Container } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import { useSelector } from "react-redux";
import "./Home.scss";

// components
import SkeletonProfile from "../Skeletons/SkeletonProfile";
import SkeletonPost from "../Skeletons/SkeletonPost";
import PaginatedPosts from "./PaginatedPosts";
import User from "../User/User";

const Home = () => {
  // redux
  const { auth } = useSelector((state) => state.auth);

  // axios
  const { response } = useAxios({
    url: "http://localhost:4000/api/posts/",
    auth,
  });

  return (
    <main className="home">
      <Container>
        {response && (
          <div className="flex">
            <PaginatedPosts posts={response.data} />
            <User />
          </div>
        )}

        {!response && (
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
