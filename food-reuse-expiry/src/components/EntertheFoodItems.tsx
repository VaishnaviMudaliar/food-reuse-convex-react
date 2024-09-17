import React, { useState, useEffect } from "react";
import { useMutation } from "convex/react"; // Import the useMutation hook from Convex
import { api } from "../../convex/_generated/api";
import "./EntertheFoodItems.css";

interface FoodEntryFormProps {
  userId: string;
}

const FoodEntryForm: React.FC<FoodEntryFormProps> = ({ userId }) => {
  const [item_name, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [expiration_date, setExpirationDate] = useState("");
  const [date_logged, setDateLogged] = useState("");
  const [itemId, setItemId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const insertFoodItem = useMutation(api.mutations.insertFoodItem);
  const updateFoodItem = useMutation(api.mutations.updateFoodItem);
  const removeFoodItem = useMutation(api.mutations.removeFoodItem);

  // Automatically set 'date_logged' to today's date when the form loads
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    setDateLogged(formattedDate); // Set today's date
  }, []); // Empty dependency array ensures this runs only once on component mount

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await insertFoodItem({
        userId,
        itemName: item_name,
        quantity,
        expirationDate: expiration_date,
        dateLogged: date_logged,
      });

      setSuccessMessage("Food item inserted successfully!");
      setItemName("");
      setQuantity(1);
      setExpirationDate("");
      setDateLogged(""); // You can reset this or leave it as the current date
      setErrorMessage("");
    } catch (error) {
      console.error("Failed to insert food item:", error);
      setErrorMessage("Failed to insert food item. Please try again.");
    }
  };

  const handleUpdate = async () => {
    if (!itemId) {
      setErrorMessage("Item ID is required for update.");
      return;
    }
    try {
      await updateFoodItem({
        itemId,
        userId,
        itemName: item_name,
        quantity,
        expirationDate: expiration_date,
        dateLogged: date_logged,
      });
      setSuccessMessage("Food item updated successfully!");
      setErrorMessage("");
    } catch (error) {
      console.error("Failed to update food item:", error);
      setErrorMessage("Failed to update food item. Please try again.");
    }
  };

  const handleRemove = async () => {
    if (!itemId) {
      setErrorMessage("Item ID is required for removal.");
      return;
    }
    try {
      await removeFoodItem({ itemId });
      setSuccessMessage("Food item removed successfully!");
      setErrorMessage("");
      setItemId("");
    } catch (error) {
      console.error("Failed to remove food item:", error);
      setErrorMessage("Failed to remove food item. Please try again.");
    }
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit} className="form-card">
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
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <button type="submit">Submit</button>
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
