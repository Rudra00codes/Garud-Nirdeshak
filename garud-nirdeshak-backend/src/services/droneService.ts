import { Drone } from '../models/Drone';

export class DroneService {
  static async getStatus(droneId: string) {
    try {
      const drone = await Drone.findById(droneId);
      return drone?.status;
    } catch (error) {
      throw new Error('Failed to get drone status');
    }
  }

  static async updateRoute(droneId: string, route: any) {
    try {
      await Drone.findByIdAndUpdate(droneId, { route });
    } catch (error) {
      throw new Error('Failed to update drone route');
    }
  }
}
