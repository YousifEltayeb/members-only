const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const path = require("node:path");
const indexController = require("./controllers/indexController");
const signupController = require("./controllers/signupController");
const loginController = require("./controllers/loginController");
const joinController = require("./controllers/joinController");
const newMessageController = require("./controllers/newMessageController");

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// auth and session config
require("./config/passport.js");

// to access currentUser in views
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// routes
app.get("/", indexController.getHome);
app.get(/\/sign-up/i, signupController.getSignup);
app.post(/\/sign-up/i, signupController.postSignup);
app.get(/\/login/i, loginController.getLogin);
app.post(/\/login/i, loginController.postLogin);
app.get(/\/join/i, joinController.getJoin);
app.post(/\/join/i, joinController.postJoin);
app.get(/\/new-message/i, newMessageController.getNewMessage);
app.post(/\/new-message/i, newMessageController.postNewMessage);

app.all("/{*splat}", (req, res) => {
  res.status(404).render("404");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

app.listen(PORT, () => console.log("Server running on port: " + PORT));
