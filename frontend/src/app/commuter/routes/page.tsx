import Link from "next/link";

/**
 * Route Selection Page
 * Route: /commuter/routes
 * 
 * Purpose:
 * - Allow commuters to browse and select from available jeepney routes
 * - Display route information including name, active jeepneys, and endpoints
 * - Provide "View on Map" action for each route
 * 
 * User Access: Commuter (no login required)
 * 
 * Contains:
 * - List/grid of all available routes
 * - Route name (e.g., "IT Park → Colon")
 * - Number of active jeepneys per route
 * - "View on Map" button to navigate back to map with route selected
 */
export default function RouteSelectionPage() {
  // Placeholder data - will be fetched from backend
  const routes = [
    {
      id: 1,
      name: "IT Park → Colon",
      startPoint: "IT Park",
      endPoint: "Colon Street",
      activeJeepneys: 12,
      estimatedTime: "25-30 min",
      fare: "₱13",
    },
    {
      id: 2,
      name: "SM City → Ayala Center",
      startPoint: "SM City Cebu",
      endPoint: "Ayala Center",
      activeJeepneys: 8,
      estimatedTime: "20-25 min",
      fare: "₱11",
    },
    {
      id: 3,
      name: "Carbon Market → Lahug",
      startPoint: "Carbon Market",
      endPoint: "Lahug",
      activeJeepneys: 6,
      estimatedTime: "30-35 min",
      fare: "₱13",
    },
    {
      id: 4,
      name: "Mandaue → Colon",
      startPoint: "Mandaue City",
      endPoint: "Colon Street",
      activeJeepneys: 10,
      estimatedTime: "35-40 min",
      fare: "₱15",
    },
    {
      id: 5,
      name: "Talamban → Downtown",
      startPoint: "Talamban",
      endPoint: "Downtown Cebu",
      activeJeepneys: 5,
      estimatedTime: "40-45 min",
      fare: "₱15",
    },
    {
      id: 6,
      name: "Bulacao → SM Seaside",
      startPoint: "Bulacao",
      endPoint: "SM Seaside City",
      activeJeepneys: 0,
      estimatedTime: "25-30 min",
      fare: "₱13",
    },
  ];

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
                href="/commuter" 
                className="px-2 sm:px-4 py-2 text-sm sm:text-base text-gray-700 hover:text-red-900 transition"
              >
                <span className="hidden sm:inline">Map View</span>
                <span className="sm:hidden">Map</span>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Available Jeepney Routes
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Select a route to view active jeepneys and track them in real-time
          </p>
        </div>

        {/* Search/Filter (Optional for MVP) */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search routes by name or location..."
            className="w-full max-w-md px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900"
          />
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route) => (
            <div
              key={route.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6"
            >
              {/* Route Header */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {route.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>📍 {route.startPoint}</span>
                  <span>→</span>
                  <span>📍 {route.endPoint}</span>
                </div>
              </div>

              {/* Route Info */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Jeepneys:</span>
                  <span className={`font-semibold ${
                    route.activeJeepneys > 0 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {route.activeJeepneys > 0 
                      ? `${route.activeJeepneys} active` 
                      : 'None active'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Est. Time:</span>
                  <span className="font-medium text-gray-900">
                    {route.estimatedTime}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Fare:</span>
                  <span className="font-medium text-gray-900">
                    {route.fare}
                  </span>
                </div>
              </div>

              {/* Status Indicator */}
              {route.activeJeepneys > 0 && (
                <div className="flex items-center gap-2 mb-4 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-700 font-medium">Live tracking available</span>
                </div>
              )}

              {/* Action Button */}
              <Link
                href={`/commuter?route=${route.id}`}
                className={`block w-full py-2 px-4 rounded-lg text-center font-medium transition ${
                  route.activeJeepneys > 0
                    ? 'bg-red-900 text-white hover:bg-red-800'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {route.activeJeepneys > 0 
                  ? '🗺️ View on Map' 
                  : 'No Jeepneys Available'}
              </Link>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            System Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-900 mb-1">
                {routes.length}
              </div>
              <div className="text-sm text-gray-600">Total Routes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-1">
                {routes.reduce((sum, r) => sum + r.activeJeepneys, 0)}
              </div>
              <div className="text-sm text-gray-600">Active Jeepneys</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-800 mb-1">
                {routes.filter(r => r.activeJeepneys > 0).length}
              </div>
              <div className="text-sm text-gray-600">Routes with Service</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
