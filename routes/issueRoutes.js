const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const issueController = require('../controllers/issueController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});


// const imagePath = path.join(__dirname, 'uploads/1698403801041.jpg');
// console.log(imagePath);

const upload = multer({ storage });

router.post('/report-issue', upload.single('image'), issueController.reportIssue);
//get user by id
// router.get('/user/:userId', (req, res) => {
//   const { userId } = req.params;
//   const issues = issueController.getIssuesByUserId(userId);
//   res.json(issues);
// });
//get all users
router.get('/allissues', (req, res) => {
  const issues = issueController.getAllIssues();
  // issues.forEach((issue) => {
  //   issue.image = `/uploads/${issue.image}`;
  // });
  res.json(issues);
  
});

router.get('/check-issue-status/:userId', issueController.checkIssueStatus);
router.put('/update-issue-status/:userId/:issueId', issueController.updateIssueStatus);

module.exports = router;
