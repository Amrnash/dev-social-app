import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { Card, Row, Col, Button } from "react-bootstrap";
import { deleteComment } from "../actions/post";

// auth,
//   { postId, comment: { _id, text, name, user, date } },
//   deleteComment
const CommentItemComponent = ({
  auth,
  postId,
  comment: { _id, text, name, user, date },
  deleteComment,
}) => {
  return (
    <Card className="p-4 my-2">
      <Row>
        <Col sm="2">
          <Link to={`/profile/${user}`}>
            <div
              style={{ height: 60, width: 60, background: "lightgrey" }}
            ></div>
            <h4>{name}</h4>
          </Link>
        </Col>
        <Col>
          <p className="lead">{text}</p>
          <small className="text-muted mb-4">
            Posted on: <Moment format="YYYY/MM/DD">{date}</Moment>
          </small>
          {!auth.loading && user === auth.user._id && (
            <Button
              variant="danger"
              onClick={() => deleteComment(postId, _id)}
              className="ml-4"
            >
              <i className="fas fa-times"></i>
            </Button>
          )}
        </Col>
      </Row>
    </Card>
  );
};

CommentItemComponent.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
const CommentItem = connect(mapStateToProps, { deleteComment })(
  CommentItemComponent
);
export { CommentItem };
