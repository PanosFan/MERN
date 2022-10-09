import CustomToast from "../CustomToast";
import "./Register.scss";

const Register = ({ auth, setAuth }) => {
  return (
    <section className="register container">
      <p>Register page</p>
      <CustomToast />
    </section>
  );
};

export default Register;
