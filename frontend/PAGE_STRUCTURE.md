# Cebu Jeepney Tracker System - Frontend Page Structure

## 📋 Overview

This document outlines the complete page structure and routing for the Cebu Jeepney Tracker System frontend, built with Next.js App Router.

---

## 🗺️ Page Structure & Routes

### 1️⃣ Landing / Home Page
**Route:** `/`  
**File:** `src/app/page.tsx`  
**User Access:** Public (no authentication)

**Purpose:**
- Entry point for all users
- Brief explanation of the Jeepney Tracker System
- Call-to-action buttons for different user types

**Contains:**
- Header with navigation
- Hero section with system description
- CTA buttons:
  - "Track Jeepneys Now" → `/commuter`
  - "Admin / Driver Login" → `/auth/login`
- Features showcase (Live Map, Seat Availability, ETA)
- City selection indicator (Cebu City)
- Footer

---

### 2️⃣ Commuter Dashboard (Main Page)
**Route:** `/commuter`  
**File:** `src/app/commuter/page.tsx`  
**User Access:** Commuter (no login required for MVP)

**Purpose:**
- Main page for commuters to view live jeepney data
- Display Google Map with jeepney routes and live markers
- Show seat availability indicators

**Contains:**
- Google Map view (full-screen prominent section)
- Sidebar with controls:
  - Optional destination input
  - "Browse All Routes" button
  - Map legend (seat availability colors)
  - Active jeepneys summary
- Real-time jeepney markers
- Route overlays
- Seat availability indicators

---

### 3️⃣ Route Selection Page
**Route:** `/commuter/routes`  
**File:** `src/app/commuter/routes/page.tsx`  
**User Access:** Commuter (no login required)

**Purpose:**
- Allow commuters to browse and select from available jeepney routes
- Display comprehensive route information

**Contains:**
- List/grid of all available routes
- For each route:
  - Route name (e.g., "IT Park → Colon")
  - Start and end points
  - Number of active jeepneys
  - Estimated travel time
  - Fare information
  - Live tracking status indicator
  - "View on Map" button
- Search/filter functionality
- System overview statistics

---

### 4️⃣ Jeepney Details Page
**Route:** `/commuter/jeepney/[id]`  
**File:** `src/app/commuter/jeepney/[id]/page.tsx`  
**User Access:** Commuter (no login required)

**Purpose:**
- Display detailed information about a specific jeepney
- Allow tracking of a specific vehicle

**Contains:**
- Jeepney identification:
  - Plate number
  - Assigned route
  - Current location
  - Current speed
- Seat availability:
  - Visual indicator
  - Progress bar
  - Available seats count
  - Status badge (Available/Limited/Full)
- ETA information
- Live tracking map with:
  - Jeepney position marker
  - Complete route polyline
  - User location (if enabled)
- Action buttons:
  - Enable location sharing
  - View all jeepneys

---

### 5️⃣ Authentication Page
**Route:** `/auth/login`  
**File:** `src/app/auth/login/page.tsx`  
**User Access:** Public (unauthenticated users)

**Purpose:**
- Login page for drivers and admins
- Role-based authentication and redirection

**Contains:**
- Role selection (Driver / Admin)
- Email input field
- Password input field
- Remember me checkbox
- Forgot password link
- Sign in button
- Link to commuter page (no login required)
- Demo credentials (for testing)

**Role-based Redirection:**
- Driver → `/driver`
- Admin → `/admin`

---

### 6️⃣ Driver Dashboard
**Route:** `/driver`  
**File:** `src/app/driver/page.tsx`  
**User Access:** Driver (authenticated)

**Purpose:**
- Allow drivers to manage their jeepney status and operations
- Update passenger count and tracking status

**Contains:**
- Status indicator (Online/Offline)
- Tracking control:
  - Start/Stop tracking button
  - Live tracking status
- Passenger count controls:
  - Current count display (large)
  - Increment (+) button
  - Decrement (−) button
  - Visual seat availability indicator
  - Available seats display
- Quick actions:
  - Report issue
  - Contact admin
  - Schedule maintenance
  - View stats
- Jeepney information sidebar:
  - Plate number
  - Assigned route
  - Capacity
- Today's statistics:
  - Hours online
  - Total passengers
  - Trips completed
- Tips & reminders

---

### 7️⃣ Admin Dashboard
**Route:** `/admin`  
**File:** `src/app/admin/page.tsx`  
**User Access:** Admin (authenticated)

**Purpose:**
- System overview and monitoring
- Navigation hub to management pages

**Contains:**
- Overview cards:
  - Active jeepneys (e.g., 41/65)
  - Active routes (e.g., 8/12)
  - Online drivers (e.g., 41/65)
  - Today's passengers (e.g., 3,247)
- Management navigation cards:
  - Route Management → `/admin/routes`
  - Jeepney Management → `/admin/jeepneys`
- Future features (placeholder cards):
  - Driver Management
  - Analytics
  - System Settings
- System health indicator
- Navigation menu:
  - Routes
  - Jeepneys
  - View Map
  - Logout

---

### 8️⃣ Route Management Page
**Route:** `/admin/routes`  
**File:** `src/app/admin/routes/page.tsx`  
**User Access:** Admin (authenticated)

**Purpose:**
- Manage all jeepney routes in the system
- Add, edit, view, and delete routes

