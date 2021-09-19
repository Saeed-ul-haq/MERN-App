const express = require("express");
const UserController = require("../controllers/userController");
const { check } = require("express-validator");

const router = express.Router();

router.get("/", UserController.getUsers);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  UserController.signup
);

router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  UserController.login
);

router.delete('/:uid',UserController.deleteUser);

module.exports = router;
