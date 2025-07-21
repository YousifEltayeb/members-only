const model = require("../models/queries");
const passport = require("passport");

exports.getLogin = async (req, res) => {
  console.log(req.session.messages);
  res.render("login");
};
exports.postLogin = [
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  }),
];
