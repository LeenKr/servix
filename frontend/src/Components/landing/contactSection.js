// src/components/Landing/ContactSection.js
import React from "react";

const ContactSection = () => {
  return (
    <section id="contact" className="bg-blue-50 py-20 px-6 md:px-20">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Get in Touch</h2>
        <p className="text-gray-600 mb-10">
          Have questions or need a custom solution? We'd love to hear from you.
        </p>

        <form className="space-y-6 text-left bg-white p-8 rounded-xl shadow-md">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Message</label>
            <textarea
              required
              rows="4"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Tell us what you need..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
