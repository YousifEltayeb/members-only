const model = require("../models/queries");
const { validateMessage, validationResult } = require("../utils/validation");
exports.getNewMessage = async (req, res) => {
  res.render("newMessage");
};
exports.postNewMessage = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("newMessage", {
        errors: errors.array(),
      });
    }

    const { message, title } = req.body;
    await model.insertMessage(title, message, req.user.id);
    res.redirect("/");
  },
];
