const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");
// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  "/",
  [
    check("name", "Names is required").not().isEmpty(),
    check("email", "please include a valid email").isEmail(),
    check(
      "password",
      "please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      // see if user exists
      let user = await User.findOne({ email });
      if (user) {
        const error = new Error("This email is already taken");
        error.status = 400;
        next(error);
      }
      // create a new user based on user model
      user = new User({
        name,
        email,
        password,
      });
      // hash he password before saving to database
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      // save the user into the database
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(payload, config.get("jwtSecret"));
      return res.send({ token });
    } catch (err) {
      const error = new Error(err.message);
      err.status = 500;
      next(error);
    }
  }
);
module.exports = router;
