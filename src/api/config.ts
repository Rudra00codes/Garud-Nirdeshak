import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const droneService = {
  getDroneLocation: async () => {
    try {
      const response = await api.get('/drone/location');
      return response.data;
    } catch (error) {
      console.error('Error fetching drone location:', error);
      throw error;
    }
  },
  // Add more API calls
};
