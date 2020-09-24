import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const LandingComponent = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <section className="landing">
      <div className="dark-overlay">
        <Container>
          <div className="landing-inner d-flex flex-column align-items-center">
            <h1 className="head">Developers Hub</h1>
            <p className="lead">
              Create a developer profile/portfolio, share posts and get help
              from other developers
            </p>
            <div className="buttons">
              <Button
                as={Link}
                to="/register"
                variant="primary"
                style={{ marginRight: 15 }}
              >
                Sign Up
              </Button>
              <Button as={Link} to="/login" variant="light">
                Login
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};
LandingComponent.propTypes = {
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
const Landing = connect(mapStateToProps)(LandingComponent);
export { Landing };
