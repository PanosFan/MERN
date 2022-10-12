import { LinkContainer } from "react-router-bootstrap";
import { deleteCookie } from "../../../utils/cookies";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./PageNavbar.scss";

function PageNavbar({ auth, setAuth }) {
  const logout = () => {
    deleteCookie("auth");
    setAuth(null);
  };

  return (
    <Navbar bg="muted" variant="dark" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand>Forum</Navbar.Brand>
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