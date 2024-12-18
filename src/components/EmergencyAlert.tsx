import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface EmergencyAlertProps {
  show: boolean;
  onClose: () => void;
}

const EmergencyAlert: React.FC<EmergencyAlertProps> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
          <span className="text-red-700">Emergency Alert Message!</span>
        </div>
        <button onClick={onClose} className="text-red-500 hover:text-red-700">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default EmergencyAlert;