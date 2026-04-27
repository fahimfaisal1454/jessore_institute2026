import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const [open, setOpen] = useState({
    about: true,
    content: false,
    committee: false,
    sub: false,
    other: false,
    division: false,
  });

  const toggle = (key) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname.startsWith(path);

  const linkClass = (path) =>
    `text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
      isActive(path)
        ? "bg-blue-600 text-white shadow-md"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white h-full flex flex-col shadow-xl">

      {/* 🔥 LOGO */}
      <div
        onClick={() => navigate("/")}
        className="p-4 flex items-center gap-3 cursor-pointer border-b border-gray-700 hover:bg-gray-800 transition"
      >
        <img
          src="/logo.png"
          className="w-10 h-10 rounded-full bg-white p-1"
        />
        <div>
          <p className="text-sm font-semibold">যশোর ইনস্টিটিউট</p>
          <p className="text-xs text-gray-400">Admin Panel</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">

        {/* DASHBOARD */}
        <button
          onClick={() => navigate("/dashboard")}
          className={linkClass("/dashboard")}
        >
          Dashboard
        </button>

        {/* ABOUT */}
        <Section title="About" open={open.about} toggle={() => toggle("about")}>
          <NavItem to="/dashboard/about" label="About Us" />
          <NavItem to="/dashboard/person" label="Persons" />
          <NavItem to="/dashboard/photos" label="Photos" />
          <NavItem to="/dashboard/videos" label="Videos" />
        </Section>

        {/* CONTENT */}
        <Section title="Content" open={open.content} toggle={() => toggle("content")}>
          <NavItem to="/dashboard/reports" label="Annual Reports" />
          <NavItem to="/dashboard/forms" label="Application Forms" />
          <NavItem to="/dashboard/infopages" label="Info Pages" />
          <NavItem to="/dashboard/contact" label="Contact Messages" />
        </Section>

        {/* COMMITTEE */}
        <Section title="Committee" open={open.committee} toggle={() => toggle("committee")}>
          <NavItem to="/dashboard/committee/executive" label="Executive Committee" />
          <NavItem to="/dashboard/committee/members" label="Committee Members" />
          <NavItem to="/dashboard/committee/old" label="Old Committee" />
        </Section>

        {/* SUB */}
        <Section title="Sub Committee" open={open.sub} toggle={() => toggle("sub")}>
          <NavItem to="/dashboard/committee/sub-categories" label="Categories" />
          <NavItem to="/dashboard/committee/sub-members" label="Members" />
          <NavItem to="/dashboard/committee/sub-docs" label="Documents" />
        </Section>

        {/* OTHER */}
        <Section title="Other" open={open.other} toggle={() => toggle("other")}>
          <NavItem to="/dashboard/notices" label="Notices" />
        </Section>

        {/* DIVISION */}
        <Section title="Division" open={open.division} toggle={() => toggle("division")}>
          <NavItem to="/dashboard/divisions" label="Divisions" />
          <NavItem to="/dashboard/members" label="Members" />
          <NavItem to="/dashboard/voters" label="Voter Lists" />
          <NavItem to="/dashboard/old-committee-categories" label="Old Committee Categories" />
          <NavItem to="/dashboard/old-committee" label="Old Committee" />
        </Section>

      </div>

      {/* LOGOUT */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 py-2 rounded-lg hover:bg-red-600 transition text-sm font-medium shadow"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

/* 🔥 CLEAN COMPONENTS */

function Section({ title, open, toggle, children }) {
  return (
    <div>
      <button
        onClick={toggle}
        className="flex justify-between items-center w-full text-[11px] uppercase tracking-wider text-gray-500 font-semibold mt-4 hover:text-white transition"
      >
        {title}
        <FaChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="ml-3 border-l border-gray-700 pl-2 mt-2 flex flex-col gap-1">
          {children}
        </div>
      )}
    </div>
  );
}

function NavItem({ to, label }) {
  const navigate = useNavigate();
  const location = useLocation();

  const active = location.pathname.startsWith(to);

  return (
    <button
      onClick={() => navigate(to)}
      className={`text-left px-3 py-2 rounded-lg text-sm transition-all ${
        active
          ? "bg-blue-600 text-white shadow-md"
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}