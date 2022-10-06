import "./App.scss";
import useAxios from "./hooks/useAxios";
import SkeletonWrapper from "./skeletons/SkeletonWrapper/SkeletonWrapper";

const App = () => {
  const { response, error, loading } = useAxios({
    url: "http://ec2-52-28-61-139.eu-central-1.compute.amazonaws.com:3000/test",
  });

  return (
    <div>
      <SkeletonWrapper />
      {response && response.data.response}
      {error}
      {loading && <div>Loading</div>}
    </div>
  );
};

export default App;
