// src/App.tsx
import React, { useState, useEffect } from 'react';
// import DroneMap from './components/DroneMap';
import VideoFeed from './components/VideoFeed';
import SideNav from './components/SideNav';
import Statistics from './components/Statistics';
import Controls from './components/Controls';
import GoogleMapComponent from './components/GoogleMapComponent';
import AlertsComponent from './components/AlertsComponent';
import NotificationsComponent from './components/NotificationsComponent';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = 'black'
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
  const [notifications, setNotifications] = useState<{ message: string }[]>([]);

  useEffect(() => {
    // Set dark mode as default
    document.documentElement.classList.add('dark');
  }, []);

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

  useEffect(() => {
    setNotifications([{ message: "New update available!" }, { message: "Server maintenance scheduled." }]);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100">
        <div className="text-center space-y-8">
          <LoadingSpinner size="large" color="blue" />
          <div className="w-64">
            <div className="bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-blue-500 h-2.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
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
    <div className="min-h-screen bg-gray-900 transition-colors duration-300">
      {/* Main Layout */}
      <div className="grid grid-cols-[auto_1fr] h-screen">
        <SideNav />
        {/* Main Content */}
        <div className="grid grid-rows-[auto_1fr_auto] gap-4 p-4">
          {/* Top Section - Drone Status, Video Feed, Notifications, and Alerts */}
          <div className="grid grid-cols-[1.4fr_2fr_1fr_0.5fr] gap-4 h-[300px]">
            <div className="bg-white dark:bg-gray-300 rounded-lg shadow-md p-4">
              <div className="flex flex-col h-full">
                <iframe src='https://my.spline.design/drone-4907c90e03e5bdc622888d0b6e9eb4c3/'  width='100%' height='100%'></iframe>
                <h3 className="font-semibold">Drone Status</h3>
                {/* Add more drone status details here */}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <VideoFeed />
            </div>  
            <div className="bg-white dark:bg-gray-400 rounded-lg shadow-md overflow-hidden">
              <NotificationsComponent notifications={notifications} />
            </div>
            <div className="bg-white dark:bg-gray-400 rounded-lg shadow-md overflow-hidden">
              <AlertsComponent />
            </div>
          </div>
          <div className="grid grid-cols-[250px_1fr_300px] gap-4">
            <div className="bg-white dark:bg-gray-300 rounded-lg shadow-md p-4 overflow-y-auto">
              <h3 className="font-semibold mb-4">Route Instructions</h3>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <GoogleMapComponent />
            </div>
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