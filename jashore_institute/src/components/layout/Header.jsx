import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

const Header = () => {
  return (
    <div className="bg-gray-100 border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* LEFT: Logo + Title */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png" // put your logo in public folder
            alt="logo"
            className="w-16 h-16 object-contain"
          />
          <div>
            <h1 className="text-green-700 font-bold text-lg leading-tight">
              যশোর ইনস্টিটিউট, যশোর
            </h1>
            <p className="text-green-700 text-sm">
              Jashore Institute, Jashore
            </p>
          </div>
        </div>

        {/* RIGHT: Social + Search */}
        <div className="flex flex-col items-end gap-2">
          
          {/* Social Icons */}
          <div className="flex gap-2">
            <div className="bg-blue-600 text-white p-2 rounded">
              <FaFacebookF size={12} />
            </div>
            <div className="bg-sky-400 text-white p-2 rounded">
              <FaTwitter size={12} />
            </div>
            <div className="bg-red-600 text-white p-2 rounded">
              <FaYoutube size={12} />
            </div>
          </div>

          {/* Search Box */}
          <div className="flex">
            <input
              type="text"
              placeholder="search........"
              className="px-3 py-1 text-sm border border-gray-300 rounded-l-full outline-none"
            />
            <button className="bg-blue-600 px-3 rounded-r-full text-white">
              <FiSearch />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Header;