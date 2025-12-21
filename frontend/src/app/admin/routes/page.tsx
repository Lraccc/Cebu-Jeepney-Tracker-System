"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * Route Management Page
 * Route: /admin/routes
 * 
 * Purpose:
 * - Manage all jeepney routes in the system
 * - Add, edit, view, and delete routes
 * - View route polylines on map preview
 * 
 * User Access: Admin (authenticated)
 * 
 * Contains:
 * - List of all routes
 * - Add new route button
 * - Edit/View/Delete actions for each route
 * - Map preview of route polyline
 * - Route details (name, endpoints, distance, fare, etc.)
 */
export default function RouteManagementPage() {
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);

  // Mock data - would come from backend
  const routes = [
    {
      id: 1,
      name: "IT Park → Colon",
      startPoint: "IT Park",
      endPoint: "Colon Street",
      distance: "8.5 km",
      estimatedTime: "25-30 min",
      fare: "₱13",
      activeJeepneys: 12,
      status: "active",
      waypoints: ["Ayala Center", "Mango Square", "Fuente Osmeña"],
    },
    {
      id: 2,
      name: "SM City → Ayala Center",
      startPoint: "SM City Cebu",
      endPoint: "Ayala Center",
      distance: "6.2 km",
      estimatedTime: "20-25 min",
      fare: "₱11",
      activeJeepneys: 8,
      status: "active",
      waypoints: ["Mango Avenue", "Jones Avenue"],
    },
    {
      id: 3,
      name: "Carbon Market → Lahug",
      startPoint: "Carbon Market",
      endPoint: "Lahug",
      distance: "9.1 km",
      estimatedTime: "30-35 min",
      fare: "₱13",
      activeJeepneys: 6,
      status: "active",
      waypoints: ["Colon", "Capitol", "JY Square"],
    },
    {
      id: 4,
      name: "Mandaue → Colon",
      startPoint: "Mandaue City",
      endPoint: "Colon Street",
      distance: "10.3 km",
      estimatedTime: "35-40 min",
      fare: "₱15",
      activeJeepneys: 10,
      status: "active",
      waypoints: ["Centro", "Plaridel", "Carbon"],
    },
    {
      id: 5,
      name: "Talamban → Downtown",
      startPoint: "Talamban",
      endPoint: "Downtown Cebu",
      distance: "12.7 km",
      estimatedTime: "40-45 min",
      fare: "₱15",
      activeJeepneys: 5,
      status: "active",
      waypoints: ["Banilad", "IT Park", "Fuente"],
    },
    {
      id: 6,
      name: "Bulacao → SM Seaside",
      startPoint: "Bulacao",
      endPoint: "SM Seaside City",
      distance: "7.8 km",
      estimatedTime: "25-30 min",
      fare: "₱13",
      activeJeepneys: 0,
      status: "inactive",
      waypoints: ["Talisay", "SRP"],
    },
  ];

  const handleAddRoute = () => {
    alert("Add Route functionality - to be implemented");
  };

  const handleEditRoute = (routeId: number) => {
    alert(`Edit Route ${routeId} - to be implemented`);
  };

  const handleDeleteRoute = (routeId: number) => {
    if (confirm("Are you sure you want to delete this route?")) {
      alert(`Delete Route ${routeId} - to be implemented`);
    }
  };

  const handleViewOnMap = (routeId: number) => {
    setSelectedRoute(routeId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <Link 
                href="/admin" 
                className="text-sm text-gray-600 hover:text-red-900 mb-1 inline-block"
              >
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-red-900">
                Route Management
              </h1>
            </div>
            <button
              onClick={handleAddRoute}
              className="px-6 py-2 bg-red-900 text-white rounded-lg font-medium hover:bg-red-800 transition"
            >
              ➕ Add New Route
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Routes List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Table Header */}
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h2 className="text-lg font-bold text-gray-900">
                  All Routes ({routes.length})
                </h2>
              </div>

              {/* Routes Table */}
              <div className="divide-y">
                {routes.map((route) => (
                  <div
                    key={route.id}
                    className={`p-6 hover:bg-gray-50 transition ${
                      selectedRoute === route.id ? "bg-indigo-50" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            {route.name}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              route.status === "active"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {route.status === "active" ? "Active" : "Inactive"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <span>📍 {route.startPoint}</span>
                          <span>→</span>
                          <span>📍 {route.endPoint}</span>
                        </div>
                      </div>
                    </div>

                    {/* Route Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-gray-600">Distance</p>
                        <p className="font-semibold text-gray-900">
                          {route.distance}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Est. Time</p>
                        <p className="font-semibold text-gray-900">
                          {route.estimatedTime}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Fare</p>
                        <p className="font-semibold text-gray-900">
                          {route.fare}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Active Jeepneys</p>
                        <p
                          className={`font-semibold ${
                            route.activeJeepneys > 0
                              ? "text-green-600"
                              : "text-gray-900"
                          }`}
                        >
                          {route.activeJeepneys}
                        </p>
                      </div>
                    </div>

                    {/* Waypoints */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-600 mb-1">Waypoints:</p>
                      <div className="flex flex-wrap gap-2">
                        {route.waypoints.map((waypoint, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                          >
                            {waypoint}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewOnMap(route.id)}
                        className="px-4 py-2 bg-red-900 text-white rounded-lg text-sm font-medium hover:bg-red-800 transition"
                      >
                        🗺️ View on Map
                      </button>
                      <button
                        onClick={() => handleEditRoute(route.id)}
                        className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDeleteRoute(route.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map Preview Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h2 className="text-lg font-bold text-gray-900">
                  Map Preview
                </h2>
              </div>

              {selectedRoute ? (
                <div>
                  {/* Map Placeholder */}
                  <div className="h-64 bg-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🗺️</div>
                      <p className="text-sm text-gray-600">
                        Route polyline for
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {routes.find((r) => r.id === selectedRoute)?.name}
                      </p>
                    </div>
                  </div>

                  {/* Selected Route Info */}
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-3">
                      Route Details
                    </h3>
                    {routes
                      .filter((r) => r.id === selectedRoute)
                      .map((route) => (
                        <div key={route.id} className="space-y-2 text-sm">
                          <div>
                            <p className="text-gray-600">Route Name</p>
                            <p className="font-semibold text-gray-900">
                              {route.name}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Distance</p>
                            <p className="font-semibold text-gray-900">
                              {route.distance}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Waypoints</p>
                            <p className="font-semibold text-gray-900">
                              {route.waypoints.length} stops
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="h-96 flex items-center justify-center p-6 text-center">
                  <div>
                    <div className="text-5xl mb-3">📍</div>
                    <p className="text-gray-600">
                      Select a route to view its map preview
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="mt-6 bg-gradient-to-br from-red-900 to-amber-600 text-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold mb-4">Route Statistics</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-amber-100 text-sm">Total Routes</p>
                  <p className="text-2xl font-bold">{routes.length}</p>
                </div>
                <div>
                  <p className="text-amber-100 text-sm">Active Routes</p>
                  <p className="text-2xl font-bold">
                    {routes.filter((r) => r.status === "active").length}
                  </p>
                </div>
                <div>
                  <p className="text-amber-100 text-sm">Total Active Jeepneys</p>
                  <p className="text-2xl font-bold">
                    {routes.reduce((sum, r) => sum + r.activeJeepneys, 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
