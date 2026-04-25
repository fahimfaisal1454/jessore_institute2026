import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col p-5">
      {/* Title */}
      <h2 className="text-xl font-bold mb-8">
        Admin Panel
      </h2>

      {/* Navigation */}
      <nav className="flex flex-col gap-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-left hover:text-blue-400"
        >
          Dashboard
        </button>

        {/* Future links (you'll connect later) */}
        <button className="text-left hover:text-blue-400">
          About
        </button>

        <button className="text-left hover:text-blue-400">
          Notices
        </button>

        <button className="text-left hover:text-blue-400">
          Gallery
        </button>
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-auto bg-red-500 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}