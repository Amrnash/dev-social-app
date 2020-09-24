import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addEducation } from "../actions/profile";
import { Form, Button } from "react-bootstrap";
const AddEducationComponent = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const [toDateDisabled, setToDateDisabled] = useState(false);
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addEducation(formData, history);
  };
  return (
    <div style={{ marginTop: 50 }}>
      <Form onSubmit={handleSubmit}>
        <h1 className="text-primary mb-1">Add Your Education</h1>
        <p className="lead">
          Add any school or bootcamp that you hace attended
        </p>
        <Form.Group controlId="school">
          <Form.Control
            type="text"
            name="school"
            placeholder="* School or Bootcamp"
            value={school}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="degree">
          <Form.Control
            type="text"
            name="degree"
            placeholder="Degree or Certificate"
            value={degree}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="fieldofstudy">
          <Form.Control
            type="text"
            name="fieldofstudy"
            placeholder="Field of Study"
            value={fieldofstudy}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="from">
          <Form.Label>From Date</Form.Label>
          <Form.Control
            type="date"
            name="from"
            value={from}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="current">
          <Form.Check
            type="checkbox"
            name="current"
            label="Current"
            value={current}
            onChange={() => setToDateDisabled(!toDateDisabled)}
          />
        </Form.Group>
        <Form.Group controlId="to">
          <Form.Label>To Date</Form.Label>
          <Form.Control
            type="date"
            name="to"
            placeholder="To Date"
            value={to}
            onChange={handleChange}
            disabled={toDateDisabled}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Control
            as="textarea"
            type="text"
            rows="3"
            name="description"
            placeholder="Program Description"
            value={description}
            onChange={handleChange}
          />
        </Form.Group>
        <div className="my-4">
          <Button variant="primary mr-2" type="submit">
            Add Education
          </Button>
          <Button variant="light" as={Link} to="/dashboard">
            Go Back
          </Button>
        </div>
      </Form>
    </div>
  );
};
AddEducationComponent.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

const AddEducation = connect(null, { addEducation })(AddEducationComponent);
export { AddEducation };
