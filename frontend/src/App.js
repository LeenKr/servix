// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Topbar from "./Components/Topbar";
import Dashboard from "./Pages/Dashboard";
import Vehicles from "./Pages/Vehicles";
import Inventory from "./Pages/Inventory";
import Reports from "./Pages/Reports";
import Checklist from "./Pages/checklist";
import ServiceLog from "./Pages/serviceLogs";
import LandingPage from "./Pages/LandingPage";

// Wrapper to access useLocation inside Routes
const LayoutWrapper = ({ children }) => {
  const location = useLocation();

  // Define routes where sidebar/topbar should be hidden (like landing)
  const isLanding = location.pathname === "/";

  return (
    <div className="flex h-screen bg-gray-100">
      {!isLanding && <Sidebar />}
      <div className="flex-1 flex flex-col">
        {!isLanding && <Topbar />}
        <main className="p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Admin Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/checklist" element={<Checklist />} />
          <Route path="/services" element={<ServiceLog />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;
