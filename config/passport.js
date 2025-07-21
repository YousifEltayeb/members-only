const passport = require("passport");
const session = require("express-session");
const pool = require("./models/pool");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

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
  }),
);
app.use(passport.session());
