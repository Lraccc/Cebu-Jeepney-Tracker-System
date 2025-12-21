import Link from "next/link";

/**
 * Jeepney Details Page
 * Route: /commuter/jeepney/[id]
 * 
 * Purpose:
 * - Display detailed information about a specific jeepney
 * - Show current location, seat availability, and ETA
 * - Allow commuters to track a specific vehicle
 * 
 * User Access: Commuter (no login required)
 * 
 * Contains:
 * - Jeepney identification (plate number, route assignment)
 * - Current real-time location
 * - Seat availability with visual indicator
 * - ETA to user's location (if location sharing enabled)
 * - Mini map showing jeepney position on route
 */

interface PageProps {
  params: {
    id: string;
  };
}

export default function JeepneyDetailsPage({ params }: PageProps) {
  const jeepneyId = params.id;

  // Placeholder data - will be fetched from backend based on jeepneyId
  const jeepney = {
    id: jeepneyId,
    plateNumber: "ABC-1234",
    route: "IT Park → Colon",
    driver: "Juan Dela Cruz",
    currentLocation: "Mango Avenue, near Ayala Center",
    seatsAvailable: 8,
    totalSeats: 16,
    status: "active", // active, offline, maintenance
    speed: 25, // km/h
    lastUpdated: "Just now",
    estimatedArrival: "5-7 minutes",
  };

  // Calculate seat availability percentage
  const seatPercentage = (jeepney.seatsAvailable / jeepney.totalSeats) * 100;
  
  // Determine status color
  const getStatusColor = () => {
    if (seatPercentage > 50) return "text-green-600";
    if (seatPercentage > 25) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusBg = () => {
    if (seatPercentage > 50) return "bg-green-100";
    if (seatPercentage > 25) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-indigo-600 hover:text-indigo-700">
              🚌 Cebu Jeepney Tracker
            </Link>
            <nav className="flex gap-4">
              <Link 
                href="/commuter" 
                className="px-4 py-2 text-gray-700 hover:text-indigo-600 transition"
              >
                Map View
              </Link>
              <Link 
                href="/commuter/routes" 
                className="px-4 py-2 text-gray-700 hover:text-indigo-600 transition"
              >
                Routes
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href="/commuter"
            className="inline-flex items-center text-red-900 hover:text-red-800 font-medium"
          >
            ← Back to Map
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Jeepney Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Main Info Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  Jeepney Details
                </h1>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-600">Live</span>
                </div>
              </div>

              <div className="space-y-4">
                {/* Plate Number */}
                <div>
                  <p className="text-sm text-gray-600 mb-1">Plate Number</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {jeepney.plateNumber}
                  </p>
                </div>

                {/* Route */}
                <div>
                  <p className="text-sm text-gray-600 mb-1">Route</p>
                  <p className="text-lg font-semibold text-red-900">
                    {jeepney.route}
                  </p>
                </div>

                {/* Current Location */}
                <div>
                  <p className="text-sm text-gray-600 mb-1">Current Location</p>
                  <p className="text-base text-gray-900">
                    📍 {jeepney.currentLocation}
                  </p>
                </div>

                {/* Speed */}
                <div>
                  <p className="text-sm text-gray-600 mb-1">Current Speed</p>
                  <p className="text-base text-gray-900">
                    🚗 {jeepney.speed} km/h
                  </p>
                </div>

                {/* Last Updated */}
                <div>
                  <p className="text-sm text-gray-600 mb-1">Last Updated</p>
                  <p className="text-base text-gray-900">
                    {jeepney.lastUpdated}
                  </p>
                </div>
              </div>
            </div>

            {/* Seat Availability Card */}
            <div className={`bg-white rounded-lg shadow-md p-6 border-2 ${
              seatPercentage > 50 ? 'border-green-200' :
              seatPercentage > 25 ? 'border-yellow-200' : 'border-red-200'
            }`}>
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Seat Availability
              </h2>

              {/* Visual Seat Indicator */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-3xl font-bold ${getStatusColor()}`}>
                    {jeepney.seatsAvailable}
                  </span>
                  <span className="text-gray-600">
                    / {jeepney.totalSeats} seats
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      seatPercentage > 50 ? 'bg-green-500' :
                      seatPercentage > 25 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${seatPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Status Badge */}
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusBg()} ${getStatusColor()}`}>
                {seatPercentage > 50 ? '✓ Available' :
                 seatPercentage > 25 ? '⚠ Limited Seats' : '✗ Nearly Full'}
              </div>
            </div>

            {/* ETA Card */}
            <div className="bg-amber-50 rounded-lg shadow-md p-6 border-2 border-amber-200">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Estimated Arrival
              </h2>
              <p className="text-3xl font-bold text-amber-600 mb-2">
                {jeepney.estimatedArrival}
              </p>
              <p className="text-sm text-gray-600">
                Based on current location and traffic
              </p>
            </div>
          </div>

          {/* Right Column - Map View */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Map Header */}
              <div className="bg-gray-100 px-6 py-4 border-b">
                <h2 className="text-xl font-bold text-gray-900">
                  Live Tracking
                </h2>
                <p className="text-sm text-gray-600">
                  Real-time position on route
                </p>
              </div>

              {/* Map Placeholder */}
              <div className="h-[600px] bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">
                    Google Map View
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Showing jeepney {jeepney.plateNumber} on {jeepney.route}
                  </p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <p>• Jeepney position marker</p>
                    <p>• Complete route polyline</p>
                    <p>• Your location (if enabled)</p>
                    <p>• ETA calculation</p>
                  </div>
                </div>
              </div>

              {/* Map Footer - Actions */}
              <div className="bg-gray-50 px-6 py-4 border-t">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 px-6 py-3 bg-red-900 text-white rounded-lg font-medium hover:bg-red-800 transition">
                    📍 Enable Location Sharing
                  </button>
                  <Link 
                    href={`/commuter?highlight=${jeepneyId}`}
                    className="flex-1 px-6 py-3 bg-amber-500 text-white border-2 border-amber-500 rounded-lg font-medium hover:bg-amber-600 transition text-center"
                  >
                    🗺️ View All Jeepneys
                  </Link>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-3">
                <div className="text-2xl">💡</div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">
                    Tip: Enable location for accurate ETA
                  </h3>
                  <p className="text-sm text-blue-800">
                    Allow location access to see how far the jeepney is from your current position.
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
