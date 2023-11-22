// Supervisor.js (Model)

const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/supervisors.json');

class Supervisor {
  constructor({ name,email, phone, address, role }) {
    this.id = new Date().getTime().toString();
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.role = role;
  }

  static getAll() {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
  }

  static getById(id) {
    const supervisors = Supervisor.getAll();
    return supervisors.find(supervisor => supervisor.id === id);
  }

  static create(supervisor) {
    const supervisors = Supervisor.getAll();
    supervisors.push(supervisor);
    fs.writeFileSync(dataFilePath, JSON.stringify(supervisors, null, 2));
    return supervisor;
  }

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

  static delete(id) {
    const supervisors = Supervisor.getAll();
    const filteredSupervisors = supervisors.filter(supervisor => supervisor.id !== id);
    fs.writeFileSync(dataFilePath, JSON.stringify(filteredSupervisors, null, 2));
    return true;
  }
}

module.exports = Supervisor;
