import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function PageLayout() {
  return (
    <div className="min-h-screen">

      {/* 🔥 MAIN CENTER BOX */}
      <div className="max-w-[1100px] mx-auto bg-white shadow-md">

        <Header />
        <Navbar />

        {/* CONTENT */}
        <div className="p-4 min-h-[600px]">
          <Outlet />
        </div>

        <Footer />
      </div>

    </div>
  );
}