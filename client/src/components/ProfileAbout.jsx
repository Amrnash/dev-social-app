import React from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  return (
    <>
      {bio && (
        <>
          <Card className="my-3 d-flex flex-column align-items-center p-4">
            <Card.Title className="text-primary">
              {name.trim().split(" ")[0]}'s Bio
            </Card.Title>
            <Card.Text className="my-2">{bio}</Card.Text>
          </Card>
        </>
      )}
      {skills.length > 0 && (
        <Card className="my-3 d-flex flex-column align-items-center p-4">
          <Card.Title className="text-primary mt-3">Skill Set</Card.Title>
          <ul style={{ listStyle: "none" }} className="d-flex">
            {skills.map((skill, index) => (
              <li key={index} className="p-1 mx-2">
                <i className="fas fa-check"></i> {skill}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </>
  );
};
ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};
export { ProfileAbout };
