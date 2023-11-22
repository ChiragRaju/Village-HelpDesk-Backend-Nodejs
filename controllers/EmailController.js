const EmailModel = require('../models/EmailModel');

const emailModel = new EmailModel();

class EmailController {
  sendEmail(req, res) {
    const { recipients, subject, message } = req.body;
    
    emailModel.sendEmail(recipients, subject, message, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send email' });
      } else {
        console.log('Email sent:', info.response);
        res.json({ message: 'Email sent successfully' });
      }
    });
  }
}

module.exports = EmailController;