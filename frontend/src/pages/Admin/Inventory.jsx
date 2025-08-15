import React, { useState } from 'react';

const Inventory = () => {
  const [parts, setParts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unit: '',
    reorderLevel: '',
  });

  const handleAdd = () => {
    setParts([...parts, formData]);
    setFormData({ name: '', quantity: '', unit: '', reorderLevel: '' });
    setShowModal(false);
  };

  const isLowStock = (part) =>
    parseInt(part.quantity) <= parseInt(part.reorderLevel);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Parts Inventory</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Part
        </button>
      </div>

      <div className="bg-white shadow rounded p-4 overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Part Name</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Unit</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parts.map((p, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.quantity}</td>
                <td className="p-2">{p.unit}</td>
                <td className="p-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      isLowStock(p) ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                    }`}
                  >
                    {isLowStock(p) ? '🔴 Low Stock' : '✅ OK'}
                  </span>
                </td>
                <td className="p-2">
                  <button
                    className="text-sm text-red-600 hover:underline"
                    onClick={() =>
                      setParts(parts.filter((_, i) => i !== idx))
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {parts.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No parts added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-[400px] shadow-lg relative">
            <h3 className="text-lg font-bold mb-4">Add Spare Part</h3>

            <div className="space-y-3">
              {['name', 'quantity', 'unit', 'reorderLevel'].map((field) => (
                <input
                  key={field}
                  type={field === 'quantity' || field === 'reorderLevel' ? 'number' : 'text'}
                  placeholder={
                    field === 'reorderLevel'
                      ? 'Reorder Level'
                      : field.charAt(0).toUpperCase() + field.slice(1)
                  }
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

export default Inventory;