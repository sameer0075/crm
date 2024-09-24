import axios from 'axios';

const sendEmailWithBrevo = async (emailData) => {
  const API_KEY = process.env.BREVO_API_KEY; // Store your API key in an environment variable
  const url = 'https://api.brevo.com/v3/smtp/email';
  try {
    const response = await axios.post(url, emailData, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Handle the error appropriately
  }
};

export { sendEmailWithBrevo };
