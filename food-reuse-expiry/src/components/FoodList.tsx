import React from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api"; // Import your API
//import { Id } from "../../convex/_generated/dataModel"; // Import the Id type

interface FoodItem {
  _id: string;
  user_id: string;
  item_name: string;
  quantity: number;
  expiration_date: string;
  date_logged: string;
}

interface FoodListProps {
  userId: string;
}

const FoodList: React.FC<FoodListProps> = ({ userId }) => {
  // Use the Convex query to retrieve food items
  const foodItems = useQuery(api.getFoodItems:getFoodItems, {userId});

  if (!foodItems) {
    return <div>Loading food items...</div>;
  }

  return (
    <div>
      <h2>Your Food Items</h2>
      <ul>
        {foodItems.map((item: FoodItem) => (
          <li key={item._id}>
            <strong>{item.item_name}</strong> - {item.quantity} pcs
            <br />
            Expiration Date: {new Date(item.expiration_date).toLocaleDateString()}
            <br />
            Date Logged: {new Date(item.date_logged).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodList;
