// src/components/SideNav.tsx
import React, { useState } from 'react';
import { Menu, Home, Book, HelpCircle } from 'lucide-react';
import HelpModal from './HelpModal';

const SideNav: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);

  const openHelpModal = () => {
    setHelpModalOpen(true);
  };

  const closeHelpModal = () => {
    setHelpModalOpen(false);
  };

  return (
    <nav 
      className={`bg-white dark:bg-gray-300 shadow-md flex flex-col items-center py-4 gap-6 transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-[200px]' : 'w-[60px]'
      }`}
    >
      <button 
        className="p-2 hover:bg-gray-100 rounded-lg w-full flex items-center justify-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Menu className="w-6 h-6 icon-original" />
        {isExpanded && <span className="ml-2 text-original">Menu</span>}
      </button>

      <button className="p-2 hover:bg-gray-100 rounded-lg w-full flex items-center justify-center">
        <Home className="w-6 h-6 icon-original" />
        {isExpanded && <span className="ml-2 text-original">Home</span>}
      </button>

      <a 
        href="https://github.com/Rudra00codes/Garud-Nirdeshak"
        target="_blank" 
        rel="noopener noreferrer" 
        className="p-2 hover:bg-gray-100 rounded-lg w-full flex items-center justify-center"
      >
        <Book className="w-6 h-6 icon-original" />
        {isExpanded && <span className="ml-2 text-original">Guide</span>}
      </a>

      <button className="p-2 hover:bg-gray-100 rounded-lg w-full flex items-center justify-center" onClick={openHelpModal}>
        <HelpCircle className="w-6 h-6 icon-original" />
        {isExpanded && <span className="ml-2 text-original">Help</span>}
      </button>

      <HelpModal isOpen={isHelpModalOpen} onRequestClose={closeHelpModal} />
    </nav>
  );
};

export default SideNav;