// locationController.js
const axios = require("axios");
const LocationModel = require("../models/locationModel");
const nodemailer = require("nodemailer");

class LocationController {
  /**
   * Sends notifications to users based on their location and nearby issues.
   * @param {Object} userLocation - The location data of the user containing latitude and longitude.
   */
  static async sendNotifications(userLocation) {
    try {
      // Fetch issues from the API endpoint
      const issuesResponse = await axios.get(
        "http://localhost:8000/api/issues/allissues"
      );
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
        console.log("No issues within 1km radius");
        // Return a response indicating no issues were found
        return { success: true, message: "No issues within 1km radius" };
      }

      const emailAddresses = filteredLocations
        .map((issue) => issue.userId)
        .join(",");
        

      // Include issueId and description in the email message
      const message = `The following issue has been resolved. Please kindly give feedback.\nIssue ID: ${filteredLocations[0].id}, Description: ${filteredLocations[0].description}, Display Name: ${filteredLocations[0].display_name}`;

      // Send a single email to all filtered locations
      await sendEmail(emailAddresses, "Location Notifications", message);
      console.log("Notifications sent successfully");
    } catch (error) {
      console.error("Error sending notifications:", error);
    }
  }
}

/**
 * Calculates the distance between two sets of latitude and longitude coordinates.
 * @param {number} lat1 - Latitude of the first location.
 * @param {number} lon1 - Longitude of the first location.
 * @param {number} lat2 - Latitude of the second location.
 * @param {number} lon2 - Longitude of the second location.
 * @returns {number} - The distance between the two locations in kilometers.
 */

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  console.log(`Distance between the two points: ${distance.toFixed(2)} km`);
  return distance;
 
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}



/**
 * Sends an email notification to specified recipients.
 * @param {string} to - Comma-separated email addresses of the recipients.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The HTML content of the email.
 * @returns {Promise<void>} - A promise indicating the success or failure of the email sending.
 */
async function sendEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    service: "chiragrajus2102@gmail.com",
    auth: {
      user: "chiragrajus2102@gmail.com",
      pass: "cfntzqatbcxgfffn",
    },
  });

  const mailOptions = {
    from: "chiragrajus2102@gmail.com",
    to, // Join the array of recipients with commas
    subject: "Issue as Been Resolved Of Your Issue",
    html: text, // Use html to render line breaks
  };

  return transporter.sendMail(mailOptions);
}

module.exports = LocationController;
