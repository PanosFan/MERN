import "./App.scss";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar";
import useAxios from "./hooks/useAxios";

const App = () => {
  // const { response, error, loading } = useAxios({
  //   url: "http://ec2-52-28-61-139.eu-central-1.compute.amazonaws.com:3000/test",
  // });
  const { response, error, loading } = useAxios({
    url: "http://localhost:4000/test",
  });

  return (
    <>
      <Navbar />
      <div className="container">
        <Home response={response} error={error} loading={loading} />
      </div>
    </>
  );
};

export default App;
