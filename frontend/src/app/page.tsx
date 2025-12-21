import Link from "next/link";

/**
 * Landing / Home Page
 * Route: /
 * 
 * Purpose:
 * - Entry point for all users
 * - Brief explanation of the Jeepney Tracker System
 * - Call-to-action buttons for different user types
 * 
 * User Access: Public (no authentication required)
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-indigo-600">
              🚌 Cebu Jeepney Tracker
            </h1>
            <nav className="flex gap-2 sm:gap-4">
              <Link 
                href="/commuter" 
                className="text-sm sm:text-base text-gray-600 hover:text-indigo-600 transition"
              >
                <span className="hidden sm:inline">Track Jeepneys</span>
                <span className="sm:hidden">Track</span>
              </Link>
              <Link 
                href="/auth/login" 
                className="text-sm sm:text-base text-gray-600 hover:text-indigo-600 transition"
              >
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6">
            Track Jeepneys in Real-Time
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
            Find your jeepney, check availability, and plan your commute with ease.
            Live tracking for commuters in Cebu City.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full max-w-md mx-auto sm:max-w-none">
            <Link 
              href="/commuter"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-indigo-600 text-white rounded-lg font-semibold text-base sm:text-lg hover:bg-indigo-700 transition shadow-lg hover:shadow-xl text-center"
            >
              🗺️ Track Jeepneys Now
            </Link>
            <Link 
              href="/auth/login"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-600 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-50 transition border-2 border-indigo-600 text-center"
            >
              🔐 Admin / Driver Login
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-4xl mb-4">🗺️</div>
            <h3 className="text-xl font-semibold mb-2">Live Map View</h3>
            <p className="text-gray-600">
              See all active jeepneys on Google Maps in real-time with route overlays
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-4xl mb-4">💺</div>
            <h3 className="text-xl font-semibold mb-2">Seat Availability</h3>
            <p className="text-gray-600">
              Check how many seats are available before boarding
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-4xl mb-4">⏱️</div>
            <h3 className="text-xl font-semibold mb-2">ETA Updates</h3>
            <p className="text-gray-600">
              Get estimated arrival times for jeepneys on your route
            </p>
          </div>
        </div>

        {/* City Selection (Optional for MVP) */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            Currently serving: <span className="font-semibold text-indigo-600">Cebu City</span>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-500">
          <p>&copy; 2025 Cebu Jeepney Tracker System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
