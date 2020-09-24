import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Spinner, Button } from "react-bootstrap";
import { getPost } from "../actions/post";
import { PostItem, CommentForm, CommentItem } from "../components";
const PostComponent = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);
  return loading || post === null ? (
    <Spinner
      animation="border"
      style={{
        height: 60,
        width: 60,
        fontSize: 16,
        marginLeft: "50%",
        marginTop: "40%",
      }}
    />
  ) : (
    <>
      <Button as={Link} className="my-2" to="/posts" variant="light">
        Back to posts
      </Button>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      {post.comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} postId={post._id} />
      ))}
    </>
  );
};
PostComponent.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});
const Post = connect(mapStateToProps, { getPost })(PostComponent);
export { Post };
