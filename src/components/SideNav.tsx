// src/components/SideNav.tsx
import React, { useState } from 'react';
import { Menu, Home, Book, HelpCircle } from 'lucide-react';

const SideNav: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <nav 
      className={`bg-white shadow-md flex flex-col items-center py-4 gap-6 transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-[200px]' : 'w-[60px]'
      }`}
    >
      <button 
        className="p-2 hover:bg-gray-100 rounded-lg w-full flex items-center justify-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Menu className="w-6 h-6" />
        {isExpanded && <span className="ml-2">Menu</span>}
      </button>

      <button className="p-2 hover:bg-gray-100 rounded-lg w-full flex items-center justify-center">
        <Home className="w-6 h-6" />
        {isExpanded && <span className="ml-2">Home</span>}
      </button>

      <button className="p-2 hover:bg-gray-100 rounded-lg w-full flex items-center justify-center">
        <Book className="w-6 h-6" />
        {isExpanded && <span className="ml-2">Guide</span>}
      </button>

      <button className="p-2 hover:bg-gray-100 rounded-lg w-full flex items-center justify-center">
        <HelpCircle className="w-6 h-6" />
        {isExpanded && <span className="ml-2">Help</span>}
      </button>
    </nav>
  );
};

export default SideNav;