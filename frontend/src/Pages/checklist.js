import React, { useState } from 'react';

const Checklist = () => {
  const [formData, setFormData] = useState({
    odometer: '',
    engineHours: '',
    checklist: {
      tires: false,
      brakes: false,
      lights: false,
      oil: false,
      mirrors: false,
    },
    photo: null,
  });

  const [preview, setPreview] = useState(null);

  const handleCheckbox = (item) => {
    setFormData((prev) => ({
      ...prev,
      checklist: {
        ...prev.checklist,
        [item]: !prev.checklist[item],
      },
    }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, photo: file }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const data = {
      ...formData,
      submittedAt: new Date().toISOString(),
    };

    // Save locally (simulate offline)
    let local = JSON.parse(localStorage.getItem('driver_checklists')) || [];
    local.push(data);
    localStorage.setItem('driver_checklists', JSON.stringify(local));

    alert('Checklist submitted!');
    setFormData({
      odometer: '',
      engineHours: '',
      checklist: {
        tires: false,
        brakes: false,
        lights: false,
        oil: false,
        mirrors: false,
      },
      photo: null,
    });
    setPreview(null);
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">Daily Driver Checklist</h2>

      <div className="space-y-3">
        <input
          type="number"
          placeholder="Odometer (km)"
          value={formData.odometer}
          onChange={(e) =>
            setFormData({ ...formData, odometer: e.target.value })
          }
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="number"
          placeholder="Engine Hours"
          value={formData.engineHours}
          onChange={(e) =>
            setFormData({ ...formData, engineHours: e.target.value })
          }
          className="w-full border rounded px-3 py-2"
        />

        <div className="border rounded px-3 py-2">
          <label className="block font-semibold mb-2">Safety Items:</label>
          {Object.keys(formData.checklist).map((item) => (
            <label key={item} className="flex items-center space-x-2 mb-1">
              <input
                type="checkbox"
                checked={formData.checklist[item]}
                onChange={() => handleCheckbox(item)}
              />
              <span className="capitalize">{item}</span>
            </label>
          ))}
        </div>

        <div>
          <label className="block font-semibold mb-1">Photo (optional):</label>
          <input type="file" accept="image/*" onChange={handlePhoto} />
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Checklist
        </button>
      </div>
    </div>
  );
};

export default Checklist;
