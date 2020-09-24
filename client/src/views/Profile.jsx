import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Spinner, Button, Card, Row, Col } from "react-bootstrap";
import { getProfileById } from "../actions/profile";
import {
  ProfileTop,
  ProfileAbout,
  ProfileExperience,
  ProfileEducation,
  ProfileGithub,
} from "../components";
const ProfileComponent = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById]);
  return (
    <>
      {profile === null || loading ? (
        <Spinner
          animation="border"
          style={{
            height: 60,
            width: 60,
            fontSize: 16,
            marginLeft: "50%",
            marginTop: "40%",
          }}
        />
      ) : (
        <>
          <Button as={Link} to="/profiles" variant="light" className="my-2">
            Back to Profiles
          </Button>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Button
                to="/edit-profile"
                as={Link}
                className="my-2 mx-2"
                variant="dark"
              >
                Edit Profile
              </Button>
            )}
          <ProfileTop profile={profile} />
          <ProfileAbout profile={profile} />
          <Row>
            <Col>
              <Card className="p-4">
                <Card.Title className="text-primary">Experience</Card.Title>
                {profile.experience.length > 0 ? (
                  <>
                    {profile.experience.map((experience) => (
                      <ProfileExperience
                        key={experience._id}
                        experience={experience}
                      />
                    ))}
                  </>
                ) : (
                  <h4>No Experience Credentials</h4>
                )}
              </Card>
            </Col>
            <Col>
              <Card className="p-4">
                <Card.Title className="text-primary">Education</Card.Title>
                {profile.education.length > 0 ? (
                  <>
                    {profile.education.map((education) => (
                      <ProfileEducation
                        key={education._id}
                        education={education}
                      />
                    ))}
                  </>
                ) : (
                  <h4>No Education Credentials</h4>
                )}
              </Card>
            </Col>
          </Row>
          {profile.githubusername && (
            <ProfileGithub username={profile.githubusername} />
          )}
        </>
      )}
    </>
  );
};

ProfileComponent.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
const Profile = connect(mapStateToProps, { getProfileById })(ProfileComponent);
export { Profile };
