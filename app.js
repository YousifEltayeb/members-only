const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const path = require("node:path");
const session = require("express-session");
const pool = require("./models/pool");
const passport = require("passport");
const indexController = require("./controllers/indexController");
const signupController = require("./controllers/signupController");
const loginController = require("./controllers/loginController");
const logoutController = require("./controllers/logoutController");
const joinController = require("./controllers/joinController");
const newMessageController = require("./controllers/newMessageController");

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// connecting sessions table
app.use(
  session({
    store: new (require("connect-pg-simple")(session))({
      pool: pool,
    }),
    secret: process.env.COCKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 7 Days
    createTableIfMissing: true,
  }),
);
app.use(passport.session());

// auth config
require("./config/passport");

// to access currentUser in views
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// routes
app.get("/", indexController.getHome);
app.post("/:messageId/delete", indexController.postDeleteMessage);
app.get(/\/sign-up/i, signupController.getSignup);
app.post(/\/sign-up/i, signupController.postSignup);
app.get(/\/login/i, loginController.getLogin);
app.post(/\/login/i, loginController.postLogin);
app.get(/\/logout/i, logoutController.getLogout);
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
