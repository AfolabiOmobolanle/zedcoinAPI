import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';    
import ejs from 'ejs';
import path from 'path';

dotenv.config();

// Create the transporter for sending emails
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, 
  port: process.env.SMTP_PORT || (process.env.SMTP_HOST.includes('gmail') ? 465 : 2525),
  secure: process.env.SMTP_HOST.includes('gmail') && process.env.SMTP_PORT === '465',
  tls: {
    rejectUnauthorized: false, 
  },
  auth: {
    user: process.env.SMTP_USER, 
    pass: process.env.SMTP_PASS, 
  },
});

// Send email function
const sendMail = ({ from = process.env.FROM_EMAIL, to, subject, html }) => {
  return new Promise((resolve, reject) => {
    const mailOptions = { from, to, subject, html };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return reject(error);
      console.log("Message sent: %s", info.messageId);
      resolve(info);
    });
  });
};

const send_signup_email = ({ firstname, lastname, email, password }) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const templatePath = path.join(__dirname, "../../resources/signup.ejs"); 

  ejs.renderFile(
    templatePath,
    { firstname, lastname, email, password }, 
    (err, html_email) => {
      if (err) {
        console.error("Error rendering EJS template:", err);
        return; 
      }

      // Send the email to the admin with the user details
      sendMail({
        to: process.env.ADMIN_EMAIL, 
        subject: "New User Signup",
        html: html_email, 
      })
        .then((info) => {
          console.log("Email sent successfully:", info);
        })
        .catch((err) => {
          console.error("Failed to send email:", err);
        });
    }
  );
};

export { send_signup_email };
