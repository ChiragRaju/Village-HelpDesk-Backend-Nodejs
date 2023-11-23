const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

/**
 * Route to submit feedback.
 * @param {string} "/submit-feedback" - The endpoint URL to submit feedback.
 * @param {function} feedbackController.submitFeedback - Controller function to handle the request.
 * @param {Object} req.body - The request body containing feedback data.
 */
router.post('/submit-feedback', feedbackController.submitFeedback);

/**
 * Route to get all feedback.
 * @param {string} "/get-feedback" - The endpoint URL to get all feedback.
 * @param {function} feedbackController.getFeedback - Controller function to handle the request.
 */
router.get('/get-feedback', feedbackController.getFeedback);

module.exports = router;
