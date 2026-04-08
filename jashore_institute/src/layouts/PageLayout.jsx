import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function PageLayout() {
  return (
    <div className="min-h-screen"> {/* ❌ removed bg-white */}

      <Header />
      <Navbar />

      {/* ✅ WHITE CONTENT BOX */}
      <div className="max-w-[1100px] mx-auto bg-white shadow-md min-h-[600px] p-4">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}