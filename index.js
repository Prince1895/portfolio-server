const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

app.use(cors());

app.use(express.json());

app.get('/send-email', (req, res) => {
  res.send("API is live. Use POST to send email.");
});

app.post('/send-email', async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ success: false, message: 'Email or message missing' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'princechauhanwork01@gmail.com',
        pass: 'nxlmngxwbtifpren', 
      },
    });

    await transporter.sendMail({
      from: email,
      to: 'princechauhanwork01@gmail.com',
      subject: `New Message through portfolio from ${email}`,
      text: message,
    });

    return res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Email sending failed' });
  }
});

module.exports = app;
