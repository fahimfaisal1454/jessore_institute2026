import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-64
          bg-[#0B1120] text-white
          shadow-lg
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          lg:flex-shrink-0
        `}
      >
        <div className="h-full flex flex-col">
          
          {/* Mobile Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700 lg:hidden">
            <h2 className="text-lg font-semibold">Admin Panel</h2>

            <button
              onClick={() => setSidebarOpen(false)}
              className="text-2xl"
            >
              ✕
            </button>
          </div>

          {/* Sidebar Scroll Area */}
          <div className="flex-1 overflow-y-auto">
            <Sidebar closeSidebar={() => setSidebarOpen(false)} />
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col lg:ml-64 h-screen overflow-hidden">
        
        {/* Top Navbar */}
        <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between sticky top-0 z-30 flex-shrink-0">
          
          {/* Mobile Menu */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md border text-xl"
          >
            ☰
          </button>

          <h1 className="text-lg md:text-xl font-semibold truncate">
            Admin Dashboard
          </h1>

          <div className="hidden sm:block text-sm text-gray-600">
            Welcome Admin
          </div>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 min-h-full max-w-full overflow-x-auto">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}