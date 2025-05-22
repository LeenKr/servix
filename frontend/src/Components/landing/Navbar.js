import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white shadow z-50 py-2">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo + Brand Name */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Servix Logo" className="h-12 w-auto object-contain" />

        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium transition">
            Home
          </a>
          <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition">
            Features
          </a>
          <a href="#pricing" className="text-gray-700 hover:text-blue-600 font-medium transition">
            Pricing
          </a>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <FiX className="text-2xl text-gray-800" />
            ) : (
              <FiMenu className="text-2xl text-gray-800" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 pt-4 pb-6 space-y-4">
          <a
            href="#home"
            className="block text-gray-700 hover:text-blue-600 font-medium transition"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </a>
          <a
            href="#features"
            className="block text-gray-700 hover:text-blue-600 font-medium transition"
            onClick={() => setMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="#pricing"
            className="block text-gray-700 hover:text-blue-600 font-medium transition"
            onClick={() => setMenuOpen(false)}
          >
            Pricing
          </a>
          <Link
            to="/login"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
