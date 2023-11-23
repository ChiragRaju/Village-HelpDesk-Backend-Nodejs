/**
 * Class representing an Admin user
 */
class Admin {
  /**
   * Constructor for the Admin class
   * @param {Object} param0 - Object containing admin properties
   */
  constructor({ email, password }) {
    this.email = email;
    this.password = password;
  }
}

module.exports = Admin;
