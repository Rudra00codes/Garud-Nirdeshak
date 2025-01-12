import React from 'react';

// Define the Notification type
interface Notification {
  message: string; // Notification message
}

const NotificationsComponent: React.FC<{ notifications: Notification[] }> = ({ notifications }) => {
  return (
    <div className="bg-white  rounded-lg shadow-md p-4">
      <h3 className="font-semibold mb-4">Notifications</h3>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsComponent; 