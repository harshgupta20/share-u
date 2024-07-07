const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587, // Use 587 for Outlook
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.OUTLOOK_EMAIL, // Your Outlook email
    pass: process.env.OUTLOOK_PASSWORD // Your Outlook password
  }
});

async function sendEmail(to, subject, html="", text="") {
    try {
      const mailOptions = {
        from: `Share Pro <${process.env.OUTLOOK_EMAIL}>`, // Your Outlook email
        to: to, // Recipient
        subject: subject, // Subject of the email
        html: html // HTML content of the email
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  module.exports = sendEmail;