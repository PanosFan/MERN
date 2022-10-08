const Posts = ({ response }) => (
  <div>
    {response &&
      response.data.map((item) => (
        <div key={item._id}>
          <h3>{item.title}</h3>
          <p>{item.content}</p>
        </div>
      ))}
  </div>
);

export default Posts;
