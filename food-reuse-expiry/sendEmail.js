import axios from 'axios';

const sendEmail = async (emailData) => {
  try {
    const response = await axios.post('http://localhost:3000/send-email', emailData);
    console.log(response.data);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
