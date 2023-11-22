// locationController.js
const axios = require('axios');
const LocationModel = require('../models/locationModel');
const nodemailer = require('nodemailer');

class LocationController {
  static async sendNotifications(userLocation) {
    try {
      // Fetch issues from the API endpoint
      const issuesResponse = await axios.get('http://localhost:8000/api/issues/allissues');
      const issues = issuesResponse.data;

      const filteredLocations = issues.filter((issue) => {
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          issue.latitude,
          issue.longitude
        );

        // Assuming 1km radius
        return distance <= 1;
      });

      if (filteredLocations.length === 0) {
        console.log('No issues within 1km radius');
        return;
      }

      const emailAddresses = filteredLocations.map((issue) => issue.userId).join(',');

      // Include issueId and description in the email message
      const message = filteredLocations
        .map((issue) => `Issue ID: ${issue.id}, Description: ${issue.description}, Description: ${issue.display_name}`)
        .join('<br>');

      // Send a single email to all filtered locations
      await sendEmail(emailAddresses, 'Location Notifications', message);
      console.log('Notifications sent successfully');
    } catch (error) {
      console.error('Error sending notifications:', error);
    }
  }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

async function sendEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    service: 'chiragrajus2102@gmail.com',
    auth: {
      user: 'chiragrajus2102@gmail.com',
      pass: 'cfntzqatbcxgfffn',
    },
  });

  const mailOptions = {
    from: 'chiragrajus2102@gmail.com',
    to, // Join the array of recipients with commas
    subject: 'Issue as Been Resolved Of Your Issue',
    html: text, // Use html to render line breaks
  };

  return transporter.sendMail(mailOptions);
}

module.exports = LocationController;
