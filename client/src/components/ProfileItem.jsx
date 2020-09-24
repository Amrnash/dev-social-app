import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Card, Button, Row, Col } from "react-bootstrap";
const ProfileItem = ({
  profile: {
    user: { _id, name },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <Card className="my-3">
      <Card.Body>
        <Row>
          <div
            style={{ height: 80, width: 80, background: "lightgrey" }}
            className="m-4"
          ></div>
          <Col>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              {status} {company && <span> at {company}</span>}
            </Card.Text>
            <Card.Text>{location && <span>{location}</span>}</Card.Text>
            <Button
              as={Link}
              to={`/profile/${_id}`}
              variant="primary"
              className="mt-2"
            >
              View Profile
            </Button>
          </Col>
          <Col>
            <ul style={{ listStyle: "none" }}>
              {skills.slice(0, 4).map((skill, index) => (
                <li key={index} className="text-primary">
                  <i className="fas fa-check"></i> {skill}
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export { ProfileItem };
