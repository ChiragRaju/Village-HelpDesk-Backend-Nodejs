// controllers/feedbackController.js
const Feedback = require('../models/feedbackModel');

const feedbackController = {
  submitFeedback: (req, res) => {
    const feedbackData = req.body;
    const userEmail = feedbackData.email; 
    Feedback.create({ ...feedbackData, userEmail });
    res.status(201).json({ message: 'Feedback submitted successfully' });
  },

  getFeedback: (req, res) => {
    const feedbackData = Feedback.getAll();
    res.json(feedbackData);
  },
};

module.exports = feedbackController;
