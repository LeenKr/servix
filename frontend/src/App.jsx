// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "./layouts/publicLayout";
import AdminLayout from "./layouts/adminLayout";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Admin/Dashboard";
import Vehicles from "./pages/Admin/Vehicles";
import ServiceLog from "./pages/Admin/ServiceLogs"; 


const Reports   = () => <div className="p-8">Reports page (coming soon)</div>;
const Maintenance=() => <div className="p-8">Maintenance Tasks (coming soon)</div>;

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
        <Route path="reports" element={<Reports />} />
        <Route path="maintenance" element={<Maintenance />} />

      </Route>

      {/* Optional: keep your old /admin-login path working */}
      <Route path="/admin-login" element={<Navigate to="/admin/dashboard" replace />} />

    </Routes>
  );
}
