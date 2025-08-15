import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaCar,
  FaBoxes,
  FaFileAlt,
  FaDollarSign,
  FaTools,
  FaUsers,
  FaClipboardList,
} from 'react-icons/fa';

const navItems = [
  { name: 'Dashboard',         path: '/admin/dashboard',   icon: <FaTachometerAlt /> },
  { name: 'Vehicles',          path: '/admin/vehicles',    icon: <FaCar /> },
  { name: 'Reports',           path: '/admin/reports',     icon: <FaFileAlt /> },
  { name: 'Maintenance Tasks', path: '/admin/maintenance', icon: <FaTools /> },
  { name: 'service-logs',   path: '/admin/service-logs', icon: <FaClipboardList /> },
  // If you want a link for service logs too:
  // { name: 'Service Logs', path: '/admin/service-logs', icon: <FaClipboardList /> },
];


const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white shadow-md h-full p-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">Servix</h1>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-2 rounded-lg font-medium transition-all ${
              location.pathname === item.path
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;