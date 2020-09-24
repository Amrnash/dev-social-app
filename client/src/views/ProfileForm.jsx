import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, InputGroup, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { createProfile } from "../actions/profile";
const ProfileFormComponent = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });
  const [showSocialInputs, setShowSocialInputs] = useState(false);
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };
  return (
    <div style={{ marginTop: 50 }}>
      <h1 className="text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="status">
          <Form.Control
            as="select"
            type="text"
            name="status"
            placeholder="Professional Status"
            value={status}
            onChange={handleChange}
          >
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor or Teacher">Instructor or Teacher</option>
            <option value="Other">Other</option>
          </Form.Control>
          <Form.Text className="text-muted">
            Give us an idea of what you are at in your career
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="company">
          <Form.Control
            type="text"
            name="company"
            placeholder="Company"
            value={company}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            Could be your own company or one you are working for
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="website">
          <Form.Control
            type="text"
            name="website"
            placeholder="Website"
            value={website}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            Could be your own or a company website
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="location">
          <Form.Control
            type="text"
            name="location"
            placeholder="Location"
            value={location}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">city (eg, Cairo)</Form.Text>
        </Form.Group>
        <Form.Group controlId="skills">
          <Form.Control
            type="text"
            name="skills"
            placeholder="Skills"
            value={skills}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            Please use comma seperated values (eg, HTML, CSS, JS)
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="githubusername">
          <Form.Control
            type="text"
            name="githubusername"
            placeholder="Github Username"
            value={githubusername}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            If you want your latest repos and github link add you username
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="bio">
          <Form.Control
            as="textarea"
            type="text"
            name="bio"
            placeholder="A Short bio of yourself"
            value={bio}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            Tell us a little about yourself
          </Form.Text>
        </Form.Group>
        {/* Social links */}
        <Button
          variant="light"
          onClick={() => setShowSocialInputs(!showSocialInputs)}
        >
          Add Social Network Links{" "}
          <small className="text-secondary">*Optional</small>
        </Button>
        {showSocialInputs && (
          <>
            <InputGroup className="my-2">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i className="fab fa-facebook-square"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                id="facebook"
                placeholder="Facebook URL"
                type="text"
                name="facebook"
                value={facebook}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup className="my-2">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i className="fab fa-twitter-square"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                id="twitter"
                placeholder="Twitter URL"
                type="text"
                name="twitter"
                value={twitter}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup className="my-2">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i className="fab fa-youtube-square"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                id="youtube"
                placeholder="Youtube URL"
                type="text"
                name="youtube"
                value={youtube}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup className="my-2">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i className="fab fa-linkedin"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                id="linkedin"
                placeholder="Linkedin URL"
                type="text"
                name="linkedin"
                value={linkedin}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup className="my-2">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i className="fab fa-instagram"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                id="instagram"
                placeholder="Instagram URL"
                type="text"
                name="instagram"
                value={instagram}
                onChange={handleChange}
              />
            </InputGroup>
          </>
        )}
        <div className="my-4">
          <Button variant="primary mr-2" type="submit">
            Submit
          </Button>
          <Button variant="light" as={Link} to="/dashboard">
            Go Back
          </Button>
        </div>
      </Form>
    </div>
  );
};

ProfileFormComponent.propTypes = {
  createProfile: PropTypes.func.isRequired,
};
const ProfileForm = connect(null, { createProfile })(
  withRouter(ProfileFormComponent)
);
export { ProfileForm };
