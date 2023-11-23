const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/issues.json');

class LocationModel {
  /**
   * Get all locations from the data store.
   * @returns {Array} - Array of locations.
   */
  static getLocations() {
    try {
      const data = fs.readFileSync(dbPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading locations data:', error);
      return [];
    }
  }

  /**
   * Save a notification to the data store.
   * @param {Object} location - The location data containing details for sending a notification.
   */
  static saveNotification(location) {
    try {
      // Implement the logic to save notifications to the data store (file or database)
      console.log('Notification saved for:', location.email);
    } catch (error) {
      console.error('Error saving notification:', error);
    }
  }
}

module.exports = LocationModel;
