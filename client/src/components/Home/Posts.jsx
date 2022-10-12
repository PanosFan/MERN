import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

const Posts = ({ response }) => (
  <section className="posts">
    {response.data.map((item) => (
      <div className="post" key={item._id}>
        <h3>{item.title}</h3>
        <p>{item.content}</p>
        <small className="text-muted">
          {capitalizeFirstLetter(item.user.name)}
        </small>
      </div>
    ))}
  </section>
);

export default Posts;
