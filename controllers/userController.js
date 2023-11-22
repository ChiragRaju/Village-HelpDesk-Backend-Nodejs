
const jwt = require("jsonwebtoken");
const config = require("../config/config.js");
const bcrypt = require("bcrypt");
const User = require('../models/userModel');
const fs = require("fs");
const path = require("path");
const nodemailer = require('nodemailer');

const dbPath = path.join(__dirname, "../data/users.json");




function signup(req, res) {
  const { email,phoneNumber, password, state, pincode, city, firstName, lastName } = req.body;

  if (!firstName || !lastName||!email||!phoneNumber || !password ||  !state || !city || !pincode   ) {
    return res.status(400).json({ error: "All required fields must be provided." });
  }

  const existingUser = User.findUserByEmail(email);
  console.log("HI SIGNED UP")         

  if (existingUser) {
    return res.status(400).json({ error: "User with the provided phone number already exists." });
  }

  const newUser = User.createUser( firstName, lastName,email,phoneNumber, password, state,city, pincode );
  const token = generateToken(newUser);

  res.status(201).json({ message: "User registered successfully.", token });
}

function login(req, res) {
  const { email, password } = req.body;
  const user = User.findUserByEmail(email);

  if (!user) {
    return res.status(401).json({ error: "User not found." });
  }

  if (bcrypt.compareSync(password, user.password)) {
    const token = generateToken(user);
    res.json({ message: "Login successful.", token });
  } else {
    res.status(401).json({ error: "Invalid password." });
  }
}

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    config.jwtSecret,
    {
      expiresIn: "1h",
    }
  );
}
function forgotPassword(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  const users = getUsers();
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  const otp = generateOTP();
  user.resetPasswordOTP = otp;

  // Save the OTP to the users.json file
  saveUsers(users);

  // Send OTP email (replace with your email sending logic)
  sendOtpEmail(email, otp);

  res.status(200).json({ message: "OTP sent successfully." });
}


function resetPassword(req, res) {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ error: 'Email, OTP, and new password are required.' });
  }

  const users = getUsers();
  const user = users.find((u) => u.email === email);

  if (!user || user.resetPasswordOTP !== otp) {
    return res.status(401).json({ error: 'Invalid OTP.' });
  }

  // Update the password and remove the resetPasswordOTP field
  user.password = bcrypt.hashSync(newPassword, 10);
  delete user.resetPasswordOTP;

  // Save the updated data to the users.json file
  saveUsers(users);

  res.status(200).json({ message: 'Password reset successfully.' });
}
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Placeholder function for sending OTP email (replace with your email sending logic)
function sendOtpEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "chiragrajus2102@gmail.com",
      pass: "cfntzqatbcxgfffn",
    },
  });
  

  const mailOptions = {
    from: 'chiragrajus2102@gmail.com',
    to: email,
    subject: 'Password Reset OTP',
    text: `Your OTP for password reset is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending OTP email:', error);
    } else {
      console.log('OTP email sent successfully:', info.response);
    }
  });
}

function getUsers() {
  try {
    const data = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function saveUsers(users) {
  fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
}

module.exports = { signup, login,forgotPassword, resetPassword};
