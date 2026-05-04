import { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaUser,
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const handleUserClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      console.log("Searching for:", searchTerm);
      // Add search navigation or API logic here
    }
  };

  return (
    <header className="bg-gray-100 border-b w-full overflow-x-hidden">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          
          {/* LEFT SECTION */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left w-full lg:w-auto">
            <img
              src="/logo.png"
              alt="Jashore Institute Logo"
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain flex-shrink-0"
            />

            <div>
              <h1 className="text-green-700 font-bold text-sm sm:text-lg md:text-xl leading-tight">
                যশোর ইনস্টিটিউট, যশোর
              </h1>
              <p className="text-green-700 text-xs sm:text-sm md:text-base">
                Jashore Institute, Jashore
              </p>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="w-full lg:w-auto flex flex-col items-center lg:items-end gap-3">
            
            {/* SOCIAL ICONS + USER */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-2">
              
              <a
                href="#"
                className="bg-blue-600 text-white p-2 rounded hover:scale-105 transition"
              >
                <FaFacebookF size={12} />
              </a>

              {/* <a
                href="#"
                className="bg-sky-400 text-white p-2 rounded hover:scale-105 transition"
              >
                <FaTwitter size={12} />
              </a> */}

              <a
                href="#"
                className="bg-red-600 text-white p-2 rounded hover:scale-105 transition"
              >
                <FaYoutube size={12} />
              </a>

              <button
                onClick={handleUserClick}
                className="bg-gray-800 text-white p-2 rounded hover:bg-black hover:scale-105 transition"
              >
                <FaUser size={12} />
              </button>
            </div>

            {/* SEARCH BAR */}
            <div className="flex w-full sm:w-auto max-w-full">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 sm:w-56 md:w-64 lg:w-72 px-4 py-2 text-sm border border-gray-300 rounded-l-full outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                onClick={handleSearch}
                className="bg-blue-600 px-4 rounded-r-full text-white hover:bg-blue-700 transition flex items-center justify-center"
              >
                <FiSearch />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;