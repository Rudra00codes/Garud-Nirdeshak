import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#1a1a1a',
    color: 'white',
    borderRadius: '8px',
    padding: '20px',
    width: '400px',
    border: '1px solid #333',
  },
};

interface SettingsModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className="flex items-center mb-4">
        <div className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center mr-2">
          <span>!</span>
        </div>
        <h2 className="text-xl font-bold">SETTING</h2>
      </div>
      <hr className="border-gray-600 mb-4" />
      <div className="space-y-4">
        <div className="flex flex-col">
          <label className="flex justify-between">
            <span>Maximum Altitude</span>
            <input type="number" className="bg-gray-800 rounded px-2 py-1 w-24" defaultValue={400} />
          </label>
          <label className="flex justify-between">
            <span>Speed Limit (mph)</span>
            <input type="number" className="bg-gray-800 rounded px-2 py-1 w-24" defaultValue={35} />
          </label>
        </div>
        <div className="space-y-2">
          <label className="flex items-center justify-between">
            <span>Show Route Preview</span>
            <input type="checkbox" defaultChecked />
          </label>
          <label className="flex items-center justify-between">
            <span>Enable Notifications</span>
            <input type="checkbox" defaultChecked />
          </label>
        </div>
      </div>
      <div className="flex justify-end space-x-4 mt-4">
        <button onClick={onRequestClose} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded">
          Cancel
        </button>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded">
          Save Changes
        </button>
      </div>
    </Modal>
  );
};

export default SettingsModal;   