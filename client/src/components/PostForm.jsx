import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../actions/post";
import { Form, Button } from "react-bootstrap";

const PostFormComponent = ({ addPost }) => {
  const [text, setText] = useState("");
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        addPost({ text });
        setText("");
      }}
      className="my-2"
    >
      <Form.Group controlId="text">
        <Form.Control
          as="textarea"
          cols="30"
          type="text"
          name="text"
          placeholder="Say Something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="submit" variant="dark" className="mt-3">
          Add
        </Button>
      </Form.Group>
    </Form>
  );
};

PostFormComponent.propTypes = {
  addPost: PropTypes.func.isRequired,
};
const PostForm = connect(null, { addPost })(PostFormComponent);
export { PostForm };
