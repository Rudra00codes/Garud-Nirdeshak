import { Request, Response } from 'express';
import { DroneService } from '../services/droneService';

export const getDroneStatus = async (req: Request, res: Response) => {
  try {
    const { droneId } = req.params;
    const status = await DroneService.getStatus(droneId);
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get drone status' });
  }
};

export const updateDroneRoute = async (req: Request, res: Response) => {
  try {
    const { droneId } = req.params;
    const { route } = req.body;
    await DroneService.updateRoute(droneId, route);
    res.json({ message: 'Route updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update drone route' });
  }
};
