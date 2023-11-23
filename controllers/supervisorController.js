// supervisorController.js

const Supervisor = require('../models/SupervisorModel');

const supervisorController = {
  /**
   * Get all supervisors
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getAllSupervisors: (req, res) => {
    const supervisors = Supervisor.getAll();
    res.json(supervisors);
  },

  /**
   * Get a supervisor by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getSupervisorById: (req, res) => {
    const { id } = req.params;
    const supervisor = Supervisor.getById(id);

    if (supervisor) {
      res.json(supervisor);
    } else {
      res.status(404).json({ message: 'Supervisor not found' });
    }
  },

  /**
   * Create a new supervisor
   * @param {Object} req - Express request object with supervisor data in the body
   * @param {Object} res - Express response object
   */
  createSupervisor: (req, res) => {
    const supervisorData = req.body;
    const supervisor = new Supervisor(supervisorData);
    const newSupervisor = Supervisor.create(supervisor);
    res.status(201).json(newSupervisor);
  },

  /**
   * Update an existing supervisor
   * @param {Object} req - Express request object with supervisor ID in the params and updated data in the body
   * @param {Object} res - Express response object
   */
  updateSupervisor: (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedSupervisor = Supervisor.update(id, updatedData);

    if (updatedSupervisor) {
      res.json(updatedSupervisor);
    } else {
      res.status(404).json({ message: 'Supervisor not found' });
    }
  },

  /**
   * Delete a supervisor by ID
   * @param {Object} req - Express request object with supervisor ID in the params
   * @param {Object} res - Express response object
   */
  deleteSupervisor: (req, res) => {
    const { id } = req.params;
    const success = Supervisor.delete(id);

    if (success) {
      res.json({ message: 'Supervisor deleted successfully' });
    } else {
      res.status(404).json({ message: 'Supervisor not found' });
    }
  },
};

module.exports = supervisorController;
