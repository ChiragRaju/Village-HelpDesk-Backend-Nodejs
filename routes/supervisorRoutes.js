// supervisorRoutes.js

const express = require('express');
const supervisorController = require('../controllers/supervisorController');

const router = express.Router();

router.get('/', supervisorController.getAllSupervisors);
router.get('/:id', supervisorController.getSupervisorById);
router.post('/', supervisorController.createSupervisor);
router.put('/:id', supervisorController.updateSupervisor);
router.delete('/:id', supervisorController.deleteSupervisor);

module.exports = router;
