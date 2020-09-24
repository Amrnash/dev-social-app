import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { Card, Button, Row, Col } from "react-bootstrap";
import { addLike, removeLike, deletePost } from "../actions/post";
const PostItemComponent = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, user, likes, comments, date },
  showActions,
}) => {
  return (
    <Card className="p-4 my-2">
      <Row>
        <Col sm="2">
          <div style={{ height: 70, width: 70, background: "lightgrey" }}></div>
          <h4>{name}</h4>
        </Col>
        <Col>
          <p className="lead">{text}</p>
          <small className="text-muted mb-4">
            Posted on: <Moment format="YYYY/MM/DD">{date}</Moment>
          </small>
          {showActions && (
            <div className="d-flex">
              <Button
                variant="light"
                className="mx-1"
                onClick={() => addLike(_id)}
              >
                <i className="fas fa-thumbs-up"></i>{" "}
                {likes.length > 0 && <span>{likes.length}</span>}
              </Button>
              <Button
                variant="light"
                className="mx-1"
                onClick={() => removeLike(_id)}
              >
                <i className="fas fa-thumbs-down"></i>
              </Button>
              <Button
                variant="info"
                className="mx-1"
                as={Link}
                to={`/post/${_id}`}
              >
                Descussion{" "}
                {comments.length > 0 && <span>{comments.length}</span>}
              </Button>
              {!auth.loading && user === auth.user._id && (
                <Button
                  variant="danger"
                  className="mx-1"
                  onClick={() => deletePost(_id)}
                >
                  <i className="fas fa-times"></i>
                </Button>
              )}
            </div>
          )}
        </Col>
      </Row>
    </Card>
  );
};

PostItemComponent.propTypes = {
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addlike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
PostItemComponent.defaultProps = {
  showActions: true,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
const PostItem = connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItemComponent
);
export { PostItem };
