// src/utils/emailService.js
import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_pb7q2z4';
const PUBLIC_KEY = 'noDkL4DF_lhGuhl_6';

// Generic reusable sender
const sendEmail = async (templateId, data) => {
  try {
    const response = await emailjs.send(
      SERVICE_ID,
      templateId,
      data,
      PUBLIC_KEY
    );
    console.log('Email sent:', response.status);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};

// 👇 Updated this function to use your real welcome template
export const sendSignupEmail = (user) => {
    console.log(user);
    
  return sendEmail('template_zk404hh', {
    user_name: user.username,
    email: user.email,
    year: new Date().getFullYear(),
  });
};

export const sendDepositEmail = (user, amount) => {
  return sendEmail('template_cp8hrmr', {
    user_name: user.name,
    email: user.email,
    amount,
    date: new Date().toLocaleString(),
  });
};

export const sendWithdrawalEmail = (user, amount) => {
  return sendEmail('template_withdrawal', {
    user_name: user.name,
    email: user.email,
    amount,
    date: new Date().toLocaleString(),
  });
};
