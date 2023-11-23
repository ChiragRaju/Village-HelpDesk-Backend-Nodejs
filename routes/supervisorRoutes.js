const express = require('express');
const supervisorController = require('../controllers/supervisorController');

const router = express.Router();

/**
 * Route to get all supervisors.
 * @param {string} "/" - The endpoint URL to get all supervisors.
 * @param {function} supervisorController.getAllSupervisors - Controller function to handle the request.
 */
router.get('/', supervisorController.getAllSupervisors);

/**
 * Route to get a supervisor by ID.
 * @param {string} "/:id" - The endpoint URL to get a supervisor by ID.
 * @param {function} supervisorController.getSupervisorById - Controller function to handle the request.
 * @param {string} req.params.id - The ID of the supervisor to retrieve.
 */
router.get('/:id', supervisorController.getSupervisorById);

/**
 * Route to create a new supervisor.
 * @param {string} "/" - The endpoint URL to create a new supervisor.
 * @param {function} supervisorController.createSupervisor - Controller function to handle the request.
 */
router.post('/', supervisorController.createSupervisor);

/**
 * Route to update a supervisor by ID.
 * @param {string} "/:id" - The endpoint URL to update a supervisor by ID.
 * @param {function} supervisorController.updateSupervisor - Controller function to handle the request.
 * @param {string} req.params.id - The ID of the supervisor to update.
 */
router.put('/:id', supervisorController.updateSupervisor);

/**
 * Route to delete a supervisor by ID.
 * @param {string} "/:id" - The endpoint URL to delete a supervisor by ID.
 * @param {function} supervisorController.deleteSupervisor - Controller function to handle the request.
 * @param {string} req.params.id - The ID of the supervisor to delete.
 */
router.delete('/:id', supervisorController.deleteSupervisor);

module.exports = router;
