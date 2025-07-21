const model = require("../models/queries");
const { validateJoin, validationResult } = require("../utils/validation");

exports.getJoin = async (req, res) => {
  res.render("join");
};
exports.postJoin = [
  validateJoin,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("join", {
        errors: errors.array(),
      });
    }
    await model.approveMember(req.user.id);
    res.redirect("/");
  },
];
