const { body, validationResult } = require("express-validator");
const yearErr = "must be a number between 1940 and 2026";
const priceErr = "must be a number between 1000$ and 5000000$";
const alphaErr = "must only contain letters.";

const validateCar = [
  body("model").trim(),
  body("year")
    .trim()
    .isInt({ min: 1940, max: 2026 })
    .withMessage(`Year ${yearErr}`),
  body("price")
    .trim()
    .isInt({ min: 1000, max: 5000000 })
    .withMessage(`Price ${priceErr}`),
  body("type")
    .trim()
    .isAlpha("en-US", { ignore: " " })
    .withMessage(`Type ${alphaErr}`),
  body("brand")
    .trim()
    .isAlpha("en-US", { ignore: " " })
    .withMessage(`Brand ${alphaErr}`),
];

const validateType = body("name")
  .trim()
  .isAlpha("en-US", { ignore: " " })
  .withMessage(`Name ${alphaErr}`);
const validateBrand = body("name")
  .trim()
  .isAlpha("en-US", { ignore: " " })
  .withMessage(`Name ${alphaErr}`);

module.exports = {
  validateCar,
  validateType,
  validateBrand,
  validationResult,
};
