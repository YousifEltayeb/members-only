const model = require("../models/queries");
const passport = require("passport");
const { validateLogin, validationResult } = require("../utils/validation");

exports.getLogin = async (req, res) => {
  if (req.session.messages) {
    const err = req.session.messages.pop();
    return res.render("login", { loginError: err });
  }
  res.render("login");
};
exports.postLogin = [
  validateLogin,
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("login", {
        errors: errors.array(),
      });
    }
    next();
  },
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  }),
];
