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
      <div className="max-w-screen-xl mx-auto bg-white shadow-md min-h-screen flex flex-col">
        <Header />
        <Navbar />
        <NewsTicker />

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-3 md:p-4 flex-1">
          <aside className="lg:col-span-3 order-2 lg:order-1">
            <LeftSidebar />
          </aside>

          <section className="lg:col-span-6 order-1 lg:order-2 min-w-0">
            <Outlet />
          </section>

          <aside className="lg:col-span-3 order-3">
            <RightSidebar />
          </aside>
        </main>

        <MapSection />
        <Footer />
      </div>
    </div>
  );
}