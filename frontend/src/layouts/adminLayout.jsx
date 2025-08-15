// src/layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar"; // adjust path if your folder name differs

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
