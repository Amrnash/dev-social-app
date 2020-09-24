import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";
const NavBarComponent = ({
  auth: { isAuthenticated, loading },
  logout,
  history,
}) => {
  const authLinks = (
    <>
      <Nav.Item>
        <Nav.Link onClick={() => logout(history)}>
          {" "}
          <i className="fas fa-sign-out-alt"></i> Logout
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/profiles">
          Developers
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/dashboard">
          {" "}
          <i className="fas fa-user"></i> Dashboard
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/posts">
          Posts
        </Nav.Link>
      </Nav.Item>
    </>
  );
  const guestLinks = (
    <>
      <Nav.Item>
        <Nav.Link as={Link} to="/profiles">
          Developers
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/register">
          Register
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/login">
          Login
        </Nav.Link>
      </Nav.Item>
    </>
  );
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav>
          <Navbar.Brand as={Link} to="/">
            <i className="fas fa-code"></i> Developers Hub
          </Navbar.Brand>
          {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
        </Nav>
      </Container>
    </Navbar>
  );
};
NavBarComponent.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
const NavBar = connect(mapStateToProps, { logout })(
  withRouter(NavBarComponent)
);
export { NavBar };
