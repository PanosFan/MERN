import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import CreateCommentForm from "./CreateCommentForm";
import "./Comments.scss";

const Comments = ({ id, posts }) => {
  return (
    <section className="comments">
      <CreateCommentForm id={id} />
      {posts &&
        posts
          .filter((item) => item._id === id)
          .map((item) =>
            item.comments?.map((item, i) => (
              <div key={i} className="comment">
                <p>{item.content}</p>
                <small className="text-muted">
                  {capitalizeFirstLetter(item.user.name)}
                </small>
              </div>
            ))
          )}
    </section>
  );
};

export default Comments;
