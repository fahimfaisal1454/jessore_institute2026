import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import NewsTicker from "../components/layout/NewsTicker";
import MapSection from "../components/home/MapSection";

import LeftSidebar from "../components/home/LeftSidebar";
import RightSidebar from "../components/home/RightSidebar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex justify-center">

      <div className="w-[1100px] bg-white shadow-md">

        <Header />
        <Navbar />
        <NewsTicker />

        {/* 🔥 ONLY HERE GRID EXISTS */}
        <div className="grid grid-cols-12 gap-3 p-3">

          <div className="col-span-3">
            <LeftSidebar />
          </div>

          <div className="col-span-6">
            {children}  {/* 👈 pages render here */}
          </div>

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