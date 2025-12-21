"use client";

import Link from "next/link";
import { useState } from "react";
import MapComponent from "@/components/MapComponent";

/**
 * Commuter Dashboard (Main Page)
 * Route: /commuter
 * 
 * Purpose:
 * - Main page for commuters to view live jeepney data
 * - Display Google Map with jeepney routes and live markers
 * - Show seat availability indicators
 * - Optional destination input for route suggestions
 * 
 * User Access: Commuter (no login required for MVP)
 * 
 * Contains:
 * - Google Map view (full-screen or prominent section)
 * - Jeepney route overlays
 * - Live jeepney markers with real-time positions
 * - Seat availability indicators
 * - Simple destination input (optional for MVP)
 * - Retractable sidebar panel
 */
export default function CommuterDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Sample data - replace with real data from your backend
  const sampleJeepneys = [
    {
      id: '1',
      position: { lat: 10.3157, lng: 123.8854 },
      plateNumber: 'ABC 123',
      route: 'Route 04B',
      availableSeats: 12
    },
    {
      id: '2',
      position: { lat: 10.3200, lng: 123.8900 },
      plateNumber: 'XYZ 789',
      route: 'Route 10H',
      availableSeats: 5
    }
  ];

  const sampleRoutes = [
    {
      id: 'route1',
      name: 'Route 04B',
      color: '#EF4444',
      path: [
        { lat: 10.3157, lng: 123.8854 },
        { lat: 10.3200, lng: 123.8900 },
        { lat: 10.3250, lng: 123.8950 }
      ]
    }
  ];

  const handleJeepneyClick = (jeepney: any) => {
    console.log('Jeepney clicked:', jeepney);
    // You can add logic to show details, navigate, etc.
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-base sm:text-lg md:text-xl font-bold text-red-900 hover:text-red-800">
              🚌 Cebu Jeepney Tracker
            </Link>
            <nav className="flex gap-2 sm:gap-4">
              <Link 
                href="/commuter/routes" 
                className="px-2 sm:px-4 py-2 text-sm sm:text-base text-gray-700 hover:text-red-900 transition"
              >
                <span className="hidden sm:inline">View Routes</span>
                <span className="sm:hidden">Routes</span>
              </Link>
              <Link 
                href="/" 
                className="px-2 sm:px-4 py-2 text-sm sm:text-base text-gray-700 hover:text-indigo-600 transition"
              >
                Home
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row h-[calc(100vh-73px)] relative">
        {/* Sidebar - Controls & Info */}
        <aside 
          className={`
            bg-white border-b md:border-r md:border-b-0 overflow-y-auto
            transition-all duration-300 ease-in-out
            ${isSidebarOpen 
              ? 'w-full md:w-80 max-h-[40vh] md:max-h-none' 
              : 'w-0 md:w-0 max-h-0 md:max-h-none overflow-hidden'
            }
          `}
        >
          <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
              Live Jeepney Tracker
            </h2>
            
            {/* Optional: Destination Input (MVP) */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Where are you going?
              </label>
              <input
                type="text"
                placeholder="Enter destination..."
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900"
              />
            </div>

            {/* Quick Actions */}
            <div className="space-y-3 mb-6">
              <Link 
                href="/commuter/routes"
                className="block w-full px-4 py-3 bg-red-900 text-white rounded-lg text-center font-medium hover:bg-red-800 transition"
              >
                📋 Browse All Routes
              </Link>
            </div>

            {/* Legend */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-800 mb-3">Map Legend</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span>Available Seats (5+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span>Limited Seats (1-4)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span>Full</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-400 border-2 border-blue-600"></div>
                  <span>Route Path</span>
                </div>
              </div>
            </div>

            {/* Active Jeepneys Summary */}
            <div className="border-t mt-6 pt-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                Active Jeepneys
              </h3>
              <div className="space-y-2">
                {/* Placeholder data - will be dynamic */}
                <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">IT Park → Colon</p>
                      <p className="text-sm text-gray-500">12 active</p>
                    </div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">SM → Ayala</p>
                      <p className="text-sm text-gray-500">8 active</p>
                    </div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Map Area */}
        <main className="flex-1 relative">
          {/* Toggle Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg p-3 hover:bg-gray-50 transition-all duration-200 group"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <div className="flex flex-col gap-1.5 w-6">
              <div className={`h-0.5 bg-gray-700 transition-all duration-300 ${isSidebarOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
              <div className={`h-0.5 bg-gray-700 transition-all duration-300 ${isSidebarOpen ? 'opacity-0' : 'opacity-100'}`}></div>
              <div className={`h-0.5 bg-gray-700 transition-all duration-300 ${isSidebarOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
            </div>
          </button>

          {/* Google Map */}
          <div className="w-full h-full">
            <MapComponent 
              jeepneys={sampleJeepneys}
              routes={sampleRoutes}
              onJeepneyClick={handleJeepneyClick}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
