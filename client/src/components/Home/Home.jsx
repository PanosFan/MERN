import SkeletonProfile from "../Skeletons/SkeletonProfile";
import SkeletonPost from "../Skeletons/SkeletonPost";
import PaginatedPosts from "./PaginatedPosts";
import { Container } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import "./Home.scss";

const Home = ({ auth, user }) => {
  const { response, error } = useAxios({
    url: "http://localhost:4000/api/posts/",
    auth,
  });

  return (
    <main className="home">
      <Container>
        {response && (
          <div className="flex">
            <PaginatedPosts posts={response.data} />
            <h1 className="mb-5">{user}</h1>
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
