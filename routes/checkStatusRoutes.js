// routes/statusRoutes.js
const express = require('express');
const router = express.Router();
const { checkStatus, updateStatus } = require('../controllers/checkStatusController');

router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  const status = checkStatus(userId);
  res.json({ status });
});

router.post('/:userId', (req, res) => {
  const userId = req.params.userId;
  const newStatus = req.body.status;
  const result = updateStatus(userId, newStatus);
  res.json({ result });
});

module.exports = router;
