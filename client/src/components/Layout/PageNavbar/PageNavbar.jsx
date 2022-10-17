import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteCookie } from "../../../utils/cookies";
import Container from "react-bootstrap/Container";
import { unsetAuth } from "../../../redux/auth";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./PageNavbar.scss";
import { unsetUser } from "../../../redux/user";

function PageNavbar() {
  // redux
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);

  // logout user and delete cookies
  const logout = () => {
    deleteCookie("auth");
    deleteCookie("user");
    dispatch(unsetUser());
    dispatch(unsetAuth());
  };

  return (
    <Navbar bg="muted" variant="dark" expand="lg" className="mb-3">
      <Container>
        <LinkContainer to={auth ? "/" : "/login"}>
          <Navbar.Brand>Forum</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {auth ? (
              <>
                <LinkContainer to="/">
                  <Nav.Link active={false}>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/about">
                  <Nav.Link active={false}>About</Nav.Link>
                </LinkContainer>
                <Nav.Link
                  onClick={logout}
                  className="text-danger"
                  active={false}
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link active={false}>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link active={false}>Register</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default PageNavbar;
