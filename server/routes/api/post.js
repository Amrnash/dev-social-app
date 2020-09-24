const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  "/",
  [auth, check("text", "Text is required").not().isEmpty()],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const user = await User.findById(req.user.id).select("-password");
      const newPost = new Post({
        text: req.body.text,
        user: req.user.id,
        name: user.name,
      });
      const post = await newPost.save();
      res.json({ post });
    } catch (err) {
      console.log(err.message);
      return next(new Error());
    }
  }
);
// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get("/", auth, async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    return next(new Error());
  }
});
// @route   GET api/post/:id
// @desc    Get post by id
// @access  Private
router.get("/:id", auth, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      const error = new Error("Server not found");
      error.status = 404;
      return next(error);
    }
    res.json(post);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      const error = new Error("Post not found");
      error.status = 404;
      return next(error);
    }
    return next(new Error());
  }
});
// @route   DELETE api/posts
// @desc    Delete a post
// @access  Private
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      const error = new Error("Post not found");
      error.status = 404;
      return next(error);
    }
    // check user
    if (post.user.toString() !== req.user.id) {
      const error = new Error("User not authorized");
      error.status = 401;
      return next(error);
    }
    await post.remove();
    res.json({ msg: "Post Removed" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      const error = new Error("Server not found");
      error.status = 404;
      return next(error);
    }
    console.log(err.message);
    return next(new Error());
  }
});
// @route   PUT api/post/like/:id
// @desc    Like a post
// @access  Private
router.put("/like/:id", auth, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    // check if post is already liked by this user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      const error = new Error("Post already liked");
      error.status = 400;
      return next(error);
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    return next(new Error());
  }
});
// @route   PUT api/post/unlike/:id
// @desc    Like a post
// @access  Private
router.delete("/like/:id", auth, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    // check if post is already liked by this user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      const error = new Error("Post has not yet been liked");
      error.status = 400;
      return next(error);
    }
    // get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    return next(new Error());
  }
});
// @route   POST api/post/comment/:id
// @desc    comment on a post
// @access  Private
router.post(
  "/comment/:id",
  [auth, check("text", "Text is required").not().isEmpty()],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);
      const newComment = {
        text: req.body.text,
        name: user.name,
        user: req.user.id,
      };
      console.log(post);
      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.log(err.message);
      return next(new Error());
    }
  }
);
// @route   DELETE api/post/comment/:id/:comment_id
// @desc    Delete a comment
// @access  Private
router.delete("/comment/:id/:comment_id", auth, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    // pull out the comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    //make sure comment exists
    if (!comment) {
      const error = new Error("comment does not exist");
      error.status = 400;
      return next(error);
    }
    // check user
    if (comment.user.toString() !== req.user.id) {
      const error = new Error("User not authorized");
      error.status = 401;
      return next(error);
    }
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.log(err.message);
    return next(new Error());
  }
});
module.exports = router;
