import React, { useState } from 'react';

const FoodEntryForm = () => {
  // State to store each form field
  const [item_name, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1); // default quantity to 1
  const [expiration_date, setExpirationDate] = useState('');
  const [date_logged, setDateLogged] = useState('');

  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form from causing a page reload

    // Here you would usually send this data to a server
    console.log({ item_name, quantity, expiration_date, date_logged });

    // Optionally clear the form
    setItemName('');
    setQuantity(1);
    setExpirationDate('');
    setDateLogged('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="item_name">Item Name:</label>
        <input
          type="text"
          id="item_name"
          value={item_name}
          onChange={e => setItemName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={e => setQuantity(parseInt(e.target.value, 10))}
          min="1"
          required
        />
      </div>
      <div>
        <label htmlFor="expiration_date">Expiration Date:</label>
        <input
          type="date"
          id="expiration_date"
          value={expiration_date}
          onChange={e => setExpirationDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="date_logged">Date Logged:</label>
        <input
          type="date"
          id="date_logged"
          value={date_logged}
          onChange={e => setDateLogged(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FoodEntryForm;
