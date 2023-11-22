const Issue = require('../models/Issue');

function reportIssue(req, res) {
  
  const { userId, description,latitude, longitude,city,state,suburb,display_name,postcode} = req.body;
  const image = req.file ? req.file.filename : null;
  

  if ( !description) {
    return res.status(400).json({ error: 'User ID and description are required.' });
  }

  const newIssue = new Issue({ userId, description, image, latitude, longitude,city,state,suburb,display_name,postcode });
  const savedIssue = newIssue.save();

  res.status(201).json({ message: 'Issue reported successfully', issue: savedIssue });
}

// function getIssuesByUserId(userId) {
//   const issues = Issue.findByUserId(userId);
//   return issues;
// }
function getAllIssues() {
  const issues = Issue.getAllIssues(); // Implement this method in your Issue model
  return issues;
}

function checkIssueStatus(req, res) {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required.' });
  }

  const userIssues = Issue.getAllIssues().filter((issue) => issue.userId === userId);

  if (userIssues.length === 0) {
    return res.status(404).json({ error: 'No issues found for the user.' });
  }

 

  const response = {
    userIssues: userIssues.map((issue) => ({
      issueId: issue.id,
      description: issue.description,
      createdDate: issue.createdDate,
      closedDate: issue.closedDate,
      status: issue.status,
    })),
  };

  res.json(response);
}
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/Issues.json');

function updateIssueStatus(req, res) {
  const { userId, issueId } = req.params;
  const { newStatus } = req.body;

  if (!userId || !issueId || !newStatus) {
    return res.status(400).json({ error: 'User ID, issue ID, and new status are required.' });
  }

  const issues = Issue.getAllIssues();
  const userIssues = issues.filter((issue) => issue.userId === userId && issue.id === issueId);

  if (userIssues.length === 0) {
    return res.status(404).json({ error: 'No matching issue found for the user and issue ID.' });
  }

  // Update status for all matching issues
  userIssues.forEach((issue) => {
    issue.status = newStatus;
  });

  // Save the updated issues back to the data store
  fs.writeFileSync(dbPath, JSON.stringify(issues, null, 2));

  res.json({ message: 'Status updated successfully', updatedIssues: userIssues });
}


module.exports = { reportIssue,getAllIssues,checkIssueStatus,updateIssueStatus};
