const express = require('express');
const LocationController = require('../controllers/locationController');

const router = express.Router();

/**
 * Route to send notifications based on user location.
 * @param {string} "/sendNotifications" - The endpoint URL for sending notifications.
 * @param {function} LocationController.sendNotifications - Controller function for sending notifications.
 * @param {object} req.query.latitude - The latitude of the user's location.
 * @param {object} req.query.longitude - The longitude of the user's location.
 * @returns {string} - Response indicating the status of notification sending.
 */
router.get('/sendNotifications', async (req, res) => {
  try {
    // User location
    const userLocation = {
      latitude: parseFloat(req.query.latitude),
      longitude: parseFloat(req.query.longitude),
    };

    // Call the controller function to send notifications
    await LocationController.sendNotifications(userLocation);
    res.send('Notifications sent successfully');
  } catch (error) {
    console.error('Error sending notifications:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
