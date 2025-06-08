const nodemailer = require('nodemailer');

const mailService = {
  async sendEmail({ emailFrom, emailTo, emailSubject, emailText }) {
    const transporter = nodemailer.createTransport({
      // host: process.env.SMTP_HOST,
      // port: process.env.SMTP_PORT,
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        // user: process.env.SMTP_USER,
        // pass: process.env.SMTP_PASS,
        user: 'your email',
        pass: 'zjsh grty mntd otax',
      },
    });
    await transporter.sendMail({
      from: emailFrom,
      to: emailTo,
      subject: emailSubject,
      text: emailText,
    });
  },
};

Object.freeze(mailService);

module.exports = {
  mailService,
};