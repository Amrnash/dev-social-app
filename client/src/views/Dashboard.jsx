import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../actions/profile";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DashboardActions, Experience, Education } from "../components";
const DashboardComponent = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return loading && profile === null ? (
    <div
      className="d-flex justify-content-center"
      style={{ marginTop: "40vh" }}
    >
      <Spinner
        animation="border"
        role="status"
        style={{ height: 60, width: 60, fontSize: 16 }}
      />
    </div>
  ) : (
    <div style={{ marginTop: 50 }}>
      <h1 className="text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fa fa-user"></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />

          <div className="my-4">
            <Button variant="danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus"></i> Delete My Account
            </Button>
          </div>
        </>
      ) : (
        <>
          <p className="lead">
            You have not yet setup a profile, please add some info
          </p>
          <Button as={Link} to="/create-profile">
            Create Profile
          </Button>
        </>
      )}
    </div>
  );
};

DashboardComponent.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
const Dashboard = connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
})(DashboardComponent);
export { Dashboard };
