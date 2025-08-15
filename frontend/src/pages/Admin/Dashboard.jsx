import React, { useState, useEffect } from "react";

/** ---------- small UI helpers ---------- */
const Pill = ({ children, tone = "slate" }) => {
  const tones = {
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
    slate: "bg-slate-100 text-slate-700",
    blue: "bg-blue-100 text-blue-700",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${tones[tone] || tones.slate}`}>
      {children}
    </span>
  );
};

const StatusBadge = ({ label }) => {
  const map = {
    OK: "green",
    Active: "green",
    "Due Soon": "yellow",
    Overdue: "red",
    "Needs Repair": "red",
  };
  return <Pill tone={map[label] || "slate"}>{label}</Pill>;
};

const NextServiceBadge = ({ label }) => {
  const map = { OK: "green", "Due Soon": "yellow", Overdue: "red" };
  return <Pill tone={map[label] || "slate"}>{label}</Pill>;
};

/** ---------- driver info modal ---------- */
const DriverModal = ({ driver, onClose }) => {
  // Close modal on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!driver) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl p-8 w-[32rem] max-w-full"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <h2 className="text-xl font-bold mb-6">Driver Information</h2>

        <div className="space-y-4 text-base">
          <p>
            <span className="font-semibold">Name:</span> {driver.name}
          </p>
          <p>
            <span className="font-semibold">Phone:</span>{" "}
            <a
              href={`tel:${driver.phone}`}
              className="text-blue-600 hover:underline"
            >
              {driver.phone || "—"}
            </a>
          </p>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/** ---------- mock data ---------- */
const mockRows = [
  {
    vehicleName: "Toyota Hilux",
    description: "Light-duty pickup for local deliveries",
    trade: "Transport",
    modelYear: 2021,
    chassisNumber: "JT1234HILUX0001",
    plateNumber: "LBN 123456",
    internalNumber: "INT-0007",
    driver: { name: "Ali Hassan", phone: "+961 71 123 456" },
    status: "Active",
    nextService: "Due Soon",
  },
  {
    vehicleName: "Ford F-150",
    description: "Long-distance hauler",
    trade: "Logistics",
    modelYear: 2020,
    chassisNumber: "1FTMF1E50LKE0002",
    plateNumber: "LBN 654321",
    internalNumber: "INT-0021",
    driver: { name: "Sara M.", phone: "+961 76 987 111" },
    status: "Active",
    nextService: "OK",
  },
  {
    vehicleName: "Chevrolet Silverado",
    description: "Heavy load routes",
    trade: "Construction",
    modelYear: 2019,
    chassisNumber: "3GCUKRECXFG0003",
    plateNumber: "LBN 998877",
    internalNumber: "INT-0042",
    driver: { name: "Omar K.", phone: "+961 70 555 222" },
    status: "Needs Repair",
    nextService: "Overdue",
  },
  {
    vehicleName: "Mercedes Sprinter",
    description: "Parts shuttle van",
    trade: "Service",
    modelYear: 2022,
    chassisNumber: "WDB9066571S00004",
    plateNumber: "LBN 112233",
    internalNumber: "INT-0103",
    driver: { name: "Mona S.", phone: "+961 71 444 000" },
    status: "Active",
    nextService: "OK",
  },
  {
    vehicleName: "Mercedes Sprinter",
    description: "Technicians crew van",
    trade: "Maintenance",
    modelYear: 2018,
    chassisNumber: "WDB9066571S00005",
    plateNumber: "LBN 445566",
    internalNumber: "INT-0119",
    driver: { name: "—", phone: "" },
    status: "Needs Repair",
    nextService: "Overdue",
  },
];

/** ---------- main component ---------- */
const Dashboard = () => {
  const [selectedDriver, setSelectedDriver] = useState(null);

  const onDriverClick = (driver) => {
    if (!driver || driver.name === "—") return;
    setSelectedDriver(driver);
  };

  const onStatusClick = (row) => {
    alert(`Change status for ${row.vehicleName} (current: ${row.status})`);
  };

  const onNextServiceClick = (row) => {
    alert(`Open maintenance for ${row.vehicleName} (Next service: ${row.nextService})`);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-extrabold text-slate-800 mb-6">Dashboard</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-xl border border-slate-200">
          <thead className="bg-slate-50 text-slate-600 text-sm font-semibold">
            <tr>
              <th className="px-6 py-3 text-left">Vehicle Name</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Trade</th>
              <th className="px-6 py-3 text-left">Model (Year)</th>
              <th className="px-6 py-3 text-left">Chassis Number</th>
              <th className="px-6 py-3 text-left">Plate Number</th>
              <th className="px-6 py-3 text-left">Internal Number</th>
              <th className="px-6 py-3 text-left">Driver / Operator</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Next Service</th>
            </tr>
          </thead>

          <tbody className="text-sm divide-y divide-slate-200">
            {mockRows.map((row) => (
              <tr key={row.internalNumber} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">{row.vehicleName}</td>
                <td className="px-6 py-4 text-slate-700">{row.description}</td>
                <td className="px-6 py-4">{row.trade}</td>
                <td className="px-6 py-4">{row.modelYear}</td>
                <td className="px-6 py-4 font-mono">{row.chassisNumber}</td>
                <td className="px-6 py-4">{row.plateNumber}</td>
                <td className="px-6 py-4">{row.internalNumber}</td>

                {/* Driver clickable */}
                <td className="px-6 py-4">
                  {row.driver?.name && row.driver.name !== "—" ? (
                    <button
                      type="button"
                      onClick={() => onDriverClick(row.driver)}
                      className="underline decoration-dotted hover:decoration-solid text-blue-600"
                      title="View driver information"
                    >
                      {row.driver.name}
                    </button>
                  ) : (
                    <span className="text-slate-400">No driver</span>
                  )}
                </td>

                {/* Status clickable */}
                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={() => onStatusClick(row)}
                    className="focus:outline-none"
                    title="Click to change status"
                  >
                    <StatusBadge label={row.status} />
                  </button>
                </td>

                {/* Next Service clickable */}
                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={() => onNextServiceClick(row)}
                    className="focus:outline-none"
                    title="Open maintenance schedule / history"
                  >
                    <NextServiceBadge label={row.nextService} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-xs text-slate-500 mt-3">
          Tip: Click the <span className="font-semibold">Driver</span> name to view phone info.
        </div>
      </div>

      {/* Driver info modal */}
      <DriverModal driver={selectedDriver} onClose={() => setSelectedDriver(null)} />
    </div>
  );
};

export default Dashboard;