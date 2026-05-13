// FILE: src/components/dashboard/Sidebar.jsx
// FULL FIX:
// - ONLY ONE ACTIVE MENU
// - MOBILE FIX
// - COLLAPSE FIX
// - SMOOTH ANIMATION
// READY TO PASTE

import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { useState } from "react";
import {
  FaChevronDown,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";

export default function Sidebar({ closeSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const [collapsed, setCollapsed] = useState(false);

  const [open, setOpen] = useState({
    about: true,
    content: false,
    committee: false,
    sub: false,
    other: false,
    division: false,
  });

  const toggle = (key) => {
    setOpen((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavigate = (to) => {
    navigate(to);

    if (window.innerWidth < 1024 && closeSidebar) {
      closeSidebar();
    }
  };

  const isActive = (path) => {
    if (path === "/dashboard/members") {
      return location.pathname === path;
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(path)
    );
  };

  const linkClass = (path) =>
    `w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-300 break-words whitespace-normal ${
      isActive(path)
        ? "bg-blue-600 text-white shadow-md"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <div
      className={`
        h-screen bg-gradient-to-b from-gray-900 to-gray-800
        text-white flex flex-col shadow-xl
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-20" : "w-64"}
        max-w-full
      `}
    >
      {/* HEADER */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div
          onClick={() => handleNavigate("/")}
          className="flex items-center gap-3 cursor-pointer min-w-0"
        >
          <img
            src="/logo.png"
            alt="Logo"
            className="w-10 h-10 rounded-full bg-white p-1 flex-shrink-0"
          />

          {!collapsed && (
            <div className="transition-all duration-300 min-w-0">
              <p className="text-sm font-semibold truncate">
                যশোর ইনস্টিটিউট
              </p>
              <p className="text-xs text-gray-400 truncate">
                Admin Panel
              </p>
            </div>
          )}
        </div>

        {/* DESKTOP COLLAPSE */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:block text-gray-300 hover:text-white transition ml-2"
        >
          {collapsed ? (
            <FaAngleDoubleRight />
          ) : (
            <FaAngleDoubleLeft />
          )}
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <button
          onClick={() => handleNavigate("/dashboard")}
          className={linkClass("/dashboard")}
        >
          {!collapsed && "Dashboard"}
        </button>

        {localStorage.getItem("role") === "superadmin" && (
          <button
            onClick={() => handleNavigate("/dashboard/users")}
            className={linkClass("/dashboard/users")}
          >
            {!collapsed && "User Management"}
          </button>
        )}

        {/* ABOUT */}
        <Section
          title="About"
          open={open.about}
          toggle={() => toggle("about")}
          collapsed={collapsed}
        >
          <NavItem to="/dashboard/about" label="আমাদের সম্পর্কে" collapsed={collapsed} navigate={handleNavigate} />
          <NavItem to="/dashboard/person" label="যদুনাথ মজুমদার" collapsed={collapsed} navigate={handleNavigate} />
          <NavItem to="/dashboard/photos" label="ছবিঘর" collapsed={collapsed} navigate={handleNavigate} />
          <NavItem to="/dashboard/videos" label="ভিডিওঘর" collapsed={collapsed} navigate={handleNavigate} />
          <NavItem to="/dashboard/library" label="লাইব্রেরি" collapsed={collapsed} navigate={handleNavigate} />
          <NavItem to="/dashboard/media" label="মিডিয়া" collapsed={collapsed} navigate={handleNavigate} />
          <NavItem to="/dashboard/publications" label="প্রকাশনা" collapsed={collapsed} navigate={handleNavigate} />
          <NavItem to="/dashboard/hero-slider" label="হিরো স্লাইডার" collapsed={collapsed} navigate={handleNavigate} />
        </Section>

        {/* CONTENT */}
        <Section
          title="Content"
          open={open.content}
          toggle={() => toggle("content")}
          collapsed={collapsed}
        >
          <NavItem to="/dashboard/reports" label="বার্ষিক প্রতিবেদন" collapsed={collapsed} navigate={handleNavigate} />
          <NavItem to="/dashboard/forms" label="ফরম" collapsed={collapsed} navigate={handleNavigate} />
          <NavItem to="/dashboard/infopages" label="উন্মুক্ত স্বাধীনতা মঞ্চ" collapsed={collapsed} navigate={handleNavigate} />
          <NavItem to="/dashboard/contact" label="Contact Messages" collapsed={collapsed} navigate={handleNavigate} />
        </Section>

        {/* COMMITTEE */}
        <Section
          title="Committee"
          open={open.committee}
          toggle={() => toggle("committee")}
          collapsed={collapsed}
        >
          <NavItem to="/dashboard/committee/executive" label="নির্বাহী কমিটি" collapsed={collapsed} navigate={handleNavigate} />
          <NavItem to="/dashboard/committee/members" label="পরিচালনা পরিষদ" collapsed={collapsed} navigate={handleNavigate} />
          <NavItem to="/dashboard/committee/old" label="প্রাক্তন" collapsed={collapsed} navigate={handleNavigate} />
        </Section>

        {/* SUB COMMITTEE */}
        <Section
          title="Sub Committee"
          open={open.sub}
          toggle={() => toggle("sub")}
          collapsed={collapsed}
        >
          <NavItem to="/dashboard/committee/sub-categories" label="ক্যাটাগরি" collapsed={collapsed} navigate={handleNavigate} />
          <NavItem to="/dashboard/committee/sub-members" label="উপকমিটি সদস্য" collapsed={collapsed} navigate={handleNavigate} />
          <NavItem to="/dashboard/committee/sub-docs" label=" উপকমিটি প্রাক্তন " collapsed={collapsed} navigate={handleNavigate} />
        </Section>

        {/* OTHER */}
        <Section
          title="নোটিশ"
          open={open.other}
          toggle={() => toggle("other")}
          collapsed={collapsed}
        >
          <NavItem to="/dashboard/notices" label="নোটিশ" collapsed={collapsed} navigate={handleNavigate} />
        </Section>
                {/* MEMBERS */}
        <Section
          title="সদস্য"
          open={open.members}
          toggle={() => toggle("members")}
          collapsed={collapsed}
        >
          
          <NavItem to="/dashboard/members" label="সদস্য" collapsed={collapsed} navigate={handleNavigate} />
          <NavItem to="/dashboard/members/list" label="সদস্য তালিকা" collapsed={collapsed} navigate={handleNavigate} />
      
        </Section>

         {/*সভাপতি/সম্পাদকবৃন্দ*/}
        <Section
          title="সভাপতি/সম্পাদকবৃন্দ"
          open={open.president}
          toggle={() => toggle("president")}
          collapsed={collapsed}
        >

          <NavItem to="/dashboard/old-committee-categories" label="সভাপতি/সম্পাদকবৃন্দ ক্যাটাগরি" collapsed={collapsed} navigate={handleNavigate} />
          <NavItem to="/dashboard/old-committee" label="সভাপতি/সম্পাদকবৃন্দ" collapsed={collapsed} navigate={handleNavigate} />
        </Section>

        {/* DIVISION */}
        <Section
          title="Division"
          open={open.division}
          toggle={() => toggle("division")}
          collapsed={collapsed}
        >
          <NavItem to="/dashboard/divisions" label="বিভাগসমূহ" collapsed={collapsed} navigate={handleNavigate} />
          {/* <NavItem to="/dashboard/members" label="সদস্য" collapsed={collapsed} navigate={handleNavigate} />
          <NavItem to="/dashboard/members/list" label="সদস্য তালিকা" collapsed={collapsed} navigate={handleNavigate} /> */}
          <NavItem to="/dashboard/voters" label="ভোটার তালিকা" collapsed={collapsed} navigate={handleNavigate} />
          {/* <NavItem to="/dashboard/old-committee-categories" label="সভাপতি/সম্পাদকবৃন্দ ক্যাটাগরি" collapsed={collapsed} navigate={handleNavigate} />
          <NavItem to="/dashboard/old-committee" label="সভাপতি/সম্পাদকবৃন্দ" collapsed={collapsed} navigate={handleNavigate} /> */}
        </Section>
      </div>

      {/* LOGOUT */}
      <div className="p-3 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 py-2 rounded-lg hover:bg-red-600 transition"
        >
          {!collapsed && "Logout"}
        </button>
      </div>
    </div>
  );
}

/* SECTION */
function Section({ title, open, toggle, children, collapsed }) {
  return (
    <div className="w-full">
      <button
        onClick={toggle}
        className="flex justify-between items-center w-full text-[11px] uppercase tracking-wider text-gray-500 font-semibold mt-4 hover:text-white transition"
      >
        {!collapsed && (
          <span className="truncate text-left">{title}</span>
        )}

        {!collapsed && (
          <FaChevronDown
            className={`flex-shrink-0 transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        )}
      </button>

      <div
        className={`
          overflow-hidden transition-all duration-300
          ${
            open && !collapsed
              ? "max-h-[900px] opacity-100 mt-2"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <div className="ml-2 border-l border-gray-700 pl-2 flex flex-col gap-1">
          {children}
        </div>
      </div>
    </div>
  );
}

/* NAV ITEM */
function NavItem({ to, label, collapsed, navigate }) {
  const location = useLocation();

  const active =
    to === "/dashboard/members"
      ? location.pathname === to
      : location.pathname === to ||
        location.pathname.startsWith(to);

  return (
    <button
      onClick={() => navigate(to)}
      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-300 break-words whitespace-normal ${
        active
          ? "bg-blue-600 text-white shadow-md"
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
      }`}
    >
      {!collapsed && label}
    </button>
  );
}