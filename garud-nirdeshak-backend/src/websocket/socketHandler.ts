import { Server, Socket } from 'socket.io';
import { Drone } from '../models/Drone';

export const setupSocketHandlers = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('Client connected:', socket.id);

    // Handle drone position updates
    socket.on('droneUpdate', async (data) => {
      try {
        await Drone.findOneAndUpdate(
          { droneId: data.droneId },
          {
            location: data.location,
            battery: data.battery,
            speed: data.speed,
            lastUpdate: new Date()
          },
          { upsert: true }
        );

        // Broadcast update to all connected clients
        io.emit('droneStatusUpdate', data);
      } catch (error) {
        console.error('Error updating drone:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};
