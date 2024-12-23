export interface DroneData {
  id: string;
  location: {
    lat: number;
    lng: number;
  };
  altitude: number;
  speed: number;
  battery: number;
  status: 'active' | 'idle' | 'returning';
}

export interface TrafficData {
  location: {
    lat: number;
    lng: number;
  };
  density: number;
  timestamp: string;
  incidents?: string[];
}

export interface Route {
  id: string;
  points: Array<[number, number]>;
  estimatedTime: number;
  distance: number;
  trafficLevel: 'low' | 'medium' | 'high';
}
