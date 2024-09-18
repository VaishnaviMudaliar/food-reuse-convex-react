import cron from 'node-cron';
import { ConvexHttpClient } from 'convex/browser';
import axios from 'axios';

const client = new ConvexHttpClient(process.env.CONVEX_URL);

const sendEmail = async (emailData) => {
  try {
    const response = await axios.post('http://localhost:3000/send-email', emailData);
    console.log(response.data);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Schedule the function to run daily at 7 PM
cron.schedule('0 19 * * *', async () => {
  console.log('Running scheduled task at 7 PM...');
  try {
    // eslint-disable-next-line no-undef
    const expiringItems = await client.mutation(checkNearingExpiryItems, { userId: 'your-user-id' });

    for (const item of expiringItems) {
      const emailData = {
        email: item.email,
        itemName: item.item_name,
        expirationDate: item.expiration_date,
      };
      await sendEmail(emailData);
    }

    console.log('Expiry notifications sent successfully.');
  } catch (error) {
    console.error('Error sending expiry notifications:', error);
  }
});
