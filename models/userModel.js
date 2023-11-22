const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const dbPath = path.join(__dirname, "../data/users.json");
const { v4: uuidv4 } = require('uuid');
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: "chiragrajus2102@gmail.com",
//     pass: "cfntzqatbcxgfffn",
//   },
// });

class User 
{
  constructor({firstName, lastName,email, phoneNumber, password, state,city, pincode  }) {
 
    this.id=uuidv4();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = this.hashPassword(password);
  
    this.state = state;
    this.city = city;
    this.pincode = pincode;
    this.resetPasswordOTP = '';
   
    
  } 
  
  hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }
  
 


  static getUsers() {
    try {
      const data = fs.readFileSync(dbPath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }
  
  

  


  static saveUsers(users) {
    fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
  }

  static createUser(firstName, lastName,email,phoneNumber, password,state, city, pincode ,resetPasswordOTP ) {
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

  static findUserByEmail(email) {
    const users = this.getUsers();
    return users.find((user) => user.email === email);
  }
  static getAllUsers() {
    return this.getUsers();
  }
  
  

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
