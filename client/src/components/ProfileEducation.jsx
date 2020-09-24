import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Card } from "react-bootstrap";
const ProfileEducation = ({
  education: { school, degree, fieldofstudy, current, to, from, description },
}) => {
  return (
    <>
      <Card.Title className="text-dark">{school}</Card.Title>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
        {!to ? " Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p>
        <strong>Degree: </strong> {degree}
      </p>
      <p>
        <strong>Field Of Study: </strong> {fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
      <hr className="my-3" />
    </>
  );
};
ProfileEducation.propTypes = {
  experience: PropTypes.array.isRequired,
};
export { ProfileEducation };
