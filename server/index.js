const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const dir = path.join(__dirname, "uploads");
// Connect to database
connectDB();
// ----------- Middlewares ----------- //
app.use(express.json({ extended: false }));
app.get("/", (req, res, next) => {
  return res.send("<h1>hello world</h1>");
});
// ----------- Routes ----------- //
app.use(cors());
app.use(express.static(dir));
app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/post", require("./routes/api/post"));
// ----------- Handling Errors ----------- //
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Error processing your request";
  return res.status(status).send({ errors: [{ msg: message }] });
});
app.listen(port, () => `server is runing on port ${port}`);
