// src/components/DroneMap.tsx
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import TrafficOverlay from './TrafficOverlay';

interface DroneMapProps {
  minimap?: boolean;
}

const DroneMap: React.FC<DroneMapProps> = ({ minimap = false }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const droneMarkerRef = useRef<L.Marker | null>(null);
  const [trafficData, setTrafficData] = useState<GeoJSON.FeatureCollection | null>(null);

  useEffect(() => {
    // Fetch traffic data from your API
    const fetchTrafficData = async () => {
      const response = await fetch('YOUR_TRAFFIC_DATA_API_URL'); // Replace with your API URL
      const data: GeoJSON.FeatureCollection = await response.json();
      setTrafficData(data);
    };

    fetchTrafficData();
  }, []);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView([51.505, -0.09], minimap ? 15 : 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      const droneIcon = L.divIcon({
        html: `
          <div class="relative">
            <div class="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
            <div class="absolute -top-1 -left-1 w-6 h-6 bg-blue-500 rounded-full opacity-30 animate-ping"></div>
          </div>
        `,
        className: 'custom-drone-icon',
      });

      const droneMarker = L.marker([51.505, -0.09], { icon: droneIcon }).addTo(map);
      droneMarkerRef.current = droneMarker;

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [minimap]);

  return (
    <div className="relative">
      <div ref={mapRef} className={`w-full ${minimap ? 'h-full' : 'h-[600px]'} rounded-lg overflow-hidden`} />
      {trafficData && <TrafficOverlay showTraffic={true} trafficData={trafficData} />}
    </div>
  );
};

export default DroneMap;