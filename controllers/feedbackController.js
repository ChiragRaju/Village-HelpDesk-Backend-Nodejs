// feedbackController.js

const Feedback = require('../models/feedbackModel'); // Make sure to have the correct path for the feedback model

const feedbackController = {
  /**
   * Submit feedback
   * @param {Object} req - Express request object with feedback data in the body
   * @param {Object} res - Express response object
   */
  submitFeedback: (req, res) => {
    const feedbackData = req.body;
    const userEmail = feedbackData.email; // Assuming the user's email is in the feedback data
    Feedback.create({ ...feedbackData, userEmail });
    res.status(201).json({ message: 'Feedback submitted successfully' });
  },

  /**
   * Get all feedback
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getFeedback: (req, res) => {
    const feedbackData = Feedback.getAll(); // Assuming there's a method in the feedback model to get all feedback
    res.json(feedbackData);
  },
};

module.exports = feedbackController;
