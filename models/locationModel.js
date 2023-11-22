// locationModel.js
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/issues.json');

class LocationModel {
  static getLocations() {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  }

  static saveNotification(location) {
    // You can implement the logic to save notifications to a database or file
    console.log('Notification sent to:', location.email);
  }
}

module.exports = LocationModel;
