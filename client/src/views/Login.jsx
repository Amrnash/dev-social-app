import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { login } from "../actions/auth";
const LoginComponent = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };
  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Form style={{ marginTop: 50 }} onSubmit={handleSubmit}>
      <h2 className="text-primary">Login</h2>
      <p>
        <i className="fas fa-user"></i> Sign Into Your Your Account
      </p>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter Email"
          value={email}
          name="email"
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter a password"
          value={password}
          name="password"
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" style={{ marginTop: 10 }}>
        Login
      </Button>
    </Form>
  );
};
login.propTypers = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
const Login = connect(mapStateToProps, { login })(LoginComponent);
export { Login };
