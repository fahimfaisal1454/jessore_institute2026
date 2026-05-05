import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function PageLayout() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      
      {/* 🔥 MAIN CENTER BOX */}
      <div className="max-w-[1100px] mx-auto bg-white shadow-md min-h-screen flex flex-col">
        
        {/* Header */}
        <Header />

        {/* Navbar */}
        <Navbar />

        {/* CONTENT */}
        <main className="flex-1 w-full px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6 min-h-[600px]">
          <div className="w-full min-w-0">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}