// src/components/Topbar.js
import React from 'react';

const Topbar = () => {
  return (
    <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <h2 className="text-lg font-semibold">Admin Panel</h2>
      <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
        Logout
      </button>
    </header>
  );
};

export default Topbar;
