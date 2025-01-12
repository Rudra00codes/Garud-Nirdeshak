import React from 'react';

interface AlertHistoryModalProps {
  history: any[]; // Adjust type as needed
  onClose: () => void;
}

const AlertHistoryModal: React.FC<AlertHistoryModalProps> = ({ history, onClose }) => {
  return (
    <div className="modal">
      <h2>Alert History</h2>
      <ul>
        {history.map((alert, index) => (
          <li key={index}>{alert.message}</li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AlertHistoryModal; 