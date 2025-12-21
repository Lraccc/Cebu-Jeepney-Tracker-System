"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * Authentication Page
 * Route: /auth/login
 * 
 * Purpose:
 * - Login page for drivers and admins
 * - Role-based authentication and redirection
 * 
 * User Access: Public (unauthenticated users)
 * 
 * Contains:
 * - Email/password input form
 * - Role selection or auto-detection
 * - Role-based redirection:
 *   - Driver → /driver
 *   - Admin → /admin
 * - Error handling for invalid credentials
 */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"driver" | "admin">("driver");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // TODO: Implement actual authentication logic with backend
    // For now, this is a placeholder
    console.log("Login attempt:", { email, role });

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Mock success - redirect based on role
      // In production, this would use actual authentication and routing
      alert(`Login successful as ${role}! (This is a placeholder)`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-red-50 flex items-center justify-center px-4">
      {/* Back to Home Link */}
      <Link 
        href="/"
        className="absolute top-6 left-6 flex items-center text-gray-600 hover:text-red-900 transition"
      >
        ← Back to Home
      </Link>

      {/* Login Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🔐</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              I am a:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("driver")}
                className={`py-3 px-4 rounded-lg font-medium transition ${
                  role === "driver"
                    ? "bg-red-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                🚗 Driver
              </button>
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`py-3 px-4 rounded-lg font-medium transition ${
                  role === "admin"
                    ? "bg-red-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                👤 Admin
              </button>
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900 transition"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900 transition"
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-red-900 focus:ring-red-900"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <button
              type="button"
              className="text-sm text-red-900 hover:text-red-800 font-medium"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-900 hover:bg-red-800"
            }`}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Commuter?{" "}
            <Link href="/commuter" className="text-red-900 hover:text-red-800 font-medium">
              No login required →
            </Link>
          </p>
        </div>

        {/* Demo Credentials (Remove in production) */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs font-semibold text-yellow-800 mb-2">
            Demo Credentials (For Testing)
          </p>
          <div className="space-y-1 text-xs text-yellow-700">
            <p>Driver: driver@example.com / password123</p>
            <p>Admin: admin@example.com / password123</p>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="absolute bottom-6 left-6 right-6 max-w-4xl mx-auto hidden lg:block">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/80 backdrop-blur rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-800 mb-1">
              👨‍✈️ For Drivers
            </p>
            <p className="text-xs text-gray-600">
              Update jeepney status, manage passengers, and track your route
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-800 mb-1">
              🛠️ For Admins
            </p>
            <p className="text-xs text-gray-600">
              Manage routes, jeepneys, drivers, and monitor system activity
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
