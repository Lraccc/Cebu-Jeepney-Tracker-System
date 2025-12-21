"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * Jeepney Management Page
 * Route: /admin/jeepneys
 * 
 * Purpose:
 * - Manage all jeepney units in the fleet
 * - Assign drivers and routes to jeepneys
 * - Activate/deactivate jeepney units
 * - View jeepney status and details
 * 
 * User Access: Admin (authenticated)
 * 
 * Contains:
 * - List of all jeepney units
 * - Add new jeepney button
 * - Assign driver functionality
 * - Assign route functionality
 * - Activate/deactivate toggle
 * - Edit/View/Delete actions
 * - Status indicators (Active, Inactive, Maintenance)
 */
export default function JeepneyManagementPage() {
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Mock data - would come from backend
  const jeepneys = [
    {
      id: 1,
      plateNumber: "ABC-1234",
      model: "Toyota Tamaraw FX",
      capacity: 16,
      driver: "Juan Dela Cruz",
      route: "IT Park → Colon",
      status: "active",
      lastMaintenance: "2025-12-01",
      mileage: "45,230 km",
    },
    {
      id: 2,
      plateNumber: "XYZ-5678",
      model: "Mitsubishi L300",
      capacity: 16,
      driver: "Maria Santos",
      route: "SM City → Ayala Center",
      status: "active",
      lastMaintenance: "2025-11-28",
      mileage: "38,120 km",
    },
    {
      id: 3,
      plateNumber: "DEF-9012",
      model: "Isuzu Elf",
      capacity: 18,
      driver: "Pedro Garcia",
      route: "Carbon Market → Lahug",
      status: "active",
      lastMaintenance: "2025-12-05",
      mileage: "52,340 km",
    },
    {
      id: 4,
      plateNumber: "GHI-3456",
      model: "Toyota Tamaraw FX",
      capacity: 16,
      driver: null,
      route: null,
      status: "inactive",
      lastMaintenance: "2025-11-15",
      mileage: "67,890 km",
    },
    {
      id: 5,
      plateNumber: "JKL-7890",
      model: "Mitsubishi L300",
      capacity: 16,
      driver: "Rosa Mendoza",
      route: null,
      status: "maintenance",
      lastMaintenance: "2025-12-18",
      mileage: "41,560 km",
    },
  ];

  const filteredJeepneys = jeepneys.filter((j) =>
    filterStatus === "all" ? true : j.status === filterStatus
  );

  const handleAddJeepney = () => {
    alert("Add Jeepney functionality - to be implemented");
  };

  const handleAssignDriver = (jeepneyId: number) => {
    alert(`Assign Driver to Jeepney ${jeepneyId} - to be implemented`);
  };

  const handleAssignRoute = (jeepneyId: number) => {
    alert(`Assign Route to Jeepney ${jeepneyId} - to be implemented`);
  };

  const handleToggleStatus = (jeepneyId: number, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    alert(`Change Jeepney ${jeepneyId} status to ${newStatus} - to be implemented`);
  };

  const handleEdit = (jeepneyId: number) => {
    alert(`Edit Jeepney ${jeepneyId} - to be implemented`);
  };

  const handleDelete = (jeepneyId: number) => {
    if (confirm("Are you sure you want to delete this jeepney?")) {
      alert(`Delete Jeepney ${jeepneyId} - to be implemented`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "inactive":
        return "bg-gray-100 text-gray-700";
      case "maintenance":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return "🟢";
      case "inactive":
        return "⚫";
      case "maintenance":
        return "🔧";
      default:
        return "⚪";
    }
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
                className="text-sm text-gray-600 hover:text-indigo-600 mb-1 inline-block"
              >
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-indigo-600">
                Jeepney Management
              </h1>
            </div>
            <button
              onClick={handleAddJeepney}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              ➕ Add New Jeepney
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Stats */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterStatus === "all"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All ({jeepneys.length})
              </button>
              <button
                onClick={() => setFilterStatus("active")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterStatus === "active"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Active ({jeepneys.filter((j) => j.status === "active").length})
              </button>
              <button
                onClick={() => setFilterStatus("inactive")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterStatus === "inactive"
                    ? "bg-gray-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Inactive ({jeepneys.filter((j) => j.status === "inactive").length})
              </button>
              <button
                onClick={() => setFilterStatus("maintenance")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterStatus === "maintenance"
                    ? "bg-yellow-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Maintenance ({jeepneys.filter((j) => j.status === "maintenance").length})
              </button>
            </div>

            {/* Search */}
            <input
              type="text"
              placeholder="Search by plate number..."
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Jeepney Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJeepneys.map((jeepney) => (
            <div
              key={jeepney.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">
                      {jeepney.plateNumber}
                    </h3>
                    <p className="text-indigo-100 text-sm">{jeepney.model}</p>
                  </div>
                  <span className="text-3xl">{getStatusIcon(jeepney.status)}</span>
                </div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                    jeepney.status
                  )}`}
                >
                  {jeepney.status.charAt(0).toUpperCase() + jeepney.status.slice(1)}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Capacity</p>
                    <p className="font-semibold text-gray-900">
                      {jeepney.capacity} passengers
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Mileage</p>
                    <p className="font-semibold text-gray-900">{jeepney.mileage}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Assigned Driver</p>
                    <p className="font-semibold text-gray-900">
                      {jeepney.driver || (
                        <span className="text-gray-400 italic">Not assigned</span>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Assigned Route</p>
                    <p className="font-semibold text-gray-900">
                      {jeepney.route || (
                        <span className="text-gray-400 italic">Not assigned</span>
                      )}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600 mb-1">Last Maintenance</p>
                    <p className="font-semibold text-gray-900">
                      {jeepney.lastMaintenance}
                    </p>
                  </div>
                </div>

                {/* Assignment Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    onClick={() => handleAssignDriver(jeepney.id)}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition text-sm"
                  >
                    👨‍✈️ Assign Driver
                  </button>
                  <button
                    onClick={() => handleAssignRoute(jeepney.id)}
                    className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg font-medium hover:bg-purple-100 transition text-sm"
                  >
                    🛣️ Assign Route
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleStatus(jeepney.id, jeepney.status)}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition text-sm ${
                      jeepney.status === "active"
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    {jeepney.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => handleEdit(jeepney.id)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition text-sm"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(jeepney.id)}
                    className="px-4 py-2 bg-gray-100 text-red-600 rounded-lg font-medium hover:bg-red-50 transition text-sm"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredJeepneys.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🚌</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No jeepneys found
            </h3>
            <p className="text-gray-600 mb-6">
              No jeepneys match the selected filter.
            </p>
            <button
              onClick={() => setFilterStatus("all")}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              View All Jeepneys
            </button>
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6">
            <p className="text-green-100 text-sm mb-1">Active Units</p>
            <p className="text-3xl font-bold">
              {jeepneys.filter((j) => j.status === "active").length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-500 to-gray-600 text-white rounded-lg p-6">
            <p className="text-gray-100 text-sm mb-1">Inactive Units</p>
            <p className="text-3xl font-bold">
              {jeepneys.filter((j) => j.status === "inactive").length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-lg p-6">
            <p className="text-yellow-100 text-sm mb-1">In Maintenance</p>
            <p className="text-3xl font-bold">
              {jeepneys.filter((j) => j.status === "maintenance").length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6">
            <p className="text-blue-100 text-sm mb-1">Total Fleet</p>
            <p className="text-3xl font-bold">{jeepneys.length}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
