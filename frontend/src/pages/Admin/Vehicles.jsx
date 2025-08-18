import React, { useState } from 'react';
import {
  FaRegClipboard,
  FaTools,
  FaClock,
  FaDollarSign,
  FaListAlt,
  FaCog,
} 
from 'react-icons/fa';

const sidebarSections = [
  { key: 'Details', label: 'Details', icon: <FaRegClipboard /> },
  { key: 'Maintenance', label: 'Maintenance', icon: <FaTools /> },
  { key: 'Specifications', label: 'Specifications', icon: <FaListAlt /> },
];

const initialState = {
  vehicle_name: '',
  nickname: '',
  vin: '',
  license_plate: '',
  type: '',
  fuel_type: '',
  year: '',
  make: '',
  model: '',
  status: 'Active',
  group: '',
  operator: '',
  ownership: 'Owned',
  next_service_date: '',
  next_service_odometer: '',
  last_service_date: '',
  current_odometer: '',
  notes: '',
  driver_name: '',
  driver_contact_number: '',
};

const Vehicles = () => {
  const [activeSection, setActiveSection] = useState('Details');
  const [form, setForm] = useState(initialState);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.table(form); // placeholder - replace with API call
  };

  const Field = ({ label, name, children, ...rest }) => (
    <div className="flex flex-col gap-1 col-span-2 lg:col-span-1">
      <label htmlFor={name} className="font-medium text-slate-700 dark:text-slate-200">
        {label}
        {rest.required && ' *'}
      </label>
      {children || (
        <input
          id={name}
          name={name}
          className="form-input"
          value={form[name]}
          onChange={handleChange}
          {...rest}
        />
      )}
    </div>
  );

  const detailsSection = (
    <section className="card">
      <header className="card-header">Identification</header>
      <div className="card-body grid gap-6 lg:grid-cols-2">
        <Field label="Vehicle Name" name="vehicle_name" required placeholder="e.g. Fleet Van 01" />
        <Field label="Nickname" name="nickname" placeholder="Internal nickname" />
        <Field label="VIN / Serial Number" name="vin" placeholder="XXXXXXXXXXXXXXX" />
        <Field label="License Plate" name="license_plate" placeholder="ABC-123" />
        <Field label="Type" name="type" required>
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select Type</option>
            <option value="Car">Car</option>
            <option value="Truck">Truck</option>
            <option value="Van">Van</option>
            <option value="Excavator">Excavator</option>
          </select>
        </Field>
        <Field label="Fuel Type" name="fuel_type">
          <select
            id="fuel_type"
            name="fuel_type"
            value={form.fuel_type}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Please select</option>
            <option value="Diesel">Diesel</option>
            <option value="Petrol">Petrol</option>
            <option value="Electric">Electric</option>
          </select>
        </Field>
        <Field label="Year" name="year" type="number" placeholder="2024" />
        <Field label="Make" name="make" placeholder="e.g. Toyota" />
        <Field label="Model" name="model" placeholder="e.g. Hilux" />
        <Field label="Driver's Name" name="driver_name" placeholder="e.g. Ahmad Sleiman" />
        <Field label="Driver's Contact Number" name="driver_contact_number" type="tel" placeholder="e.g. +961 70 123 456" />
      </div>
    </section>
  );

  const financialSection = (
    <section className="card">
      <header className="card-header">Classification</header>
      <div className="card-body grid gap-6 lg:grid-cols-2">
        <Field label="Status" name="status" required>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            className="form-input"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="In Service">In Service</option>
          </select>
        </Field>
        <Field label="Group" name="group" placeholder="Fleet Group" />
        <Field label="Operator" name="operator" placeholder="Assigned Driver" />
        <Field label="Ownership" name="ownership" placeholder="Owned / Leased" />
      </div>
    </section>
  );

  const maintenanceSection = (
    <section className="card">
      <header className="card-header">Maintenance Schedule</header>
      <div className="card-body grid gap-6 lg:grid-cols-2">
        <Field label="Next Service Date" name="next_service_date" type="date" />
        <Field label="Next Service Odometer (km)" name="next_service_odometer" type="number" placeholder="e.g. 150000" />
        <Field label="Last Service Date" name="last_service_date" type="date" />
        <Field label="Current Odometer (km)" name="current_odometer" type="number" placeholder="e.g. 120500" />
        <div className="lg:col-span-2">
          <label htmlFor="notes" className="font-medium text-slate-700 dark:text-slate-200">Maintenance Notes</label>
          <textarea id="notes" name="notes" rows="4" value={form.notes} onChange={handleChange} className="form-input resize-none"></textarea>
        </div>
      </div>
    </section>
  );

  return (
    <div className="flex h-full dark:bg-slate-900">
      <aside className="w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 p-6 space-y-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">New Vehicle</h2>
        <nav className="space-y-1">
          {sidebarSections.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-md font-medium transition ${
                activeSection === key
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto bg-slate-50 dark:bg-slate-800">
        <div className="flex justify-end gap-4 mb-8">
          <button className="btn-secondary">Cancel</button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
          >
            Save Vehicle
          </button>
        </div>

        {activeSection === 'Details' && detailsSection}
        {activeSection === 'Maintenance' && maintenanceSection}
        {activeSection === 'Financial' && financialSection}
        {['Lifecycle', 'Specifications', 'Settings'].includes(activeSection) && (
          <div className="card text-center text-slate-500 dark:text-slate-400 p-10">
            {activeSection} section coming soon…
          </div>
        )}
      </main>
    </div>
  );
};

export default Vehicles;