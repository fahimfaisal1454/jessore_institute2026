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
    <div className="min-h-screen w-full">
      
      {/* 🔥 MAIN CENTER BOX */}
      <div className="max-w-[1100px] mx-auto bg-white shadow-md min-h-screen flex flex-col">
        
        <Header />
        <Navbar />
        <NewsTicker />

        {/* Main Content */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-3 sm:p-4 md:p-5 flex-1">
          
          {/* Left Sidebar */}
          <aside className="lg:col-span-3 order-2 lg:order-1 min-w-0">
            <LeftSidebar />
          </aside>

          {/* Main Content Section */}
          <section className="lg:col-span-6 order-1 lg:order-2 min-w-0">
            <Outlet />
          </section>

          {/* Right Sidebar */}
          <aside className="lg:col-span-3 order-3 min-w-0">
            <RightSidebar />
          </aside>

        </main>

        <MapSection />
        <Footer />
      </div>
    </div>
  );
}