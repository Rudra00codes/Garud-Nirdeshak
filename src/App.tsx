// src/App.tsx
import React, { useState, useEffect } from 'react';
// import { MapPin, Menu, Home, Book, HelpCircle, AlertTriangle, Settings } from 'lucide-react';
import DroneMap from './components/DroneMap';
import VideoFeed from './components/VideoFeed';
import SideNav from './components/SideNav';
import Statistics from './components/Statistics';
import Controls from './components/Controls';
import EmergencyAlert from './components/EmergencyAlert';

// Add these new imports
interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = 'blue'
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`
          ${sizeClasses[size]}
          border-4
          border-t-transparent
          border-${color}-500
          rounded-full
          animate-spin
        `}
      />
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500); // Add small delay after 100%
          return 100;
        }
        return prev + 20;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100">
        <div className="text-center space-y-8">
          {/* Optional: Add your logo here */}
          {/* <img src="/your-logo.png" alt="Logo" className="h-16 w-auto mb-8" /> */}

          <LoadingSpinner size="large" color="blue" />

          {/* Progress Bar */}
          <div className="w-64">
            <div className="bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-blue-500 h-2.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-2">
            <p className="text-gray-600 font-semibold animate-pulse">
              Loading Drone Dashboard...
            </p>
            <p className="text-sm text-gray-500">
              {loadingProgress}% Complete
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Layout */}
      <div className="grid grid-cols-[auto_1fr] h-screen"> {/* Changed from fixed width to auto */}
        <SideNav />

        {/* Main Content */}
        <div className="grid grid-rows-[auto_1fr_auto] gap-4 p-4">
          {/* Top Section - Map Preview, Video Feed, and Drone Status */}
          <div className="grid grid-cols-[300px_1fr_300px] gap-4 h-[300px]">
            {/* Mini Map */}
            <div className="bg-white rounded-lg shadow-md p-2">
              <DroneMap minimap={true} />
            </div>

            {/* Video Feed */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <VideoFeed /> {/* Integrate VideoFeed here */}
            </div>

            {/* Drone Status */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex flex-col h-full">
                <img
                  src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80"
                  alt="Drone"
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <EmergencyAlert
                  show={showEmergencyAlert}
                  onClose={() => setShowEmergencyAlert(false)}
                />
              </div>
            </div>
          </div>

          {/* Middle Section - Main Map */}
          <div className="grid grid-cols-[250px_1fr_300px] gap-4">
            {/* Route Instructions */}
            <div className="bg-white rounded-lg shadow-md p-4 overflow-y-auto">
              <h3 className="font-semibold mb-4">Route Instructions</h3>
              {/* Route details component would go here */}
            </div>

            {/* Main Map */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <DroneMap />
            </div>

            {/* Statistics and Controls */}
            <div className="flex flex-col gap-4">
              <Statistics />
              <Controls />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;