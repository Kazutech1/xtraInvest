import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USEREMAIL,
    pass: process.env.EMAILPASSWORD,
  },
});

/**
 * Send an email with the given options
 * @param {Object} options - { to, subject, html, text }
 */
export const sendEmail = async ({ to, subject, html, text }) => {
  const mailOptions = {
    from: {
      name: 'XtraInvest',
      address: process.env.USEREMAIL,
    },
    to,
    subject,
    html,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent to:", to);
  } catch (error) {
    console.error("Failed to send email ❌", error);
  }
};
