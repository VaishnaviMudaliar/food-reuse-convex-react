import React, { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import "./expiringItems.css";

const ExpiringItemsPage: React.FC = () => {
  const [expiringItems, setExpiringItems] = useState<any[]>([]); // Define type based on your data structure

  // Use mutation to fetch data
  const fetchExpiringItems = useMutation(api.mutations.checkNearingExpiryItems.checkNearingExpiryItems);

  useEffect(() => {
    const getExpiringItems = async () => {
      try {
        const items = await fetchExpiringItems();
        setExpiringItems(items);
      } catch (error) {
        console.error("Failed to fetch expiring items:", error);
      }
    };

    void getExpiringItems();
  }, [fetchExpiringItems]);

  return (
    <div className="expiring-items-page">
      <h1>Expiring Food Items</h1>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Expiration Date</th>
            <th>Date Logged</th>
          </tr>
        </thead>
        <tbody>
          {expiringItems.map((item) => (
            <tr key={item.item_id}>
              <td>{item.item_name}</td>
              <td>{item.quantity}</td>
              <td>{item.expiration_date}</td>
              <td>{item.date_logged}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpiringItemsPage;
