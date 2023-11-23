const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const dbPath = path.join(__dirname, '../data/Issues.json');

class Issue {
  /**
   * Constructor for the Issue class
   * @param {Object} param0 - Object containing issue properties
   */
  constructor({ userId, description, image, latitude, longitude, city, state, suburb, display_name, postcode, status }) {
    this.id = uuidv4();
    this.userId = userId;
    this.description = description;
    this.image = image;
    this.latitude = latitude;
    this.longitude = longitude;
    this.city = city;
    this.state = state;
    this.suburb = suburb;
    this.display_name = display_name;
    this.postcode = postcode;
    this.status = status || 'pending';
    this.createdDate = new Date().toDateString();
    this.closedDate = null;
  }

  /**
   * Update the status of the issue
   * @param {string} newStatus - New status for the issue
   */
  updateStatus(newStatus) {
    this.status = newStatus;
    if (newStatus === 'resolved' && !this.closedDate) {
      this.closedDate = new Date().toDateString();
    }
  }

  /**
   * Get all issues from the data store
   * @returns {Array} - Array of issue objects
   */
  static getAllIssues() {
    try {
      const data = fs.readFileSync(dbPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  /**
   * Save the current issue to the data store
   * @returns {Object} - The saved issue object
   */
  save() {
    const issues = Issue.getAllIssues();
    issues.push(this);
    fs.writeFileSync(dbPath, JSON.stringify(issues, null, 2));
    return this;
  }
}

module.exports = Issue;
