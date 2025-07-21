const model = require("../models/queries");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

const customFields = {
  usernameField: "email",
};
passport.use(
  new LocalStrategy(customFields, async (username, password, done) => {
    try {
      const user = await model.findUserByEmail(username);

      if (!user) {
        return done(null, false, { message: "Incorrect email" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await model.findUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
