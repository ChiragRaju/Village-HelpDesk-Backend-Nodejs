// supervisorController.js

const Supervisor = require('../models/SupervisorModel');

const supervisorController = {
  getAllSupervisors: (req, res) => {
    const supervisors = Supervisor.getAll();
    res.json(supervisors);
  },

  getSupervisorById: (req, res) => {
    const { id } = req.params;
    const supervisor = Supervisor.getById(id);

    if (supervisor) {
      res.json(supervisor);
    } else {
      res.status(404).json({ message: 'Supervisor not found' });
    }
  },

  createSupervisor: (req, res) => {
    const supervisorData = req.body;
    const supervisor = new Supervisor(supervisorData);
    const newSupervisor = Supervisor.create(supervisor);
    res.status(201).json(newSupervisor);
  },

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
