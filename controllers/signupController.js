const model = require("../models/queries");
const { validateSignup, validationResult } = require("../utils/validation");
const bcrypt = require("bcryptjs");

exports.getSignup = async (req, res) => {
  res.render("signup");
};
exports.postSignup = [
  validateSignup,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("signup", {
        errors: errors.array(),
      });
    }
    const { email, password, firstName, lastName, admin } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await model.insertUser(email, hashedPassword, firstName, lastName, admin);
    res.redirect("/login");
  },
];
