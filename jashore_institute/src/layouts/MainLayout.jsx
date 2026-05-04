import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import NewsTicker from "../components/layout/NewsTicker";
import MapSection from "../components/home/MapSection";

import LeftSidebar from "../components/home/LeftSidebar";
import RightSidebar from "../components/home/RightSidebar";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex justify-center ">

      <div className="w-[1100px] bg-white shadow-md flex flex-col min-h-screen">

        <Header />
        <Navbar />
        <NewsTicker />

        {/* 🔥 MAIN SECTION */}
        <div className="grid grid-cols-12 gap-3 p-3 flex-1">

          {/* LEFT SIDEBAR */}
          <div className="col-span-3">
            <LeftSidebar />
          </div>

          {/* MAIN CONTENT (IMPORTANT FIX) */}
          <div className="col-span-6 flex flex-col">
            <div className="flex-1">
              <Outlet />
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="col-span-3">
            <RightSidebar />
          </div>

        </div>

        <MapSection />
        <Footer />

      </div>
    </div>
  );
}