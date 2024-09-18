// src/components/NotificationsPage.tsx
import React, { useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import {api} from '../../convex/_generated/api';

const NotificationsPage: React.FC = () => {
  const { data: expiringItems, status: queryStatus } = useQuery(api.queries.getExpiringItems.getExpiringItems);
  const mutateInsertNotification = useMutation(api.mutations.insertNotification.insertNotification);

  useEffect(() => {
    const checkAndInsertNotifications = async () => {
      if (queryStatus === 'success' && expiringItems) {
        try {
          for (const item of expiringItems) {
            await mutateInsertNotification({
              item_id: item._id,
              notification_date: new Date(item.expiration_date).toISOString(),
              notification_type: 'expiry',
            });
          }
          console.log('Notifications inserted successfully.');
        } catch (error) {
          console.error('Error inserting notifications:', error);
        }
      }
    };

    void checkAndInsertNotifications();
  }, [expiringItems, queryStatus, mutateInsertNotification]);

  if (queryStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (queryStatus === 'error') {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      <h1>Expiring Items Notifications</h1>
      {/* Display expiring items or notifications here */}
      {expiringItems?.length > 0 ? (
        <ul>
          {expiringItems.map((item: { _id: React.Key | null | undefined; item_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; expiration_date: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
            <li key={item._id}>{item.item_name} - Expiring on {item.expiration_date}</li>
          ))}
        </ul>
      ) : (
        <p>No items expiring soon.</p>
      )}
    </div>
  );
};

export default NotificationsPage;
