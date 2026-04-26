import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname.startsWith(path);

  const linkClass = (path) =>
    `text-left px-3 py-2 rounded transition ${
      isActive(path)
        ? "bg-blue-600 text-white"
        : "hover:bg-gray-700"
    }`;

  return (
    <div className="w-64 bg-gray-900 text-white h-full flex flex-col">

      {/* SCROLLABLE */}
      <div className="flex-1 overflow-y-auto p-4">

        <h2 className="text-lg font-bold mb-6">Admin Panel</h2>

        <nav className="flex flex-col gap-1">

          {/* DASHBOARD */}
          <button
            onClick={() => navigate("/dashboard")}
            className={linkClass("/dashboard")}
          >
            Dashboard
          </button>

          {/* ABOUT */}
          <p className="text-gray-400 text-xs mt-3 mb-1">About</p>

          <button onClick={() => navigate("/dashboard/about")} className={linkClass("/dashboard/about")}>
            About Us
          </button>

          <button onClick={() => navigate("/dashboard/person")} className={linkClass("/dashboard/person")}>
            Persons
          </button>

          <button onClick={() => navigate("/dashboard/photos")} className={linkClass("/dashboard/photos")}>
            Photos
          </button>

          <button onClick={() => navigate("/dashboard/videos")} className={linkClass("/dashboard/videos")}>
            Videos
          </button>

          {/* CONTENT */}
          <p className="text-gray-400 text-xs mt-3 mb-1">Content</p>

          <button onClick={() => navigate("/dashboard/reports")} className={linkClass("/dashboard/reports")}>
            Annual Reports
          </button>

          <button onClick={() => navigate("/dashboard/forms")} className={linkClass("/dashboard/forms")}>
            Application Forms
          </button>

          <button onClick={() => navigate("/dashboard/infopages")} className={linkClass("/dashboard/infopages")}>
            Info Pages
          </button>

          <button onClick={() => navigate("/dashboard/contact")} className={linkClass("/dashboard/contact")}>
            Contact Messages
          </button>

          {/* COMMITTEE */}
          <p className="text-gray-400 text-xs mt-3 mb-1">Committee</p>

          <button onClick={() => navigate("/dashboard/committee/executive")} className={linkClass("/dashboard/committee/executive")}>
            Executive Committee
          </button>

          <button onClick={() => navigate("/dashboard/committee/members")} className={linkClass("/dashboard/committee/members")}>
            Committee Members
          </button>

          <button onClick={() => navigate("/dashboard/committee/old")} className={linkClass("/dashboard/committee/old")}>
            Old Committee
          </button>

          {/* 🔥 SUB COMMITTEE GROUP */}
          <p className="text-gray-400 text-xs mt-3 mb-1">Sub Committee</p>

          {/* ✅ NEW CATEGORY PAGE */}
          <button
            onClick={() => navigate("/dashboard/committee/sub-categories")}
            className={linkClass("/dashboard/committee/sub-categories")}
          >
            Categories
          </button>

          <button
            onClick={() => navigate("/dashboard/committee/sub-members")}
            className={linkClass("/dashboard/committee/sub-members")}
          >
            Members
          </button>

          <button
            onClick={() => navigate("/dashboard/committee/sub-docs")}
            className={linkClass("/dashboard/committee/sub-docs")}
          >
            Documents
          </button>

          {/* OTHER */}
          <p className="text-gray-400 text-xs mt-3 mb-1">Other</p>

<button
  onClick={() => navigate("/dashboard/notices")}
  className={linkClass("/dashboard/notices")}
>
  Notices
</button>
<p className="text-gray-400 text-xs mt-3 mb-1">Division</p>

<button
  onClick={() => navigate("/dashboard/divisions")}
  className={linkClass("/dashboard/divisions")}
>
  Divisions
</button>

<button onClick={() => navigate("/dashboard/members")} className={linkClass("/dashboard/members")}>
  Members
</button>

<button onClick={() => navigate("/dashboard/voters")} className={linkClass("/dashboard/voters")}>
  Voter Lists
</button>
<button
  onClick={() => navigate("/dashboard/old-committee-categories")}
  className={linkClass("/dashboard/old-committee-categories")}
>
  Old Committee Categories
</button>
<button
  onClick={() => navigate("/dashboard/old-committee")}
  className={linkClass("/dashboard/old-committee")}
>
  Old Committee
</button>
        </nav>
      </div>

      {/* LOGOUT */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 py-2 rounded hover:bg-red-600 text-sm"
        >
          Logout
        </button>
      </div>

    </div>
  );
}