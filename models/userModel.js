const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const dbPath = path.join(__dirname, "../data/users.json");
const { v4: uuidv4 } = require('uuid');

class User {
  /**
   * Constructor for the User class
   * @param {Object} param0 - Object containing user properties
   */
  constructor({ firstName, lastName, email, phoneNumber, password, state, city, pincode, resetPasswordOTP }) {
    this.id = uuidv4();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = this.hashPassword(password);
    this.state = state;
    this.city = city;
    this.pincode = pincode;
    this.resetPasswordOTP = resetPasswordOTP || '';
  }

  /**
   * Hash the user's password using bcrypt
   * @param {string} password - The user's plain-text password
   * @returns {string} - The hashed password
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  /**
   * Get all users from the data store
   * @returns {Array} - Array of user objects
   */
  static getUsers() {
    try {
      const data = fs.readFileSync(dbPath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  /**
   * Save users to the data store
   * @param {Array} users - Array of user objects
   */
  static saveUsers(users) {
    fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
  }

  /**
   * Create a new user and save it to the data store
   * @param {string} firstName - User's first name
   * @param {string} lastName - User's last name
   * @param {string} email - User's email address
   * @param {string} phoneNumber - User's phone number
   * @param {string} password - User's plain-text password
   * @param {string} state - User's state
   * @param {string} city - User's city
   * @param {string} pincode - User's pincode
   * @param {string} resetPasswordOTP - User's reset password OTP
   * @returns {Object} - The newly created user object
   */
  static createUser(firstName, lastName, email, phoneNumber, password, state, city, pincode, resetPasswordOTP) {
    const users = this.getUsers();
    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      state,
      city,
      pincode,
      resetPasswordOTP
    });
    users.push(newUser);
    this.saveUsers(users);
    return newUser;
  }

  /**
   * Find a user by email
   * @param {string} email - User's email address
   * @returns {Object} - The user object if found, otherwise null
   */
  static findUserByEmail(email) {
    const users = this.getUsers();
    return users.find((user) => user.email === email);
  }

  /**
   * Get all users from the data store
   * @returns {Array} - Array of user objects
   */
  static getAllUsers() {
    return this.getUsers();
  }

  /**
   * Update a user in the data store
   * @param {Object} user - The updated user object
   */
  static updateUser(user) {
    try {
      const userData = fs.readFileSync(usersDBPath, 'utf8');
      const users = JSON.parse(userData);
      users[user.email] = user;
      fs.writeFileSync(usersDBPath, JSON.stringify(users, null, 2));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }
}

module.exports = User;
