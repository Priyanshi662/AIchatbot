const express = require('express');
const { check } = require('express-validator');

const { register, login } = require('../controllers/auth.js');
const { tokenAuth } = require("../middleware/auth.js");
const { validate } = require("../utils/validator.js");

const router = express.Router();

router.post(
  "/register",
  [
    check("name")
      .exists().withMessage("username is required"),
    check("password")
      .exists().withMessage("password is required")
      .isLength({ min: 8 }).withMessage("password must have at least 8 characters")
  ],
  validate,
  register
);

router.post(
  "/login",
  [
    check("email")
      .exists().withMessage("username is required"),
    check("password")
      .exists().withMessage("password is required")
      .isLength({ min: 8 }).withMessage("password must have at least 8 characters")
  ],
  validate,
  login
);

router.get(
  "/checktoken",
  tokenAuth,
  (req, res) => res.status(200).json({
    username: req.user.username
  })
);

module.exports = router;
