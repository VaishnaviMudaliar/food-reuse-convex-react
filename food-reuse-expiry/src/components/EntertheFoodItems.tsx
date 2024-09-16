import React, { useState } from "react";
import { useMutation } from "convex/react"; // Import the useMutation hook from Convex
import { api } from "../../convex/_generated/api";

interface FoodEntryFormProps {
  userId: string;
}

const FoodEntryForm: React.FC<FoodEntryFormProps> = ({ userId }) => {
  // State to store each form field
  const [item_name, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1); // Default quantity to 1
  const [expiration_date, setExpirationDate] = useState("");
  const [date_logged, setDateLogged] = useState("");
  const [itemId, setItemId] = useState(""); // For updating/removing specific items
  const [errorMessage, setErrorMessage] = useState(""); // To handle errors

  // Step 1: Use the mutation hooks to reference the insert, update, and delete mutations
  const insertFoodItem = useMutation(api.mutations.insertFoodItem);
  const updateFoodItem = useMutation(api.mutations.updateFoodItem); 
  const removeFoodItem = useMutation(api.mutations.removeFoodItem);

  // Function to handle form submission (Insert)
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form from causing a page reload

    try {
      // Step 2: Call the insertFoodItem mutation with form data
      await insertFoodItem({
        userId,
        itemName: item_name,
        quantity,
        expirationDate: expiration_date,
        dateLogged: date_logged,
      });

      console.log("Food item inserted successfully!");
      // Optionally clear the form
      setItemName("");
      setQuantity(1);
      setExpirationDate("");
      setDateLogged("");
      setErrorMessage(""); // Clear error message if successful
    } catch (error) {
      console.error("Failed to insert food item:", error);
      setErrorMessage("Failed to insert food item. Please try again.");
    }
  };

  // Function to handle update (for updating an existing item)
  const handleUpdate = async () => {
    try {
      await updateFoodItem({
        itemId,
        userId,
        itemName: item_name,
        quantity,
        expirationDate: expiration_date,
        dateLogged: date_logged,
      });

      console.log("Food item updated successfully!");
      setErrorMessage("");
    } catch (error) {
      console.error("Failed to update food item:", error);
      setErrorMessage("Failed to update food item. Please try again.");
    }
  };

  // Function to handle removing an item
  const handleRemove = async () => {
    try {
      await removeFoodItem({ itemId }); // Pass the item ID to remove
      console.log("Food item removed successfully!");
      setErrorMessage("");
    } catch (error) {
      console.error("Failed to remove food item:", error);
      setErrorMessage("Failed to remove food item. Please try again.");
    }
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="item_name">Item Name:</label>
        <input
          type="text"
          id="item_name"
          value={item_name}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
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
          onChange={(e) => setExpirationDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="date_logged">Date Logged:</label>
        <input
          type="date"
          id="date_logged"
          value={date_logged}
          onChange={(e) => setDateLogged(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="item_id">Item ID (for update/remove):</label>
        <input
          type="text"
          id="item_id"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
        />
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button type="submit">Submit</button>

      {/* Add Update and Remove buttons */}
       {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <button type="button" onClick={handleUpdate} style={{ marginLeft: "10px" }}>
        Update
      </button>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <button type="button" onClick={handleRemove} style={{ marginLeft: "10px" }}>
        Remove
      </button>
    </form>
  );
};

export default FoodEntryForm;
