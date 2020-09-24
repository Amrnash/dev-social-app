import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Table, Button } from "react-bootstrap";
import { deleteExperience } from "../actions/profile";
import { connect } from "react-redux";
import { propTypes } from "react-bootstrap/esm/Image";
const ExperienceComponent = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id} className="bg bg-light">
      <td>{exp.company}</td>
      <td>{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
        {exp.tp === null ? (
          "Now"
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </td>
      <td>
        <Button variant="danger" onClick={() => deleteExperience(exp._id)}>
          Delete
        </Button>
      </td>
    </tr>
  ));
  return (
    <>
      <h3 className="my-4 text-primary">Experience Credentials</h3>
      <Table striped hover>
        <thead>
          <tr className="bg bg-light">
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </Table>
    </>
  );
};

ExperienceComponent.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};
const Experience = connect(null, { deleteExperience })(ExperienceComponent);
export { Experience };
