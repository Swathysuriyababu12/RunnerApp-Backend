const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "awsuriya@gmail.com",
    pass: process.env.Email_Pass,
  },
});

function sendMail(toEmail, subject, content) {
  const mailOptions = {
    from: "awsuriya@gmail.com",
    to: toEmail,
    subject: subject,
    html: content,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error occurred:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

module.exports = { sendMail };