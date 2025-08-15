// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "./layouts/publicLayout";
import AdminLayout from "./layouts/adminLayout";

// Public pages
import LandingPage from "./pages/LandingPage";

// Admin pages (make sure these files exist with these names/paths)
import Dashboard from "./pages/Admin/Dashboard";
import Vehicles from "./pages/Admin/Vehicles";
import ServiceLog from "./pages/Admin/ServiceLogs"; // if your file is serviceLogs.jsx, change the import

// Temporary stubs (delete later when you build them)
const Inventory = () => <div className="p-8">Inventory page (coming soon)</div>;
const Reports   = () => <div className="p-8">Reports page (coming soon)</div>;
const Users     = () => <div className="p-8">Users & Roles (coming soon)</div>;
const Maintenance=() => <div className="p-8">Maintenance Tasks (coming soon)</div>;
const NotFound  = () => <div className="p-8">404 — Not Found</div>;

export default function App() {
  return (
    <Routes>
      {/* Public site (Navbar + Footer) */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      {/* Admin area (Sidebar + content) */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* /admin -> redirect to /admin/dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="vehicles" element={<Vehicles />} />
        <Route path="service-logs" element={<ServiceLog />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="reports" element={<Reports />} />
        <Route path="users" element={<Users />} />
        <Route path="maintenance" element={<Maintenance />} />
      </Route>

      {/* Optional: keep your old /admin-login path working */}
      <Route path="/admin-login" element={<Navigate to="/admin/dashboard" replace />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
