import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../../assets/fleet-hero.jpg";

const HeroSection = () => {
  return (
    <section
      className="h-screen w-full bg-cover bg-center flex items-center relative"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Gradient overlay for text clarity */}
      <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-black/70 to-transparent z-10"></div>

      {/* Text Content */}
      <div className="relative z-20 px-6 md:px-24 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Optimize Fleet Operations with Smart Maintenance
        </h1>
        <p className="text-lg md:text-xl text-white mb-6">
          Servix helps fleet managers automate service schedules, track inspections, and reduce downtime — all in one streamlined platform.
        </p>
        <Link
          to="/pricing"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded hover:bg-blue-100 transition"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
