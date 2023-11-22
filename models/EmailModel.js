// EmailModel.js
const nodemailer = require('nodemailer');

class EmailModel {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service:'chiragrajus2102@gmail.com', 
      auth: {
        user: "chiragrajus2102@gmail.com",
        pass: "vqkbefneznwcynlw",
      }
    });
  }

  sendEmail(recipients, subject, message, callback) {
    const mailOptions = {
      from: 'chiragrajus2102@gmail.com',
      to: recipients.join(', '), // Join the array of recipients with commas
      subject,
      text:message
    };

    this.transporter.sendMail(mailOptions, callback);
  }
}

module.exports = EmailModel;
