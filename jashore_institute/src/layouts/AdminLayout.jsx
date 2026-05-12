// FILE: src/layouts/AdminLayout.jsx
// FULLY FIXED MOBILE MENU WITH TOP CLOSE BUTTON
// READY TO PASTE

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100 overflow-hidden">

      {/* MOBILE OVERLAY */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`
          fixed inset-0 bg-black/50 z-40 lg:hidden
          transition-all duration-300 ease-in-out
          ${
            sidebarOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      />

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          lg:static
          lg:flex-shrink-0
          flex flex-col
        `}
      >
        
        {/* MOBILE TOP BAR */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-gray-900 text-white border-b border-gray-700">
          <h2 className="font-semibold text-lg">Admin Panel</h2>

          <button
            onClick={() => setSidebarOpen(false)}
            className="text-2xl font-bold hover:text-red-400 transition"
          >
            ✕
          </button>
        </div>

        {/* SIDEBAR CONTENT */}
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />

      </aside>

      {/* MAIN WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">

        {/* HEADER */}
        <header className="bg-white shadow-sm px-3 sm:px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-30 flex-shrink-0">

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
          >
            ☰
          </button>

          {/* TITLE */}
          <h1 className="text-lg md:text-xl font-semibold truncate">
            Admin Dashboard
          </h1>

          {/* USER INFO */}
          <div className="hidden sm:block text-sm text-gray-600 whitespace-nowrap">
            Welcome Admin
          </div>
        </header>

        {/* CONTENT */}
<main className="flex-1 overflow-y-auto p-0">
  <Outlet />
</main>

      </div>
    </div>
  );
}