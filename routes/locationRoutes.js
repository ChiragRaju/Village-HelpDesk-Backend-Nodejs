// locationRoutes.js
const express = require('express');
const LocationController = require('../controllers/locationController');

const router = express.Router();

router.get('/sendNotifications', async (req, res) => {
  try {
    // User location
    const userLocation = {
      latitude: parseFloat(req.query.latitude),
      longitude: parseFloat(req.query.longitude),
    };

    await LocationController.sendNotifications(userLocation);
    res.send('Notifications sent successfully');
  } catch (error) {
    console.error('Error sending notifications:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
