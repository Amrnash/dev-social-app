const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");
const { check, validationResult } = require("express-validator");
const axios = require("axios");
const config = require("config");
// const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const uplaod = multer({ storage });
// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private
router.get("/me", auth, async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name"]);
    if (!profile) {
      const error = new Error("there is no profile for this user");
      error.status = 400;
      return next(error);
    }
    res.send(profile);
  } catch (err) {
    return next(err.message);
  }
});
// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "status is required").not().isEmpty(),
      check("skills", "Skills is a required field").not().isEmpty(),
    ],
    uplaod.single("profileImage"),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const namesOfProfileFields = [
      "company",
      "website",
      "location",
      "bio",
      "status",
      "githubusername",
      "skills",
      "youtube",
      "facebook",
      "twitter",
      "instagram",
      "linkedin",
    ];
    const socialFieldsNames = [
      "youtube",
      "twitter",
      "facebook",
      "linkedin",
      "instagram",
    ];
    const profileFields = {};
    profileFields.user = req.user.id;
    for (fieldName of namesOfProfileFields) {
      if (socialFieldsNames.includes(fieldName)) continue;
      if (req.body[fieldName]) profileFields[fieldName] = req.body[fieldName];
      if (fieldName === "skills")
        profileFields[fieldName] = req.body[fieldName]
          .split(",")
          .map((skill) => skill.trim());
    }
    // Build Social object
    profileFields.social = {};
    for (fieldName of socialFieldsNames) {
      if (req.body[fieldName])
        profileFields.social[fieldName] = req.body[fieldName];
    }
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      profile = new Profile(profileFields);
      await profile.save();
      res.status(201).json(profile);
    } catch (err) {
      console.error(error.message);
      const error = new Error(err.message);
      return next(error);
    }
  }
);
// @route   GET api/profile
// @desc    get all profiles
// @access  Public
router.get("/", async (req, res, next) => {
  try {
    const profiles = await Profile.find().populate("user", ["name"]);
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    return next(new Error("Server Error"));
  }
});
// @route   GET api/profile/user/:user_id
// @desc    get profile by user ID
// @access  Public
router.get("/user/:user_id", async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name"]);
    if (!profile) {
      const error = new Error("There is no profile for this user");
      return next(error);
    }
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    return next(new Error("Server error"));
  }
});
// @route   DELETE api/profile
// @desc    Delete profile, user & posts
// @access  Private
router.delete("/", auth, async (req, res, next) => {
  try {
    // Remove User's post
    await Post.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //Remove User
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User Deleted" });
  } catch (err) {
    console.log(err.message);
    return next(new Error("Server error"));
  }
});
// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const fieldsNames = [
      "title",
      "company",
      "lcoation",
      "from",
      "to",
      "current",
      "description",
    ];
    const newExp = {};
    for (fieldName of fieldsNames) {
      if (req.body[fieldName]) newExp[fieldName] = req.body[fieldName];
    }
    console.log(newExp);
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (!profile) return res.json({ error: "you do not have a profile" });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      return next(new Error("Server error"));
    }
  }
);
// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete an experience from profile
// @access  Private
router.delete("/experience/:exp_id", auth, async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // Get Remove index
    const removeIndex = profile.experience
      .map((exp) => exp.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {}
});

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
      check("fieldofstudy", "Field of study is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const fieldsNames = [
      "school",
      "degree",
      "fieldofstudy",
      "from",
      "to",
      "current",
      "description",
    ];
    const newEdu = {};
    for (fieldName of fieldsNames) {
      if (req.body[fieldName]) newEdu[fieldName] = req.body[fieldName];
    }
    console.log(newEdu);
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (!profile) return res.json({ error: "you do not have a profile" });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      return next(new Error("Server error"));
    }
  }
);
// @route   DELETE api/profile/education/:edu_id
// @desc    Delete an education from profile
// @access  Private
router.delete("/education/:edu_id", auth, async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // Get Remove index
    const removeIndex = profile.education
      .map((edu) => edu.id)
      .indexOf(req.params.exp_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    return next(new Error("Server error"));
  }
});
// @route   GET api/profile/github/:username
// @desc    Get user repos from Github
// @access  Public
router.get("/github/:username", async (req, res, next) => {
  try {
    const options = {
      url: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&clinet_secret=${config.get("githubSecret")}`,
      method: "get",
      headers: { "user-agent": "node.js" },
    };
    try {
      const response = await axios(options);
      return res.json(response.data);
    } catch (err) {
      console.log(err);
      return next(new Error("No github profile sent"));
    }
  } catch (err) {
    console.log(err.message);
    return next(new Error(err.message));
  }
});

module.exports = router;
