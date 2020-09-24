import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Card } from "react-bootstrap";
const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description },
}) => {
  return (
    <>
      <Card.Title className="text-dark">{company}</Card.Title>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
        {!to ? " Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p>
        <strong>Position: </strong> {title}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
      <hr className="my-3" />
    </>
  );
};
ProfileExperience.propTypes = {
  experience: PropTypes.array.isRequired,
};
export { ProfileExperience };
