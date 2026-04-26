import { Outlet } from "react-router-dom";
import Sidebar from "../../components/dashboard/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">

        {/* Header */}
        <h1 className="text-2xl font-bold mb-4">
          Jashore Institute Dashboard
        </h1>

        {/* Dynamic Content (IMPORTANT) */}
        <Outlet />

      </div>
    </div>
  );
}