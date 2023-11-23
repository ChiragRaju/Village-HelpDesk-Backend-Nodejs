const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/supervisors.json');

class Supervisor {
  /**
   * Constructor for the Supervisor class
   * @param {Object} param0 - Object containing supervisor properties
   */
  constructor({ name, email, phone, address, role }) {
    this.id = new Date().getTime().toString();
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.role = role;
  }

  /**
   * Get all supervisors from the data store
   * @returns {Array} - Array of supervisor objects
   */
  static getAll() {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
  }

  /**
   * Get a supervisor by ID
   * @param {string} id - ID of the supervisor to retrieve
   * @returns {Object|null} - Supervisor object or null if not found
   */
  static getById(id) {
    const supervisors = Supervisor.getAll();
    return supervisors.find(supervisor => supervisor.id === id);
  }

  /**
   * Create a new supervisor and save it to the data store
   * @param {Object} supervisor - Supervisor object to create
   * @returns {Object} - The newly created supervisor object
   */
  static create(supervisor) {
    const supervisors = Supervisor.getAll();
    supervisors.push(supervisor);
    fs.writeFileSync(dataFilePath, JSON.stringify(supervisors, null, 2));
    return supervisor;
  }

  /**
   * Update a supervisor by ID with new data
   * @param {string} id - ID of the supervisor to update
   * @param {Object} updatedData - New data to update the supervisor
   * @returns {Object|null} - Updated supervisor object or null if not found
   */
  static update(id, updatedData) {
    const supervisors = Supervisor.getAll();
    const index = supervisors.findIndex(supervisor => supervisor.id === id);

    if (index !== -1) {
      supervisors[index] = { ...supervisors[index], ...updatedData };
      fs.writeFileSync(dataFilePath, JSON.stringify(supervisors, null, 2));
      return supervisors[index];
    }

    return null;
  }

  /**
   * Delete a supervisor by ID
   * @param {string} id - ID of the supervisor to delete
   * @returns {boolean} - True if deleted successfully, false otherwise
   */
  static delete(id) {
    const supervisors = Supervisor.getAll();
    const filteredSupervisors = supervisors.filter(supervisor => supervisor.id !== id);
    fs.writeFileSync(dataFilePath, JSON.stringify(filteredSupervisors, null, 2));
    return true;
  }
}

module.exports = Supervisor;
