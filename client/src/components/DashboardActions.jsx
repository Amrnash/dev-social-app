import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const DashboardActions = () => {
  return (
    <div>
      <Button variant="light" className="mr-2" as={Link} to="/edit-profile">
        <i className="fas fa-user-circle text-primary"></i> Edit Profile
      </Button>
      <Button variant="light" className="mr-2" as={Link} to="/add-experience">
        <i className="fas fa-plus-circle text-primary"></i> Add Experience
      </Button>
      <Button variant="light" as={Link} to="/add-education">
        <i className="fas fa-graduation-cap text-primary"></i> Add Education
      </Button>
    </div>
  );
};

export { DashboardActions };
