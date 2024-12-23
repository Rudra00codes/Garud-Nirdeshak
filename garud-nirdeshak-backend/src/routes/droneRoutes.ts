// src/routes/droneRoutes.ts
import { Router } from 'express';
import { getDroneStatus, updateDroneRoute } from '../controllers/droneController';

const router = Router();

router.get('/status/:droneId', getDroneStatus);
router.post('/route/:droneId', updateDroneRoute);

export default router;