import CreateCommentForm from "./CreateCommentForm";
import "./Comments.scss";

const Comments = ({ createComment }) => {
  return (
    <section className="comments">
      <CreateCommentForm createComment={createComment} />
      Comments
    </section>
  );
};

export default Comments;
