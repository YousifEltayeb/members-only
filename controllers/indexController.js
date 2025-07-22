const model = require("../models/queries");

exports.getHome = async (req, res) => {
  const messages = await model.getMessages();
  res.render("index", { messages: messages });
};

exports.postDeleteMessage = async (req, res) => {
  const { messageId } = req.params;
  if (req.user.admin_status) {
    await model.deleteMessage(messageId);
    res.redirect("/");
  } else {
    res.status(401).send("you're not authorized for this action");
  }
};
