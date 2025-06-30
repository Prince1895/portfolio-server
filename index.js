const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

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
        pass: 'nxlmngxwbtifpren',          
      },
    });

    await transporter.sendMail({
      from: email,
      to: 'princechauhanwork01@gmail.com',
      subject: `New Message through portfoilio from ${email}`,
      text: message,
    });

    return res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Email sending failed' });
  }
});
router.get("/leetcode/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch LeetCode stats" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
