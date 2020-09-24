import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Table, Button } from "react-bootstrap";
import { deleteEducation } from "../actions/profile";
import { connect } from "react-redux";
const EducationComponent = ({ education, deleteEducation }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id} className="bg bg-light">
      <td>{edu.school}</td>
      <td>{edu.degree}</td>
      <td colSpan="1">
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
        {edu.to === null ? (
          "Now"
        ) : (
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        )}
      </td>
      <td>
        <Button variant="danger" onClick={() => deleteEducation(edu._id)}>
          Delete
        </Button>
      </td>
    </tr>
  ));
  return (
    <>
      <h3 className="my-4 text-primary">Education Credentials</h3>
      <Table striped hover>
        <thead>
          <tr className="bg bg-light">
            <th>School</th>
            <th>Degree</th>
            <th>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </Table>
    </>
  );
};

EducationComponent.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};
const Education = connect(null, { deleteEducation })(EducationComponent);
export { Education };
