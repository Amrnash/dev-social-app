const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    console.log(req.user.id);
    const user = await User.findById(req.user.id).select("-password");
    return res.json(user);
  } catch (err) {
    throw new Error("Server Error");
  }
});
// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
  "/",
  [
    check("email", "please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      // see if user exists
      let user = await User.findOne({ email });
      if (!user) {
        const error = new Error("Invalid Credentials");
        error.status = 400;
        return next(error);
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        const error = new Error("Invalid Credentials");
        error.status = 400;
        return next(error);
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(payload, config.get("jwtSecret"));
      return res.send({ token, user });
    } catch (err) {
      const error = new Error(err.message);
      err.status = 500;
      next(error);
    }
  }
);

module.exports = router;
