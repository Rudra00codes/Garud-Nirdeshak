// src/components/TrafficOverlay.tsx
import React from 'react';
import { Layer, Source } from 'react-map-gl';

interface TrafficOverlayProps {
  showTraffic: boolean;
  trafficData: GeoJSON.FeatureCollection;
}

const TrafficOverlay: React.FC<TrafficOverlayProps> = ({ showTraffic, trafficData }) => {
  if (!showTraffic) return null; // Don't render if traffic is not shown

  return (
    <Source
      id="traffic"
      type="geojson"
      data={trafficData}
    >
      <Layer
        id="traffic-heat"
        type="heatmap"
        paint={{
          'heatmap-weight': ['get', 'density'],
          'heatmap-intensity': 1,
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(33,102,172,0)',
            0.2, 'rgb(103,169,207)',
            0.4, 'rgb(209,229,240)',
            0.6, 'rgb(253,219,199)',
            0.8, 'rgb(239,138,98)',
            1, 'rgb(178,24,43)'
          ]
        }}
      />
    </Source>
  );
};

export default TrafficOverlay;