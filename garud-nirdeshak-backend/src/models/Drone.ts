// src/models/Drone.ts
import mongoose from 'mongoose';

const droneSchema = new mongoose.Schema({
  droneId: { type: String, required: true, unique: true },
  location: {
    latitude: Number,
    longitude: Number,
    altitude: Number
  },
  status: {
    type: String,
    enum: ['active', 'standby', 'emergency'],
    default: 'standby'
  },
  battery: Number,
  speed: Number,
  lastUpdate: { type: Date, default: Date.now }
});

export const Drone = mongoose.model('Drone', droneSchema);