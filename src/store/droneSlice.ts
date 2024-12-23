import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DroneData } from '../types';

interface DroneState {
  drones: DroneData[];
  loading: boolean;
  error: string | null;
}

const initialState: DroneState = {
  drones: [],
  loading: false,
  error: null
};

export const droneSlice = createSlice({
  name: 'drone',
  initialState,
  reducers: {
    updateDroneData: (state, action: PayloadAction<DroneData>) => {
      const index = state.drones.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        state.drones[index] = action.payload;
      } else {
        state.drones.push(action.payload);
      }
    }
    // Add more reducers
  }
});
