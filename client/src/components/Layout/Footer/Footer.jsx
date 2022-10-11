import { Container } from "react-bootstrap";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="text-center">
      <a
        href="https://github.com/PanosFan/MERN"
        target="_blank"
        rel="noopener noreferrer"
        className="link"
      >
        Panagiotis Fanartzis
        <span className="ms-1">&copy;{new Date().getFullYear()}</span>
      </a>
    </footer>
  );
};

export default Footer;
