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
  const [dronePosition, setDronePosition] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch traffic data from your API
    const fetchTrafficData = async () => {
      setLoading(true);
      try {
        const response = await fetch('YOUR_TRAFFIC_DATA_API_URL'); // Replace with your API URL
        if (!response.ok) throw new Error('Network response was not ok');
        const data: GeoJSON.FeatureCollection = await response.json();
        setTrafficData(data);
      } catch (error) {
        console.error("Error fetching traffic data: ", error);
      }
      setLoading(false);
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

      // Get user's current location
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setDronePosition([latitude, longitude]);
            // Update the drone marker position on the map
            if (droneMarkerRef.current) {
              droneMarkerRef.current.setLatLng([latitude, longitude]);
              map.setView([latitude, longitude], minimap ? 15 : 13); // Center the map on the drone's position
            }
          },
          (error) => {
            console.error("Error getting location: ", error);
          },
          { enableHighAccuracy: true }
        );
      }
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
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white opacity-75">
          <p>Loading traffic data...</p> {/* Loading message */}
        </div>
      ) : (
        <div ref={mapRef} className={`w-full ${minimap ? 'h-full' : 'h-[600px]'} rounded-lg overflow-hidden`} />
      )}
      {trafficData && <TrafficOverlay showTraffic={true} trafficData={trafficData} />}
      {dronePosition && (
        <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow">
          <p>Drone Position: {dronePosition[0].toFixed(4)}, {dronePosition[1].toFixed(4)}</p>
        </div>
      )}
      {/* Fallback content */}
      <div className="absolute top-0 left-0 bg-red-500 text-white p-2">
        <p>DroneMap Component Loaded</p>
      </div>
    </div>
  );
};

export default DroneMap;
