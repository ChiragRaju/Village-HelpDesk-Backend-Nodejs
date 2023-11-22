// routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

router.post('/submit-feedback', feedbackController.submitFeedback);
router.get('/get-feedback', feedbackController.getFeedback);

module.exports = router;
