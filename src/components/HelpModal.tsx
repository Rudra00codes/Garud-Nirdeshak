import React from 'react';
import Modal from 'react-modal';
import yourImage from '/assets/images/tube.png'; // Import your PNG image

// Define the props interface
interface HelpModalProps {
  isOpen: boolean; // Type for isOpen
  onRequestClose: () => void; // Type for onRequestClose function
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onRequestClose }) => {
  // Custom styles for the modal
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark overlay
      backdropFilter: 'blur(5px)', // Add blur effect to the backdrop
      zIndex: 1000, // Ensure the overlay is on top
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      zIndex: 1001, // Ensure the modal content is on top of the overlay
      maxWidth: '900px', // Increased max width for the modal
      width: '90%', // Set a width for the modal
      borderRadius: '8px', // Add border radius for rounded corners
      padding: '20px', // Add padding inside the modal
      backgroundColor: 'white', // Set background color for the modal content
      display: 'flex', // Use flexbox for layout
      alignItems: 'center', // Center items vertically
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles} // Apply custom styles
      ariaHideApp={false} // Prevent screen readers from reading the app behind the modal
    >
      <div className="relative flex gap-4">
        {/* Background cards for stacked effect - Left side */}
        <div className="absolute -bottom-2 -right-2 w-full h-full bg-black"></div>
        
        {/* Main content container */}
        <div className="relative flex gap-4 w-full">
          {/* Left side content */}
          <div className="flex-1 bg-white border-2 border-black p-8">
              <h2 className="text-3xl font-bold mb-2">HELP</h2>
              <div className="w-full h-0.5 bg-black mb-6"></div>

              <p className="text-xl mb-6">Features and Uses of the Components in the Dashboard:</p>
              <ul className="list-disc pl-5 mb-6">
                  <li><strong>DroneMap:</strong> Displays the current location of the drone and Site.</li>
                  <li><strong>VideoFeed:</strong> Shows the live video feed from the drone Camera.</li>
                  <li><strong>Statistics:</strong> Provides data and metrics related to drone and Site.</li>
                  <li><strong>Controls:</strong> Allows users to control the Camera Modes.</li>
              </ul>

              <a href="URL_OF_YOUR_DOCUMENTATION" target="_blank" className="bg-black text-white px-6 py-2 hover:bg-green-500 active:scale-95 transition-transform duration-150">
                  DETAILED DOCUMENTATION
              </a>
          </div>

          {/* Right side image */}
          <div className="w-1/3">
            <img 
              src={yourImage} 
              alt="Notes" 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default HelpModal; 