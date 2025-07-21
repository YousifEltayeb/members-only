const model = require("../models/queries");

exports.getHome = async (req, res) => {
  const messages = await model.getMessages();
  console.log(messages);
  res.render("index", { messages: messages });
};

exports.postDeleteMessage = async (req, res) => {
  const { userId, messageId } = req.params;
  res.send(userId, messageId);
};
