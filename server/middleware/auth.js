const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");
  //check if no token
  if (!token) {
    const error = new Error("you are not authorized");
    error.status = 401;
    throw error;
  }
  // verify the token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    const error = new Error("Token is not valid");
    error.status = 401;
    throw error;
  }
};
