"use client";

import { GoogleMap, useLoadScript, Marker, Polyline, OverlayView } from '@react-google-maps/api';
import { useState, useCallback, useEffect } from 'react';

const containerStyle = {
  width: '100%',
  height: '100%'
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
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey || '',
  });

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationError(null);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationError('Unable to get your location');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser');
    }
  }, []);

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

  const centerOnUserLocation = () => {
    if (map && userLocation) {
      map.panTo(userLocation);
      map.setZoom(15);
    }
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
    <div className="relative w-full h-full">
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

        {/* Draw user location marker with pulse effect */}
        {userLocation && (
          <>
            {/* Pulsing outer ring */}
            <OverlayView
              position={userLocation}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className="relative">
                <div className="absolute -translate-x-1/2 -translate-y-1/2">
                  <div className="user-location-pulse w-10 h-10 rounded-full bg-blue-400 opacity-30"></div>
                </div>
              </div>
            </OverlayView>
            
            {/* Center dot */}
            <Marker
              position={userLocation}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: '#4285F4',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 3,
              }}
              title="Your Location"
              zIndex={1000}
            />
          </>
        )}

        {/* Draw jeepney markers */}
        {jeepneys.map((jeepney) => (
          <Marker
            key={jeepney.id}
            position={jeepney.position}
            onClick={() => handleMarkerClick(jeepney)}
            icon={{
              url: selectedJeepney === jeepney.id 
                ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
              scaledSize: map ? new google.maps.Size(40, 40) : undefined,
            }}
            title={`${jeepney.plateNumber} - ${jeepney.route}`}
          />
        ))}
      </GoogleMap>

      {/* Center on User Location Button */}
      {userLocation && (
        <button
          onClick={centerOnUserLocation}
          className="absolute bottom-[200px] right-[10px] bg-white rounded-sm shadow-md w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-all duration-200 z-10"
          title="Center on my location"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      )}

      {/* Location Error Message */}
      {locationError && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded-lg text-sm z-10">
          {locationError}
        </div>
      )}
    </div>
  );
}
