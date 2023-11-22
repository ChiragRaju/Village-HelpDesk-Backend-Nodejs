const express = require("express");
const userController = require("../controllers/userController");
const User = require("../models/userModel");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/forgot-password", userController.forgotPassword);

// Route to handle the "Reset Password" feature
router.post("/reset-password", userController.resetPassword);
router.get("/users", (req, res) => {
    const users = User.getAllUsers();
    res.json(users);
  });


module.exports = router;
