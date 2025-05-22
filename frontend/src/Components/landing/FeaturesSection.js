// src/components/Landing/FeaturesSection.js
import React from "react";
import { FaTools, FaClipboardList, FaBell, FaDatabase } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaTools />,
    title: "Preventive Maintenance",
    desc: "Track service intervals based on kilometers, hours, or dates. Avoid breakdowns before they happen.",
  },
  {
    icon: <FaClipboardList />,
    title: "Driver Checklist (PWA)",
    desc: "Mobile-first checklist system. Drivers submit daily safety checks in under 60 seconds — online or offline.",
  },
  {
    icon: <FaBell />,
    title: "Real-Time Notifications",
    desc: "Get notified instantly when a vehicle is due or inventory runs low. Daily summaries via email or in-app.",
  },
  {
    icon: <FaDatabase />,
    title: "Service Logs & Exports",
    desc: "Log parts, labor, and costs. Export CSV reports for accounting or BI tools in a click.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="bg-blue-50 py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Built for Fleet Operations
        </h2>
        <p className="text-center text-gray-600 text-lg mb-12">
          Everything you need to inspect, maintain, and track your vehicles — in one dashboard.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="bg-blue-100 text-blue-600 rounded-full p-4 text-2xl inline-block mb-4"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
