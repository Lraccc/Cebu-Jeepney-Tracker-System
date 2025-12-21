# Quick Reference - Routing Guide

## 🗺️ URL Structure

```
┌─────────────────────────────────────────────────────────┐
│                    PUBLIC ROUTES                         │
├─────────────────────────────────────────────────────────┤
│ /                          → Landing Page               │
│ /commuter                  → Commuter Dashboard         │
│ /commuter/routes           → Route Selection            │
│ /commuter/jeepney/[id]     → Jeepney Details            │
│ /auth/login                → Login Page                 │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  AUTHENTICATED ROUTES                    │
├─────────────────────────────────────────────────────────┤
│ DRIVER ONLY:                                            │
│ /driver                    → Driver Dashboard           │
│                                                         │
│ ADMIN ONLY:                                             │
│ /admin                     → Admin Dashboard            │
│ /admin/routes              → Route Management           │
│ /admin/jeepneys            → Jeepney Management         │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 File Structure

```
src/app/
├── page.tsx                          → /
├── layout.tsx                        → Root layout
├── globals.css                       → Global styles
│
├── commuter/
│   ├── page.tsx                      → /commuter
│   ├── routes/
│   │   └── page.tsx                  → /commuter/routes
│   └── jeepney/
│       └── [id]/
│           └── page.tsx              → /commuter/jeepney/[id]
│
├── auth/
│   └── login/
│       └── page.tsx                  → /auth/login
│
├── driver/
│   └── page.tsx                      → /driver
│
└── admin/
    ├── page.tsx                      → /admin
    ├── routes/
    │   └── page.tsx                  → /admin/routes
    └── jeepneys/
        └── page.tsx                  → /admin/jeepneys
```

---

## 🔀 Navigation Flow

### For Commuters
```
Landing (/)
    ↓
    ├──→ Commuter Dashboard (/commuter)
    │        ↓
    │        ├──→ Route Selection (/commuter/routes)
    │        │        ↓
    │        │        └──→ Back to Commuter Dashboard
    │        │
    │        └──→ Jeepney Details (/commuter/jeepney/[id])
    │                 ↓
    │                 └──→ Back to Commuter Dashboard
    │
    └──→ Login (/auth/login)
```

### For Drivers
```
Landing (/)
    ↓
Login (/auth/login)
    ↓
Driver Dashboard (/driver)
    ↓
[Manage jeepney status, passengers]
```

### For Admins
```
Landing (/)
    ↓
Login (/auth/login)
    ↓
Admin Dashboard (/admin)
    ↓
    ├──→ Route Management (/admin/routes)
    │        ↓
    │        └──→ Back to Admin Dashboard
    │
    └──→ Jeepney Management (/admin/jeepneys)
             ↓
             └──→ Back to Admin Dashboard
```

---

## 🎯 Quick Access Links

### In Headers/Navigation

**Public Header** (Landing, Commuter pages):
- Logo → `/`
- "Track Jeepneys" → `/commuter`
- "View Routes" → `/commuter/routes`
- "Login" → `/auth/login`

**Driver Header**:
- Logo → `/driver`
- "Logout" → `/auth/login`

**Admin Header**:
- Logo → `/admin`
- "Routes" → `/admin/routes`
- "Jeepneys" → `/admin/jeepneys`
- "View Map" → `/commuter`
- "Logout" → `/auth/login`

---

## 💡 Implementation Examples

### Linking Between Pages

```tsx
import Link from "next/link";

// Static route
<Link href="/commuter">Track Jeepneys</Link>

// Dynamic route
<Link href={`/commuter/jeepney/${jeepneyId}`}>View Details</Link>

// With query params
<Link href="/commuter?route=1">View Route 1</Link>

// With hash
<Link href="/commuter#map">Go to Map</Link>
```

### Programmatic Navigation

```tsx
import { useRouter } from "next/navigation";

const router = useRouter();

// Navigate to page
router.push("/driver");

// Navigate with replace (no history)
router.replace("/admin");

// Go back
router.back();

// Refresh
router.refresh();
```

### Dynamic Routes

```tsx
// In /commuter/jeepney/[id]/page.tsx
interface PageProps {
  params: {
    id: string;
  };
}

export default function JeepneyDetailsPage({ params }: PageProps) {
  const jeepneyId = params.id; // Access the dynamic segment
  // ...
}
```

---

## 🔐 Authentication Redirects

```tsx
// After successful login
if (role === "driver") {
  router.push("/driver");
} else if (role === "admin") {
  router.push("/admin");
}

// Unauthorized access
if (!isAuthenticated && isProtectedRoute) {
  router.push("/auth/login");
}
```

---

## ✅ Checklist for Each Page

- [ ] Page component created
- [ ] Route documented
- [ ] User access defined
- [ ] Purpose documented
- [ ] Navigation links added
- [ ] Back button (if applicable)
- [ ] Proper layout structure
- [ ] Responsive design
- [ ] Comments/documentation

---

**Note:** This is a living document. Update as routes are added or modified.
