import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addExperience } from "../actions/profile";
import { Form, Button } from "react-bootstrap";
const AddExperienceComponent = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const [toDateDisabled, setToDateDisabled] = useState(false);
  const { company, title, location, from, to, current, description } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addExperience(formData, history);
  };
  return (
    <div style={{ marginTop: 50 }}>
      <Form onSubmit={handleSubmit}>
        <h1 className="text-primary mb-1">Add An Experience</h1>
        <p className="lead">
          Add any developer/programming positions that you have had in the past
        </p>
        <Form.Group controlId="title">
          <Form.Control
            type="text"
            name="title"
            placeholder="Job Title"
            value={title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="company">
          <Form.Control
            type="text"
            name="company"
            placeholder="Company"
            value={company}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="location">
          <Form.Control
            type="text"
            name="location"
            placeholder="Location"
            value={location}
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
            label="Current Job"
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
            placeholder="Job Description"
            value={description}
            onChange={handleChange}
          />
        </Form.Group>
        <div className="my-4">
          <Button variant="primary mr-2" type="submit">
            Add Experience
          </Button>
          <Button variant="light" as={Link} to="/dashboard">
            Go Back
          </Button>
        </div>
      </Form>
    </div>
  );
};
AddExperienceComponent.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

const AddExperience = connect(null, { addExperience })(AddExperienceComponent);
export { AddExperience };
