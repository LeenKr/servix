import React from "react";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-white border-t mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10 text-gray-700">
        
        {/* Column 1: Logo + About */}
        <div className="flex flex-col items-start md:items-start space-y-3">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Servix Logo" className="h-10 w-auto object-contain" />
          </div>
          <p className="text-sm max-w-xs">
            Smart fleet maintenance & inspection software for modern operators in Lebanon & MENA.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#home" className="hover:text-blue-600">Home</a></li>
            <li><a href="#features" className="hover:text-blue-600">Features</a></li>
            <li><a href="#pricing" className="hover:text-blue-600">Pricing</a></li>
            <li><a href="#contact" className="hover:text-blue-600">Contact</a></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-sm mb-2">
            Email: <a href="mailto:support@servixfleet.com" className="text-blue-600">support@servixfleet.com</a>
          </p>
          <p className="text-sm">Location: Beirut, Lebanon</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t text-center text-sm text-gray-500 py-4">
        © {new Date().getFullYear()} Servix. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
