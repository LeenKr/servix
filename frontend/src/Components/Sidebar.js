// src/components/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Vehicles', path: '/vehicles' },
  { name: 'Inventory', path: '/inventory' },
  { name: 'Reports', path: '/reports' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white shadow-md h-full p-4">
      <h1 className="text-xl font-bold mb-6">Servix</h1>
      <nav className="space-y-4">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-2 rounded-lg font-medium ${
              location.pathname === item.path
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
