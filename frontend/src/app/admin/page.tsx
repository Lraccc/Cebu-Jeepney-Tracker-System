import Link from "next/link";

/**
 * Admin Dashboard
 * Route: /admin
 * 
 * Purpose:
 * - System overview and monitoring for administrators
 * - Display key metrics and statistics
 * - Navigation hub to management pages
 * 
 * User Access: Admin (authenticated)
 * 
 * Contains:
 * - Overview cards (Active jeepneys, Active routes, Online drivers, etc.)
 * - Quick stats and system health indicators
 * - Navigation links to:
 *   - Route Management (/admin/routes)
 *   - Jeepney Management (/admin/jeepneys)
 *   - Driver Management (future)
 *   - System Settings (future)
 */
export default function AdminDashboard() {
  // Mock data - would come from backend in production
  const stats = {
    activeJeepneys: 41,
    totalJeepneys: 65,
    activeRoutes: 8,
    totalRoutes: 12,
    onlineDrivers: 41,
    totalDrivers: 65,
    todayPassengers: 3247,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-red-900">
              🛠️ Admin Dashboard
            </h1>
            <nav className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 w-full sm:w-auto">
              <Link 
                href="/admin/routes" 
                className="px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm md:text-base text-gray-700 hover:text-red-900 transition"
              >
                Routes
              </Link>
              <Link 
                href="/admin/jeepneys" 
                className="px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm md:text-base text-gray-700 hover:text-red-900 transition"
              >
                Jeepneys
              </Link>
              <Link 
                href="/commuter" 
                className="px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm md:text-base text-gray-700 hover:text-red-900 transition hidden md:inline"
              >
                View Map
              </Link>
              <button className="px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm md:text-base text-gray-700 hover:text-red-600 transition">
                Logout
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            System Overview
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Monitor and manage the Jeepney Tracker System
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Active Jeepneys */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-medium">
                Active Jeepneys
              </h3>
              <div className="text-2xl">🚌</div>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-gray-900">
                {stats.activeJeepneys}
              </p>
              <p className="text-sm text-gray-500">/ {stats.totalJeepneys}</p>
            </div>
            <div className="mt-2 flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-xs text-green-600 font-medium">Live now</p>
            </div>
          </div>

          {/* Active Routes */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-medium">
                Active Routes
              </h3>
              <div className="text-2xl">🛣️</div>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-gray-900">
                {stats.activeRoutes}
              </p>
              <p className="text-sm text-gray-500">/ {stats.totalRoutes}</p>
            </div>
            <div className="mt-2">
              <p className="text-xs text-gray-600">
                {stats.totalRoutes - stats.activeRoutes} inactive
              </p>
            </div>
          </div>

          {/* Online Drivers */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-medium">
                Online Drivers
              </h3>
              <div className="text-2xl">👨‍✈️</div>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-gray-900">
                {stats.onlineDrivers}
              </p>
              <p className="text-sm text-gray-500">/ {stats.totalDrivers}</p>
            </div>
            <div className="mt-2">
              <p className="text-xs text-gray-600">
                {((stats.onlineDrivers / stats.totalDrivers) * 100).toFixed(0)}% online rate
              </p>
            </div>
          </div>

          {/* Today's Passengers */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-medium">
                Today's Passengers
              </h3>
              <div className="text-2xl">👥</div>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {stats.todayPassengers.toLocaleString()}
            </p>
            <div className="mt-2">
              <p className="text-xs text-green-600 font-medium">
                ↑ 12% from yesterday
              </p>
            </div>
          </div>
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Route Management */}
          <Link
            href="/admin/routes"
            className="bg-gradient-to-br from-red-900 to-red-800 text-white rounded-lg shadow-lg p-8 hover:shadow-xl transition group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold mb-2">Route Management</h3>
                <p className="text-red-100">
                  Manage jeepney routes, waypoints, and route assignments
                </p>
              </div>
              <div className="text-5xl group-hover:scale-110 transition">
                🛣️
              </div>
            </div>
            <div className="flex items-center gap-2 text-red-100 font-medium">
              <span>Manage Routes</span>
              <span>→</span>
            </div>
          </Link>

          {/* Jeepney Management */}
          <Link
            href="/admin/jeepneys"
            className="bg-gradient-to-br from-amber-600 to-amber-700 text-white rounded-lg shadow-lg p-8 hover:shadow-xl transition group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold mb-2">Jeepney Management</h3>
                <p className="text-amber-100">
                  Manage jeepney units, assign drivers, and control fleet status
                </p>
              </div>
              <div className="text-5xl group-hover:scale-110 transition">
                🚌
              </div>
            </div>
            <div className="flex items-center gap-2 text-amber-100 font-medium">
              <span>Manage Jeepneys</span>
              <span>→</span>
            </div>
          </Link>
        </div>

        {/* Additional Management Options (Future) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 opacity-60">
            <div className="text-4xl mb-3">👨‍✈️</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Driver Management
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Manage driver accounts and assignments
            </p>
            <p className="text-xs text-gray-500 italic">Coming soon</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 opacity-60">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Analytics
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              View detailed system analytics and reports
            </p>
            <p className="text-xs text-gray-500 italic">Coming soon</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 opacity-60">
            <div className="text-4xl mb-3">⚙️</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              System Settings
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Configure system parameters and preferences
            </p>
            <p className="text-xs text-gray-500 italic">Coming soon</p>
          </div>
        </div>

        {/* System Health Indicator */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl">✅</div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-green-900 mb-1">
                System Status: All Systems Operational
              </h3>
              <p className="text-sm text-green-700">
                All services are running normally. Last checked: Just now
              </p>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium">
              View Details
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
