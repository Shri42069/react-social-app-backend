const nodemailer = require('nodemailer');

let otpStore = {}; // In-memory store

exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  otpStore[email] = { otp, expires: Date.now() + 300000 }; // 5 min expiry

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Social App" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}`,
  });

  res.json({ success: true, message: 'OTP sent' });
};

exports.verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore[email];

  if (!record || record.otp !== otp || record.expires < Date.now()) {
    return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
  }

  // Clean up and simulate user creation
  delete otpStore[email];
  res.json({ success: true, user: { email } });
};
