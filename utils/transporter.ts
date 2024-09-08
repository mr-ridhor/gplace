import { createTransport, Transporter } from 'nodemailer';

const ADMIN_MAIL = process.env.ADMIN_MAIL as string;
const MAIL_HOST = process.env.MAIL_HOST as string;
const MAIL_PASS = process.env.MAIL_PASS as string;

// Create a transporter using Gmail
const transporter: Transporter = createTransport({
  host: MAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: ADMIN_MAIL,
    pass: MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  debug: true,
});

// Verify connection configuration
const verifyTransporter = async (): Promise<void> => {
  try {
    await transporter.verify();
    console.log('Nodemailer is Ready');
  } catch (error) {
    console.error('Nodemailer connection error:', error);
  }
};

verifyTransporter();

export default transporter;
