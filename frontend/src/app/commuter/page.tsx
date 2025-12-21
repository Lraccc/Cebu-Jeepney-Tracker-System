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
  const [searchCode, setSearchCode] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedJeepney, setSelectedJeepney] = useState<any>(null);
  
  // Sample data - replace with real data from your backend
  const allJeepneys = [
    {
      id: '1',
      position: { lat: 10.3157, lng: 123.8854 },
      plateNumber: 'ABC 123',
      code: '04B',
      route: 'IT Park → Colon',
      availableSeats: 12,
      totalSeats: 16
    },
    {
      id: '2',
      position: { lat: 10.3200, lng: 123.8900 },
      plateNumber: 'XYZ 789',
      code: '10H',
      route: 'SM → Ayala',
      availableSeats: 5,
      totalSeats: 16
    },
    {
      id: '3',
      position: { lat: 10.3100, lng: 123.8800 },
      plateNumber: 'DEF 456',
      code: '04B',
      route: 'IT Park → Colon',
      availableSeats: 8,
      totalSeats: 16
    }
  ];

  const allRoutes = [
    {
      id: 'route-04B',
      name: 'Route 04B',
      code: '04B',
      color: '#EF4444',
      path: [
        { lat: 10.3157, lng: 123.8854 },
        { lat: 10.3200, lng: 123.8900 },
        { lat: 10.3250, lng: 123.8950 }
      ]
    },
    {
      id: 'route-10H',
      name: 'Route 10H',
      code: '10H',
      color: '#3B82F6',
      path: [
        { lat: 10.3200, lng: 123.8900 },
        { lat: 10.3150, lng: 123.8920 },
        { lat: 10.3100, lng: 123.8940 }
      ]
    }
  ];

  // Filter based on search
  const filteredJeepneys = searchCode 
    ? allJeepneys.filter(j => j.code.toLowerCase().includes(searchCode.toLowerCase()))
    : allJeepneys;

  const filteredRoutes = searchCode
    ? allRoutes.filter(r => r.code.toLowerCase().includes(searchCode.toLowerCase()))
    : allRoutes;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCode) {
      setIsPanelOpen(true);
      const found = allJeepneys.find(j => j.code.toLowerCase() === searchCode.toLowerCase());
      setSelectedJeepney(found || null);
    }
  };

  const handleJeepneyClick = (jeepney: any) => {
    setSelectedJeepney(jeepney);
    setSearchCode(jeepney.code);
    setIsPanelOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm border-b flex-shrink-0">
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

      {/* Search Panel */}
      <div className="bg-white border-b shadow-sm flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <form onSubmit={handleSearch} className="flex gap-3 items-center">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  placeholder="Enter jeepney code (e.g., 04B, 10H)..."
                  className="w-full px-4 py-2.5 pr-12 border rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900 text-base text-gray-900 placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-red-900 text-white rounded-md hover:bg-red-800 transition text-sm font-medium"
                >
                  Search
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsPanelOpen(!isPanelOpen)}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium text-sm sm:text-base whitespace-nowrap"
            >
              {isPanelOpen ? '▼ Hide Info' : '▶ Show Info'}
            </button>
          </form>
        </div>

        {/* Info Panel - Collapsible */}
        {isPanelOpen && (
          <div className="border-t bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left: Search Results */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">
                    {searchCode ? `Results for "${searchCode}"` : 'All Active Jeepneys'}
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {filteredJeepneys.length > 0 ? (
                      filteredJeepneys.map((jeepney) => (
                        <div
                          key={jeepney.id}
                          onClick={() => handleJeepneyClick(jeepney)}
                          className={`p-3 rounded-lg cursor-pointer transition ${
                            selectedJeepney?.id === jeepney.id
                              ? 'bg-red-100 border border-red-300'
                              : 'bg-white hover:bg-gray-100 border border-gray-200'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-red-900">{jeepney.code}</span>
                                <span className="text-sm text-gray-600">•</span>
                                <span className="text-sm font-medium">{jeepney.plateNumber}</span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{jeepney.route}</p>
                            </div>
                            <div className="text-right">
                              <div className={`text-sm font-semibold ${
                                jeepney.availableSeats > 5 ? 'text-green-600' :
                                jeepney.availableSeats > 0 ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {jeepney.availableSeats}/{jeepney.totalSeats}
                              </div>
                              <div className="text-xs text-gray-500">seats</div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm py-4 text-center">
                        No jeepneys found with code "{searchCode}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: Selected Jeepney Info or Legend */}
                <div>
                  {selectedJeepney ? (
                    <>
                      <h3 className="font-semibold text-gray-800 mb-3">Selected Jeepney</h3>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="space-y-2">
                          <div>
                            <span className="text-sm text-gray-500">Code:</span>
                            <span className="ml-2 font-bold text-red-900 text-lg">{selectedJeepney.code}</span>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Plate Number:</span>
                            <span className="ml-2 font-medium">{selectedJeepney.plateNumber}</span>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Route:</span>
                            <span className="ml-2 font-medium">{selectedJeepney.route}</span>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Available Seats:</span>
                            <span className={`ml-2 font-bold ${
                              selectedJeepney.availableSeats > 5 ? 'text-green-600' :
                              selectedJeepney.availableSeats > 0 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {selectedJeepney.availableSeats} / {selectedJeepney.totalSeats}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="font-semibold text-gray-800 mb-3">Map Legend</h3>
                      <div className="bg-white p-4 rounded-lg border space-y-2 text-sm">
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
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Map Area */}
      <div className="flex-1 min-h-0 relative">
        <MapComponent 
          jeepneys={filteredJeepneys}
          routes={filteredRoutes}
          onJeepneyClick={handleJeepneyClick}
        />
      </div>
    </div>
  );
}
