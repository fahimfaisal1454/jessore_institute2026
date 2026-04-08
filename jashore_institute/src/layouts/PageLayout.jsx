import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function PageLayout() {
  return (
    <div className="min-h-screen bg-white">

      <Header />
      <Navbar />

      {/* FULL WIDTH CONTENT */}
      <div className="max-w-[1100px] mx-auto p-4">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}