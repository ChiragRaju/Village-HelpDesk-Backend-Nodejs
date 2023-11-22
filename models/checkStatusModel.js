const fs = require('fs');
const path = require('path');
const statusFilePath = path.join(__dirname, '../data/Issues.json');

function getStatusData() {
  const data = fs.readFileSync(statusFilePath, 'utf-8');
  return JSON.parse(data);
}

function saveStatusData(data) {
  fs.writeFileSync(statusFilePath, JSON.stringify(data, null, 2));
}

module.exports = {
  getStatusData,
  saveStatusData,
};