**Contains:**
- "Add New Route" button
- List of all routes with details:
  - Route name
  - Status (Active/Inactive)
  - Start and end points
  - Distance
  - Estimated time
  - Fare
  - Active jeepneys count
  - Waypoints list
- Action buttons per route:
  - View on Map
  - Edit
  - Delete
- Map preview sidebar:
  - Shows selected route polyline
  - Route details display
- Route statistics:
  - Total routes
  - Active routes
  - Total active jeepneys

---

### 9️⃣ Jeepney Management Page
**Route:** `/admin/jeepneys`  
**File:** `src/app/admin/jeepneys/page.tsx`  
**User Access:** Admin (authenticated)

**Purpose:**
- Manage all jeepney units in the fleet
- Assign drivers and routes
- Control jeepney status

**Contains:**
- "Add New Jeepney" button
- Filter buttons:
  - All
  - Active
  - Inactive
  - Maintenance
- Search functionality (by plate number)
- Jeepney cards with information:
  - Plate number
  - Model
  - Status indicator (Active/Inactive/Maintenance)
  - Capacity
  - Mileage
  - Assigned driver
  - Assigned route
  - Last maintenance date
- Action buttons per jeepney:
  - Assign Driver
  - Assign Route
  - Activate/Deactivate toggle
  - Edit
  - Delete
- Summary statistics:
  - Active units
  - Inactive units
  - In maintenance
  - Total fleet

---

## 🎨 Design Patterns

### Color Scheme
- **Primary:** Indigo/Blue (`indigo-600`, `blue-500`)
- **Success/Active:** Green (`green-500`, `green-600`)
- **Warning:** Yellow (`yellow-500`)
- **Danger/Inactive:** Red/Gray (`red-500`, `gray-500`)
- **Maintenance:** Yellow (`yellow-500`)

### Status Indicators
- **🟢 Green:** Available seats (5+), Active, Online
- **🟡 Yellow:** Limited seats (1-4), Maintenance
- **🔴 Red:** Full, Inactive, Offline
- **⚫ Gray:** Offline, Not assigned

### Navigation Structure
```
/                           (Home)
├── /commuter               (Commuter Dashboard)
│   ├── /routes             (Route Selection)
│   └── /jeepney/[id]       (Jeepney Details)
├── /auth
│   └── /login              (Authentication)
├── /driver                 (Driver Dashboard)
└── /admin                  (Admin Dashboard)
    ├── /routes             (Route Management)
    └── /jeepneys           (Jeepney Management)
```

---

## 👥 User Role Access Summary

| Page | Commuter | Driver | Admin | Public |
|------|----------|--------|-------|--------|
| `/` (Home) | ✅ | ✅ | ✅ | ✅ |
| `/commuter` | ✅ | ✅ | ✅ | ✅ |
| `/commuter/routes` | ✅ | ✅ | ✅ | ✅ |
| `/commuter/jeepney/[id]` | ✅ | ✅ | ✅ | ✅ |
| `/auth/login` | ✅ | ✅ | ✅ | ✅ |
| `/driver` | ❌ | ✅ | ✅ | ❌ |
| `/admin` | ❌ | ❌ | ✅ | ❌ |
| `/admin/routes` | ❌ | ❌ | ✅ | ❌ |
| `/admin/jeepneys` | ❌ | ❌ | ✅ | ❌ |

---

## 🚀 Key Features per Page

### Public Pages (No Auth Required)
- **Home:** Marketing, CTAs, system overview
- **Commuter Dashboard:** Live map, real-time tracking
- **Route Selection:** Browse routes, view availability
- **Jeepney Details:** Individual jeepney tracking
- **Login:** Authentication gateway

### Driver Pages (Auth Required)
- **Driver Dashboard:** Tracking control, passenger management

### Admin Pages (Auth Required)
- **Admin Dashboard:** System monitoring, navigation hub
- **Route Management:** CRUD operations for routes
- **Jeepney Management:** Fleet management, assignments

---

## 📝 Implementation Notes

1. **Authentication:** 
   - Currently placeholder (alerts)
   - Needs backend integration
   - Should use NextAuth.js or similar

2. **Data Fetching:**
   - All data currently mocked
   - Needs backend API integration
   - Consider using React Query/SWR

3. **Google Maps:**
   - Placeholder divs currently
   - Needs Google Maps API integration
   - Consider `@react-google-maps/api`

4. **Real-time Updates:**
   - Needs WebSocket implementation
   - For live jeepney positions
   - For seat availability updates

5. **State Management:**
   - Currently using local useState
   - Consider Context API or Zustand for global state

6. **Protected Routes:**
   - Needs middleware implementation
   - Role-based access control
   - Redirect logic for unauthorized access

---

## ✅ Completed

- ✅ All 9 pages created with proper structure
- ✅ Next.js App Router file structure
- ✅ Responsive layouts
- ✅ Role-based page designs
- ✅ Comprehensive documentation
- ✅ Placeholder content for all features
- ✅ Navigation between pages
- ✅ Status indicators and visual feedback
- ✅ Consistent design system

---

## 🔜 Next Steps (Not Part of This Task)

1. Backend API integration
2. Google Maps implementation
3. Authentication system
4. Real-time WebSocket connection
5. Database queries
6. State management setup
7. Protected route middleware
8. Form validation
9. Error handling
10. Loading states

---

**Last Updated:** December 21, 2025
