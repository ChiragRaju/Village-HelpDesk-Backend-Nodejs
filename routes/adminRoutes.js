const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

/**
 * Route to handle admin login.
 * @param {string} "/login" - The endpoint URL for admin login.
 * @param {function} adminController.login - Controller function for handling admin login logic.
 */
router.post('/login', adminController.login);

module.exports = router;
