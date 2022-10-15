import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./User.scss";

const User = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="mb-5">
      <h2>{user}</h2>
      <Link to="/user/password">Edit password</Link>
    </div>
  );
};

export default User;
