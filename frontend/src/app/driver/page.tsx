"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * Driver Dashboard
 * Route: /driver
 * 
 * Purpose:
 * - Allow drivers to manage their jeepney status and operations
 * - Update passenger count and tracking status
 * - View current route and operational information
 * 
 * User Access: Driver (authenticated)
 * 
 * Contains:
 * - Start/Stop tracking button
 * - Passenger count controls (+ / -)
 * - Current route information
 * - Status indicator (Online/Offline)
 * - Operational metrics
 */
export default function DriverDashboard() {
  // State management
  const [isTracking, setIsTracking] = useState(false);
  const [passengerCount, setPassengerCount] = useState(0);
  const maxPassengers = 16;

  // Driver/Jeepney info - would come from auth context in production
  const driverInfo = {
    name: "Juan Dela Cruz",
    jeepneyPlate: "ABC-1234",
    route: "IT Park → Colon",
    licenseNumber: "N02-12-345678",
  };

  const handleStartTracking = () => {
    setIsTracking(true);
    // TODO: Start GPS tracking and send updates to backend
  };

  const handleStopTracking = () => {
    setIsTracking(false);
    // TODO: Stop GPS tracking
  };

  const incrementPassengers = () => {
    if (passengerCount < maxPassengers) {
      setPassengerCount(passengerCount + 1);
      // TODO: Send update to backend
    }
  };

  const decrementPassengers = () => {
    if (passengerCount > 0) {
      setPassengerCount(passengerCount - 1);
      // TODO: Send update to backend
    }
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    alert("Logout functionality - to be implemented");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-red-900">
              🚗 Driver Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-700 hover:text-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Driver Info Card */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                Welcome, {driverInfo.name}!
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                License: {driverInfo.licenseNumber}
              </p>
            </div>
            <div className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-base sm:text-lg font-bold ${
              isTracking 
                ? "bg-green-100 text-green-700" 
                : "bg-gray-100 text-gray-700"
            }`}>
              {isTracking ? "🟢 Online" : "⚫ Offline"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Control Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tracking Control */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Tracking Control
              </h3>

              {!isTracking ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🚦</div>
                  <p className="text-gray-600 mb-6">
                    Start tracking to make your jeepney visible to commuters
                  </p>
                  <button
                    onClick={handleStartTracking}
                    className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold text-lg hover:bg-green-700 transition shadow-lg"
                  >
                    ▶️ Start Tracking
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">📡</div>
                  <div className="mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <p className="text-green-700 font-semibold text-lg">
                        Live Tracking Active
                      </p>
                    </div>
                    <p className="text-gray-600">
                      Your location is being shared with commuters
                    </p>
                  </div>
                  <button
                    onClick={handleStopTracking}
                    className="px-8 py-4 bg-red-600 text-white rounded-lg font-semibold text-lg hover:bg-red-700 transition shadow-lg"
                  >
                    ⏸️ Stop Tracking
                  </button>
                </div>
              )}
            </div>

            {/* Passenger Count Control */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Passenger Count
              </h3>

              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-indigo-600 mb-2">
                  {passengerCount}
                </div>
                <p className="text-gray-600">
                  out of {maxPassengers} seats
                </p>

                {/* Seat Visual Indicator */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        passengerCount === maxPassengers
                          ? "bg-red-500"
                          : passengerCount > maxPassengers * 0.75
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{
                        width: `${(passengerCount / maxPassengers) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {maxPassengers - passengerCount} seats available
                  </p>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={decrementPassengers}
                  disabled={passengerCount === 0}
                  className={`w-20 h-20 rounded-full text-3xl font-bold transition shadow-md ${
                    passengerCount === 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-red-500 text-white hover:bg-red-600 active:scale-95"
                  }`}
                >
                  −
                </button>
                <button
                  onClick={incrementPassengers}
                  disabled={passengerCount === maxPassengers}
                  className={`w-20 h-20 rounded-full text-3xl font-bold transition shadow-md ${
                    passengerCount === maxPassengers
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-green-500 text-white hover:bg-green-600 active:scale-95"
                  }`}
                >
                  +
                </button>
              </div>

              <p className="text-center text-sm text-gray-500 mt-4">
                Update passenger count as they board or alight
              </p>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition text-left">
                  <div className="text-2xl mb-2">🚨</div>
                  <p className="font-semibold text-gray-900">Report Issue</p>
                  <p className="text-xs text-gray-600">Traffic, breakdown, etc.</p>
                </button>
                <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition text-left">
                  <div className="text-2xl mb-2">💬</div>
                  <p className="font-semibold text-gray-900">Contact Admin</p>
                  <p className="text-xs text-gray-600">Get help or support</p>
                </button>
                <button className="p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition text-left">
                  <div className="text-2xl mb-2">🔧</div>
                  <p className="font-semibold text-gray-900">Maintenance</p>
                  <p className="text-xs text-gray-600">Schedule service</p>
                </button>
                <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition text-left">
                  <div className="text-2xl mb-2">📊</div>
                  <p className="font-semibold text-gray-900">View Stats</p>
                  <p className="text-xs text-gray-600">Your performance</p>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar - Info */}
          <div className="space-y-6">
            {/* Jeepney Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Your Jeepney
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Plate Number</p>
                  <p className="text-lg font-bold text-gray-900">
                    {driverInfo.jeepneyPlate}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Assigned Route</p>
                  <p className="text-base font-semibold text-indigo-600">
                    {driverInfo.route}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Capacity</p>
                  <p className="text-base font-medium text-gray-900">
                    {maxPassengers} passengers
                  </p>
                </div>
              </div>
            </div>

            {/* Today's Stats */}
            <div className="bg-gradient-to-br from-red-900 to-amber-600 text-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold mb-4">Today's Stats</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-amber-100 text-sm">Hours Online</p>
                  <p className="text-2xl font-bold">6.5 hrs</p>
                </div>
                <div>
                  <p className="text-amber-100 text-sm">Total Passengers</p>
                  <p className="text-2xl font-bold">127</p>
                </div>
                <div>
                  <p className="text-amber-100 text-sm">Trips Completed</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </div>

            {/* Tips & Reminders */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex gap-3">
                <div className="text-2xl">💡</div>
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-1">
                    Remember
                  </h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Keep tracking active during trips</li>
                    <li>• Update passenger count regularly</li>
                    <li>• Follow your assigned route</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
