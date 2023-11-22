// models/feedback.js
const fs = require('fs');
const path = require('path');
const feedbackDBFile = path.join(__dirname, '../data/feedback.json');

class Feedback {
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

  static create(feedbackData) {
    const existingFeedback = Feedback.getAll();
    existingFeedback.push(feedbackData);
    fs.writeFileSync(feedbackDBFile, JSON.stringify(existingFeedback, null, 2));
  }
}

module.exports = Feedback;
