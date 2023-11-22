const { getStatusData, saveStatusData } = require('../models/checkStatusModel');

function checkStatus(userId) {
  const statusData = getStatusData();
  const userStatus = statusData.find((user) => user.id === userId);
  return userStatus ? userStatus.status : 'User not found';
}

function updateStatus(userId, newStatus) {
  const statusData = getStatusData();
  const userStatusIndex = statusData.findIndex((user) => user.id === userId);
  if (userStatusIndex !== -1) {
    statusData[userStatusIndex].status = newStatus;
    saveStatusData(statusData);
    return 'Status updated successfully';
  } else {
    return 'User not found';
  }
}

module.exports = {
  checkStatus,
  updateStatus,
};
