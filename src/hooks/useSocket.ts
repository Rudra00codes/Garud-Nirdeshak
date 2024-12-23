// src/hooks/useSocket.ts
import { useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';

interface DroneData {
  position: [number, number];
  altitude: number;
  speed: number;
}

interface TrafficData {
  density: number;
  location: [number, number];
}

export const useSocket = () => {
  const socketRef = useRef<typeof Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_WEBSOCKET_URL);

    socketRef.current.on('droneUpdate', (data: DroneData) => {
      console.log('Drone update received:', data);
      // Handle drone updates
    });

    socketRef.current.on('trafficUpdate', (data: TrafficData) => {
      console.log('Traffic update received:', data);
      // Handle traffic updates
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return socketRef.current;
};
