// adminController.js

const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const Admin = require('../models/adminModel'); // Make sure to have the correct path for the admin model
const config = require('../config/config');

const dbPath = path.join(__dirname, '../data', 'adminUsers.json');

/**
 * Seed the initial admin user if it doesn't exist
 */
const seedAdminUser = () => {
  const adminUser = new Admin({
    email: "",
    password: ""
  });

  const adminUserExists = fs.existsSync(dbPath);

  if (!adminUserExists) {
    const adminUsers = [adminUser];
    fs.writeFileSync(dbPath, JSON.stringify(adminUsers, null, 2));
  }
};

/**
 * Handle login for admin users
 * @param {Object} req - Express request object with email and password in the body
 * @param {Object} res - Express response object
 */
const login = (req, res) => {
  const { email, password } = req.body;
  const adminUsers = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

  const adminUser = adminUsers.find((u) => u.email === email);

  if (!adminUser) {
    return res.status(401).send('Authentication failed');
  }

  if (adminUser.password !== password) {
    return res.status(401).send('Authentication failed');
  }

  const token = jwt.sign({ userId: adminUser.email }, config.jwtSecret, { expiresIn: '1h' });

  res.status(200).json({ token });
};

/**
 * Middleware to verify the admin user's token
 * @param {Object} req - Express request object with the token in the headers
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function to proceed to the next middleware
 */
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).send('Unauthorized');
    }
    req.user = decoded;
    next();
  });
};

// Seed the initial admin user
seedAdminUser();

module.exports = {
  login,
  verifyToken,
};
