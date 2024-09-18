import express, { json } from 'express';
import { createTransport } from 'nodemailer';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config(); // For environment variables

const app = express();
app.use(json());

// Create a Nodemailer transporter
const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Route to send emails
app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;
  
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    res.status(200).send('Email sent successfully.');
  } catch (error) {
    res.status(500).send('Error sending email.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
