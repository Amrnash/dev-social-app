import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../actions/post";
import { Spinner } from "react-bootstrap";
import { PostItem, PostForm } from "../components";

const PostsComponent = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <>
      {loading ? (
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
        <div style={{ marginTop: 50 }}>
          <h1 className="text-primary">Posts</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Welcome to the community
          </p>
          <PostForm />
          <div className="posts">
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

PostsComponent.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});
const Posts = connect(mapStateToProps, { getPosts })(PostsComponent);
export { Posts };
