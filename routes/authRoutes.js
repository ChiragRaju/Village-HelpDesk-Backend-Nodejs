const express = require("express");
const userController = require("../controllers/userController");
const User = require("../models/userModel");

const router = express.Router();

/**
 * Route to handle user signup.
 * @param {string} "/signup" - The endpoint URL for user signup.
 * @param {function} userController.signup - Controller function for handling user signup logic.
 */
router.post("/signup", userController.signup);

/**
 * Route to handle user login.
 * @param {string} "/login" - The endpoint URL for user login.
 * @param {function} userController.login - Controller function for handling user login logic.
 */
router.post("/login", userController.login);

/**
 * Route to initiate the forgot password process.
 * @param {string} "/forgot-password" - The endpoint URL for initiating the forgot password process.
 * @param {function} userController.forgotPassword - Controller function for handling forgot password logic.
 */
router.post("/forgot-password", userController.forgotPassword);

/**
 * Route to handle the "Reset Password" feature.
 * @param {string} "/reset-password" - The endpoint URL for resetting the user password.
 * @param {function} userController.resetPassword - Controller function for handling reset password logic.
 */
router.post("/reset-password", userController.resetPassword);

/**
 * Route to get all users.
 * @param {string} "/users" - The endpoint URL for getting all users.
 * @param {function} (req, res) - Express request and response objects.
 */
router.get("/users", (req, res) => {
  const users = User.getAllUsers();
  res.json(users);
});

module.exports = router;
