import "./Home.scss";
import SkeletonPost from "../../skeletons/SkeletonPost/SkeletonPost";

const Home = ({ response, loading, error }) => {
  let numberOfSkeletonPosts = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="home">
      {!loading && (
        <div className="flex">
          <div>{response && response.data.response}</div>
          <div>User info</div>
        </div>
      )}
      {loading && numberOfSkeletonPosts.map((element) => <SkeletonPost />)}
      {error}
    </div>
  );
};

export default Home;
