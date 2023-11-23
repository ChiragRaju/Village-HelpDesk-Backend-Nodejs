const fs = require('fs');
const path = require('path');
const feedbackDBFile = path.join(__dirname, '../data/feedback.json');

class Feedback {
  /**
   * Get all feedback entries from the data store
   * @returns {Array} - Array of feedback objects
   */
  static getAll() {
    if (!fs.existsSync(feedbackDBFile)) {
      // Return an empty array if the file doesn't exist
      return [];
    }

    let existingFeedback = JSON.parse(fs.readFileSync(feedbackDBFile));

    if (!Array.isArray(existingFeedback)) {
      // Ensure the data is an array; if not, return an empty array
      return [];
    }

    return existingFeedback;
  }

  /**
   * Create a new feedback entry and save it to the data store
   * @param {Object} feedbackData - Object containing feedback properties
   */
  static create(feedbackData) {
    // Get existing feedback entries
    const existingFeedback = Feedback.getAll();
    // Add the new feedback entry to the array
    existingFeedback.push(feedbackData);
    // Save the updated feedback entries back to the data store
    fs.writeFileSync(feedbackDBFile, JSON.stringify(existingFeedback, null, 2));
  }
}

module.exports = Feedback;
