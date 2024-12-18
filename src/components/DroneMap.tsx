// src/components/DroneMap.tsx
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface DroneMapProps {
  minimap?: boolean;
}

const DroneMap: React.FC<DroneMapProps> = ({ minimap = false }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const droneMarkerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      // Initialize map
      const map = L.map(mapRef.current).setView([51.505, -0.09], minimap ? 15 : 13);

      // Add different tile layer styles - you can choose different styles
      // Default OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Custom drone icon
      const droneIcon = L.divIcon({
        html: `
          <div class="relative">
            <div class="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
            <div class="absolute -top-1 -left-1 w-6 h-6 bg-blue-500 rounded-full opacity-30 animate-ping"></div>
          </div>
        `,
        className: 'custom-drone-icon',
      });

      // Add drone marker
      const droneMarker = L.marker([51.505, -0.09], { icon: droneIcon }).addTo(map);
      droneMarkerRef.current = droneMarker;

      // Example route coordinates
      const routeCoordinates: L.LatLngTuple[] = [
        [51.505, -0.09],
        [51.51, -0.1],
        [51.52, -0.12]
      ];

      // Add planned route (green line)
      L.polyline(routeCoordinates, { 
        color: '#00ff00', 
        weight: 3,
        dashArray: '5, 10' 
      }).addTo(map);

      // Generate and add actual route (blue zigzag)
      const actualRouteCoordinates = generateZigzagRoute(routeCoordinates);
      L.polyline(actualRouteCoordinates, { 
        color: '#0000ff', 
        weight: 3 
      }).addTo(map);

      // Add controls if not minimap
      if (!minimap) {
        // Add zoom control
        L.control.zoom({
          position: 'topright'
        }).addTo(map);

        // Add scale control
        L.control.scale({
          imperial: false
        }).addTo(map);

        // Add custom control panel
        const customControl = new L.Control({ position: 'topright' });
        customControl.onAdd = function() {
          const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
          div.innerHTML = `
            <div class="bg-white p-2 rounded-lg shadow-md">
              <button class="px-3 py-1 bg-blue-500 text-white rounded mb-2 w-full">
                Center Drone
              </button>
              <button class="px-3 py-1 bg-green-500 text-white rounded w-full">
                Follow Mode
              </button>
            </div>
          `;
          return div;
        };
        customControl.addTo(map);
      }

      // Animate drone movement along the route
      let currentPointIndex = 0;
      const animateDrone = () => {
        if (currentPointIndex < actualRouteCoordinates.length) {
          const point = actualRouteCoordinates[currentPointIndex];
          droneMarker.setLatLng(point as L.LatLngExpression);
          currentPointIndex++;
          setTimeout(animateDrone, 1000);
        }
      };
      animateDrone();

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [minimap]);

  // Helper function to generate zigzag route
  const generateZigzagRoute = (baseRoute: L.LatLngTuple[]): L.LatLngTuple[] => {
    const zigzagRoute: L.LatLngTuple[] = [];
    for (let i = 0; i < baseRoute.length - 1; i++) {
      const start = baseRoute[i];
      const end = baseRoute[i + 1];
      const midPoint: L.LatLngTuple = [
        (start[0] + end[0]) / 2 + 0.005,
        (start[1] + end[1]) / 2
      ];
      zigzagRoute.push(start, midPoint, end);
    }
    return zigzagRoute;
  };

  return (
    <div className="relative">
      <div ref={mapRef} className={`w-full ${minimap ? 'h-full' : 'h-[600px]'} rounded-lg overflow-hidden`} />
      
      {/* Optional overlay elements */}
      <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-md">
        <div className="text-sm">
          <div>Speed: 35 km/h</div>
          <div>Altitude: 100m</div>
        </div>
      </div>
    </div>
  );
};

export default DroneMap;