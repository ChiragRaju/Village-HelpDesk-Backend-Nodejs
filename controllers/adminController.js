const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const Admin = require('../models/adminModel');
const config = require('../config/config');

const dbPath = path.join(__dirname, '../data', 'adminUsers.json');

const seedAdminUser = () => {
  const adminUser = new Admin({
    email:"",
    password :""
  });

  const adminUserExists = fs.existsSync(dbPath);

  if (!adminUserExists) {
    const adminUsers = [adminUser];
    fs.writeFileSync(dbPath, JSON.stringify(adminUsers, null, 2));
  }
};

const login = (req, res) => {
  const { email, password } = req.body;
  const adminUsers = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  console.log("Email:", email);
  console.log("Password:", password);

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

seedAdminUser();

module.exports = {
  login,
  verifyToken,
};
