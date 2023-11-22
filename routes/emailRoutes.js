// emailRoutes.js
const express = require('express');
const EmailController = require('../controllers/EmailController');

const router = express.Router();
const emailController = new EmailController();

router.post('/send-email', emailController.sendEmail);

module.exports = router;
