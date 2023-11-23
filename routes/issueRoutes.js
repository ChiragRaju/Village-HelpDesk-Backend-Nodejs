const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const issueController = require('../controllers/issueController');

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/**
 * Route to report an issue with an optional image upload.
 * @param {string} '/report-issue' - The endpoint URL for reporting an issue.
 * @param {function} upload.single('image') - Middleware to handle single file uploads (image).
 * @param {function} issueController.reportIssue - Controller function for handling the report issue logic.
 */
router.post('/report-issue', upload.single('image'), issueController.reportIssue);

/**
 * Route to get all reported issues.
 * @param {string} '/allissues' - The endpoint URL for getting all reported issues.
 * @param {function} (req, res) - Express request and response objects.
 */
router.get('/allissues', (req, res) => {
  const issues = issueController.getAllIssues();
  res.json(issues);
});

/**
 * Route to check the status of all issues for a specific user.
 * @param {string} '/check-issue-status/:userId' - The endpoint URL for checking issue status for a user.
 * @param {function} issueController.checkIssueStatus - Controller function for checking issue status.
 */
router.get('/check-issue-status/:userId', issueController.checkIssueStatus);

/**
 * Route to update the status of a specific issue for a user.
 * @param {string} '/update-issue-status/:userId/:issueId' - The endpoint URL for updating issue status.
 * @param {function} issueController.updateIssueStatus - Controller function for updating issue status.
 */
router.put('/update-issue-status/:userId/:issueId', issueController.updateIssueStatus);

module.exports = router;
