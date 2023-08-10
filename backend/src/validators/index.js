const { param, body, query } = require("express-validator");

exports.validatePayJob = [
  param("id").isInt({ gt: 0 }).withMessage("Job ID must be a positive integer"),
];

exports.validateDeposit = [
  param("userId")
    .isInt({ gt: 0 })
    .withMessage("User ID must be a positive integer"),
  body("amount")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be a positive number"),
];

exports.validateBestProfession = [
  query("start").isDate().withMessage("Start date must be a valid date"),
  query("end").isDate().withMessage("End date must be a valid date"),
];

exports.validateBestClients = [
  ...exports.validateBestProfession,
  query("limit")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Limit must be a positive integer"),
];
