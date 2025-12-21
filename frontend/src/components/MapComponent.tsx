"use client";

import { GoogleMap, useLoadScript, Marker, Polyline } from '@react-google-maps/api';
import { useState, useCallback } from 'react';

const containerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '400px'
};

// Center on Cebu City
const cebuCenter = {
  lat: 10.3157,
  lng: 123.8854
};

interface JeepneyMarker {
  id: string;
  position: { lat: number; lng: number };
  plateNumber: string;
  route: string;
  availableSeats: number;
}

interface RoutePolyline {
  id: string;
  path: { lat: number; lng: number }[];
  color: string;
  name: string;
}

interface MapComponentProps {
  jeepneys?: JeepneyMarker[];
  routes?: RoutePolyline[];
  onJeepneyClick?: (jeepney: JeepneyMarker) => void;
}

export default function MapComponent({ 
  jeepneys = [], 
  routes = [],
  onJeepneyClick 
}: MapComponentProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedJeepney, setSelectedJeepney] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey || '',
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMarkerClick = (jeepney: JeepneyMarker) => {
    setSelectedJeepney(jeepney.id);
    onJeepneyClick?.(jeepney);
  };

  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center p-4">
          <p className="text-red-600 font-semibold">Error loading Google Maps</p>
          <p className="text-sm text-gray-600 mt-2">{loadError.message}</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center p-4">
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  if (!apiKey) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center p-4">
          <p className="text-red-600 font-semibold">Google Maps API Key not configured</p>
          <p className="text-sm text-gray-600 mt-2">
            Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file
          </p>
        </div>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={cebuCenter}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: true,
        zoomControl: true,
      }}
    >
      {/* Draw route polylines */}
      {routes.map((route) => (
        <Polyline
          key={route.id}
          path={route.path}
          options={{
            strokeColor: route.color,
            strokeOpacity: 0.8,
            strokeWeight: 4,
          }}
        />
      ))}

      {/* Draw jeepney markers */}
      {jeepneys.map((jeepney) => (
        <Marker
          key={jeepney.id}
          position={jeepney.position}
          onClick={() => handleMarkerClick(jeepney)}
          icon={{
            url: selectedJeepney === jeepney.id 
              ? 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
              : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            scaledSize: map ? new google.maps.Size(40, 40) : undefined,
          }}
          title={`${jeepney.plateNumber} - ${jeepney.route}`}
        />
      ))}
    </GoogleMap>
  );
}
