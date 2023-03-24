import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import { deleteCommentFromStore } from "../../redux/posts";
import { useDispatch, useSelector } from "react-redux";
import CreateCommentForm from "./CreateCommentForm";
import { Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import "./Comments.scss";

const Comments = ({ id }) => {
  const { posts } = useSelector((state) => state.posts);
  const { userID } = useSelector((state) => state.userID);
  const { auth } = useSelector((state) => state.auth);

  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleDelete = (commentID) => {
    axios
      .request({
        method: "DELETE",
        url: `http://localhost:4000/api/posts/${id}/${commentID}`,
        headers: {
          "auth-token": auth,
        },
      })
      .then((response) => {
        setError("");
        dispatch(
          deleteCommentFromStore({
            id,
            commentID,
          })
        );
        console.log(response);
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  };

  return (
    <section className="comments">
      <CreateCommentForm id={id} />
      {error && <p className="text-danger">{error}</p>}
      {posts &&
        posts
          .filter((item) => item._id === id)
          .map((item) =>
            item.comments?.map((item) => (
              <div key={item._id} className="comment">
                <p>{item.content}</p>
                <div className="flex">
                  <small className="text-muted">
                    {capitalizeFirstLetter(item.user.name)}
                  </small>

                  {item.user.id == userID && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
    </section>
  );
};

export default Comments;
