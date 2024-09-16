import React, { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api'; // Adjust path as needed

const TrackExpiry: React.FC = () => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [expirationDate, setExpirationDate] = useState('');
  const [loggedDate, setLoggedDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date

  const insertFoodItem = useMutation(api.mutations.insertFoodItem);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!itemName || quantity === '' || !expirationDate) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await insertFoodItem({
        userId: 'YOUR_USER_ID', // Replace with actual user ID
        itemName,
        quantity,
        expirationDate,
        dateLogged: loggedDate,
      });

      // Notify user about the expiry
      // You'll need to implement the notification logic in Convex
      // e.g., trigger a server-side function to send an email

      alert('Item added successfully!');
    } catch (error) {
      console.error('Failed to add item:', error);
      alert('Failed to add item.');
    }

    // Clear form after submission
    setItemName('');
    setQuantity('');
    setExpirationDate('');
    setLoggedDate(new Date().toISOString().split('T')[0]);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit} className="track-expiry-form">
      <div>
        <label htmlFor="item-name">Item Name:</label>
        <input
          type="text"
          id="item-name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="quantity">Quantity (gms):</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          required
        />
      </div>
      <div>
        <label htmlFor="expiration-date">Expiration Date:</label>
        <input
          type="date"
          id="expiration-date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="logged-date">Date Logged:</label>
        <input
          type="date"
          id="logged-date"
          value={loggedDate}
          readOnly
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TrackExpiry;
