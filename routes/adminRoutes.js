const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.post('/login', adminController.login);

// router.get('/admin/dashboard', adminController.verifyToken, (req, res) => {
//   res.send('Admin dashboard');
// });

module.exports = router;
