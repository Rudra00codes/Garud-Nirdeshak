import { useState } from 'react';
import AlertHistoryModal from './AlertHistoryModal';

// Define the Alert type
interface Alert {
  message: string; // Alert message
  severity: 'High' | 'Moderate' | 'Low'; // Severity level
}

const AlertsComponent = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertHistory, setAlertHistory] = useState<Alert[]>([]);

  // Example function to demonstrate usage of setAlerts
  const addDummyAlert = () => {
    const newAlert: Alert = { message: "Dummy alert", severity: "Moderate" };
    setAlerts((prev) => [...prev, newAlert]); // Now setAlerts is used
    setAlertHistory((prev) => [...prev, newAlert]); // Now setAlertHistory is used
  };

  const handleAlertClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-semibold mb-4">Advanced Alerts</h3>
      <button onClick={addDummyAlert} className="mb-2">Add Dummy Alert</button>
      <p>Total Alerts: {alerts.length}</p>
      <ul>
        {alerts.map((alert, index) => (
          <li key={index} onClick={handleAlertClick}>
            {alert.severity} Alert
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <AlertHistoryModal
          history={alertHistory}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AlertsComponent; 