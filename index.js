const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

// CORS Headers for Vercel Preflight Handling
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://portfolio-prince-kumar.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  next();
});

app.use(cors({
  origin: 'https://portfolio-prince-kumar.vercel.app',
  methods: ['POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

app.get('/api/send-email', (req, res) => {
  res.send("API is live. Use POST to send email.");
});

app.post('/api/send-email', async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ success: false, message: 'Email or message missing' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'princechauhanwork01@gmail.com',
        pass: 'nxlmngxwbtifpren', // App password, never push to GitHub
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
