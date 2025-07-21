const { body, validationResult } = require("express-validator");
require("dotenv").config();
const model = require("../models/queries");
const alphaErr = "must only contain letters.";
const emailErr = "must be a valid email";
const passwordErr = "must be at least 8 characters";
const emptyErr = "cannot be empty";
const existErr = "field must exist";

const validateSignup = [
  body("firstName")
    .exists()
    .withMessage(`First name ${existErr}`)
    .bail()
    .trim()
    .notEmpty()
    .withMessage(`First name ${emptyErr}`)
    .bail()
    .isAlpha("en-US", { ignore: " " })
    .withMessage(`First Name ${alphaErr}`),
  ,
  body("lastName")
    .exists()
    .withMessage(`Last name ${existErr}`)
    .bail()
    .trim()
    .notEmpty()
    .withMessage(`Last name ${emptyErr}`)
    .bail()
    .isAlpha("en-US", { ignore: " " })
    .withMessage(`Last Name ${alphaErr}`),
  body("email")
    .exists()
    .withMessage(`Email ${existErr}`)
    .bail()
    .trim()
    .notEmpty()
    .withMessage(`Email ${emptyErr}`)
    .bail()
    .isEmail()
    .withMessage(`Email ${emailErr}`)
    .custom(async (value) => {
      const user = await model.findUserByEmail(value);
      if (user) {
        throw new Error("Email is already used");
      }
    }),

  body("password")
    .exists()
    .withMessage(`Password ${existErr}`)
    .bail()
    .trim()
    .notEmpty()
    .withMessage(`Password ${emptyErr}`)
    .bail()
    .isLength({ min: 8 })
    .withMessage(`Password ${passwordErr}`),
  body("confirmPassword")
    .exists()
    .withMessage(`Password Confimation ${existErr}`)
    .bail()
    .trim()
    .notEmpty()
    .withMessage(`Password Confimation ${emptyErr}`)
    .bail()
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage(`Passwords must match`),
  body("admin")
    .optional({ values: "falsy" })
    .custom((value) => {
      return value === "on";
    }),
];

const validateJoin = [
  body("passcode")
    .exists()
    .withMessage(`Passcode ${existErr}`)
    .bail()
    .trim()
    .notEmpty()
    .withMessage(`Passcode ${emptyErr}`)
    .bail()
    .custom((value) => {
      return value === process.env.PASSCODE;
    })
    .withMessage(`Passcode does not match`),
];
module.exports = {
  validateSignup,
  validateJoin,
  validationResult,
};
