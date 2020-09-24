import React from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name },
  },
}) => {
  return (
    <>
      <Card className="d-flex flex-column align-items-center p-5">
        <p className="h2 mb-4">the image goes here</p>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {status} {company && <span>at {company}</span>}
        </Card.Text>
        <Card.Text>{location && <span>{location}</span>}</Card.Text>
        {website && (
          <a href={website} target="_blank" className="mr-1">
            <i className="fab fa-globe fa-2x"></i>
          </a>
        )}
        <div>
          {social && social.twitter && (
            <a href={social.twitter} target="_blank" className="mr-1">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
          )}
          {social && social.facebook && (
            <a href={social.facebook} target="_blank" className="mr-1">
              <i className="fab fa-facebook fa-2x"></i>
            </a>
          )}
          {social && social.linkedin && (
            <a href={social.linkedin} target="_blank" className="mr-1">
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
          )}
          {social && social.youtube && (
            <a href={social.youtube} target="_blank" className="mr-1">
              <i className="fab fa-youtube fa-2x"></i>
            </a>
          )}
          {social && social.instagram && (
            <a href={social.instagram} target="_blank">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
          )}
        </div>
      </Card>
    </>
  );
};
ProfileTop.propTyoes = {
  profile: PropTypes.object.isRequired,
};
export { ProfileTop };
