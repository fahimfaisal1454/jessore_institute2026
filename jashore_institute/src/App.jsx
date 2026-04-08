import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";
import PageLayout from "./layouts/PageLayout";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";

import Members from "./pages/Members";
import Gallery from "./pages/Gallery";
import News from "./pages/News";
import Notice from "./pages/Notice";
import Contact from "./pages/Contact";
import History from "./pages/History";
import Mission from "./pages/Mission";
import PresidentList from "./pages/PresidentList";
import SecretaryList from "./pages/SecretaryList";
import LibraryPage from "./pages/LibraryPage";
import SportsPage from "./pages/SportsPage";
import DramaPage from "./pages/DramaPage";
import TownClubPage from "./pages/TownClubPage";
import KidsPage from "./pages/KidsPage";
import Committee from "./pages/Committee";
import CommitteeOld from "./pages/CommitteeOld";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ✅ ONLY HOME uses MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* ✅ ALL NAVBAR PAGES use PageLayout */}
        <Route element={<PageLayout />}>
        <Route path="/history" element={<History />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/president-list" element={<PresidentList />} />
        <Route path="/secretary-list" element={<SecretaryList />} />
          <Route path="/about" element={<About />} />
          
          <Route path="/members" element={<Members />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/news" element={<News />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/sports" element={<SportsPage />} />
          <Route path="/drama" element={<DramaPage />} />
          <Route path="/townclub" element={<TownClubPage />} />
          <Route path="/kids" element={<KidsPage />} />
      <Route path="/committee" element={<Committee />} />
      <Route path="/committee-old" element={<CommitteeOld />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;