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
        {localStorage.getItem("role") === "superadmin" && (
  <button
    onClick={() => navigate("/dashboard/users")}
    className={linkClass("/dashboard/users")}
  >
    User Management
  </button>
)}

        {/* ABOUT */}
        <Section title="About" open={open.about} toggle={() => toggle("about")}>
          <NavItem to="/dashboard/about" label="আমাদের সম্পর্কে" />
          <NavItem to="/dashboard/person" label="যদুনাথ মজুমদার" />
          <NavItem to="/dashboard/photos" label="ছবিঘর" />
          <NavItem to="/dashboard/videos" label="ভিডিওঘর" />
          <NavItem to="/dashboard/library" label="লাইব্রেরি" />
        </Section>

        {/* CONTENT */}
        <Section title="Content" open={open.content} toggle={() => toggle("content")}>
          <NavItem to="/dashboard/reports" label="📄বার্ষিক প্রতিবেদন" />
          <NavItem to="/dashboard/forms" label="ফরম" />
          <NavItem to="/dashboard/infopages" label="🏛️উন্মুক্ত স্বাধীনতা মঞ্চ/🏫প্রাথমিক বিদ্যালয়" />
          <NavItem to="/dashboard/contact" label="Contact Messages" />
        </Section>

        {/* COMMITTEE */}
        <Section title="Committee" open={open.committee} toggle={() => toggle("committee")}>
          <NavItem to="/dashboard/committee/executive" label="নির্বাহী কমিটি" />
          <NavItem to="/dashboard/committee/members" label="পরিচালনা পরিষদ" />
          <NavItem to="/dashboard/committee/old" label="পরিচালনা পরিষদ-প্রাক্তন" />
        </Section>

        {/* SUB */}
        <Section title="Sub Committee" open={open.sub} toggle={() => toggle("sub")}>
          <NavItem to="/dashboard/committee/sub-categories" label="উপ-কমিটির ক্যাটাগরি " />
          <NavItem to="/dashboard/committee/sub-members" label="উপ-কমিটির সদস্য" />
          <NavItem to="/dashboard/committee/sub-docs" label="উপ-কমিটির সদস্য প্রাক্তন" />
        </Section>

        {/* OTHER */}
        <Section title="Other" open={open.other} toggle={() => toggle("other")}>
          <NavItem to="/dashboard/notices" label="নোটিশ" />
        </Section>

        {/* DIVISION */}
        <Section title="Division" open={open.division} toggle={() => toggle("division")}>
          <NavItem to="/dashboard/divisions" label="বিভাগসমূহ " />
          <NavItem to="/dashboard/members" label="বিভাগসমূহ সদস্য" />
          <NavItem to="/dashboard/voters" label="ভোটার তালিকা" />
          <NavItem to="/dashboard/old-committee-categories" label="প্রাক্তন কমিটির ক্যাটাগরি" />
          <NavItem to="/dashboard/old-committee" label="সভাপতি/সাধারণ সম্পাদকবৃন্দের তালিকা" />
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