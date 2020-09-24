import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../actions/post";
import { Form, Button } from "react-bootstrap";
const CommentFormComponent = ({ postId, addComment }) => {
  const [text, setText] = useState("");
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        addComment(postId, { text });
        setText("");
      }}
      className="my-4"
    >
      {" "}
      <Form.Group controlId="text">
        <Form.Control
          as="textarea"
          cols="30"
          type="text"
          name="text"
          placeholder="Add a Comment..."
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

CommentFormComponent.propTypes = {
  addComment: PropTypes.func.isRequired,
};
const CommentForm = connect(null, { addComment })(CommentFormComponent);
export { CommentForm };
