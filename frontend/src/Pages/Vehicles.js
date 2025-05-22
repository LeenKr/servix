import React, { useState } from 'react';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    vin: '',
    make: '',
    model: '',
    odometer: '',
    lastService: '',
    nextService: '',
  });

  const handleAdd = () => {
    setVehicles([...vehicles, formData]);
    setFormData({
      vin: '',
      make: '',
      model: '',
      odometer: '',
      lastService: '',
      nextService: '',
    });
    setShowModal(false);
  };

  const getStatus = (vehicle) => {
    const odo = parseInt(vehicle.odometer);
    const next = parseInt(vehicle.nextService);
    if (odo >= next) return 'overdue';
    if (odo >= next - 500) return 'due';
    return 'ok';
  };

  const statusBadge = (status) => {
    const colors = {
      ok: 'bg-green-500',
      due: 'bg-yellow-400',
      overdue: 'bg-red-500',
    };
    return (
      <span
        className={`text-white text-xs px-2 py-1 rounded-full ${colors[status]}`}
      >
        {status === 'ok' ? '✅ OK' : status === 'due' ? '⚠ Due Soon' : '🔴 Overdue'}
      </span>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Vehicles</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Vehicle
        </button>
      </div>

      <div className="bg-white shadow rounded p-4 overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">VIN</th>
              <th className="p-2">Make</th>
              <th className="p-2">Model</th>
              <th className="p-2">Odometer (km)</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="p-2">{v.vin}</td>
                <td className="p-2">{v.make}</td>
                <td className="p-2">{v.model}</td>
                <td className="p-2">{v.odometer}</td>
                <td className="p-2">{statusBadge(getStatus(v))}</td>
                <td className="p-2">
                  <button className="text-sm text-blue-600 hover:underline mr-2">
                    Edit
                  </button>
                  <button
                    className="text-sm text-red-600 hover:underline"
                    onClick={() =>
                      setVehicles(vehicles.filter((_, i) => i !== idx))
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {vehicles.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
                  No vehicles added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-[400px] shadow-lg relative">
            <h3 className="text-lg font-bold mb-4">Add New Vehicle</h3>

            <div className="space-y-3">
              {['vin', 'make', 'model', 'odometer', 'lastService', 'nextService'].map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                />
              ))}
            </div>

            <div className="flex justify-end mt-5 space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vehicles;
