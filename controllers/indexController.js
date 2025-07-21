const model = require("../models/queries");

exports.getHome = async (req, res) => {
  res.render("index");
};
