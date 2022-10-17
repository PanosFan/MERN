import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";

const Post = ({ item, deletePost }) => {
  const navigate = useNavigate();
  const { userID } = useSelector((state) => state.userID);

  return (
    <div className="post">
      <h3>{item.title}</h3>
      <p>{item.content}</p>
      <div className="flex">
        <small className="text-muted">
          {capitalizeFirstLetter(item.user.name)}
        </small>
        <ButtonGroup>
          <Button
            className="me-2"
            variant="outline-info"
            onClick={() => navigate(`/details/${item._id}`)}
          >
            Read more
          </Button>
          {item.user.id == userID && (
            <ButtonGroup>
              <Button
                className="me-2"
                variant="outline-warning"
                onClick={() => navigate(`/edit/${item._id}`)}
              >
                Update
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => deletePost(item._id)}
              >
                Delete
              </Button>
            </ButtonGroup>
          )}
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Post;
