import formData from 'form-data'
import Mailgun from 'mailgun.js'
const mailgun = new Mailgun(formData)
const apiKey = process.env.MAILGUN_API_KEY;

if (!apiKey) {
  throw new Error('Mailgun API key is not defined. Please set MAILGUN_API_KEY in your environment variables.');
}

const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY as string});


export default mg;