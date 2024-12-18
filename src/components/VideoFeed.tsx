// src/components/VideoFeed.tsx
import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const VideoFeed: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-10">
          <LoadingSpinner size="large" color="blue" />
        </div>
      )}
      <video
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        poster="https://images.unsplash.com/photo-1506947411487-a56738267384?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
        onLoadedData={() => setIsLoading(false)}
      >
        <source src="your-rtsp-stream-url" type="application/x-rtsp" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">
        DRONE VIEW
      </div>
    </div>
  );
};

export default VideoFeed;