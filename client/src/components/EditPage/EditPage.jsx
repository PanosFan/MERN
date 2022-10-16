import { useParams } from "react-router-dom";
import "./EditPage.scss";

const EditPage = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export default EditPage;
