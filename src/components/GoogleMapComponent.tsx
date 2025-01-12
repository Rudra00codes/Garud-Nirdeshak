import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  height: '400px',
  width: '100%',
};

const center = {
  lat: 51.505, // Default latitude
  lng: -0.09,  // Default longitude
};

const GoogleMapComponent: React.FC = () => {
  const [currentPosition, setCurrentPosition] = useState(center);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting location: ", error);
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={currentPosition}
        zoom={15}
      >
        <Marker position={currentPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent; 