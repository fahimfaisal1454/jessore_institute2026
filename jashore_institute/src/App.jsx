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
// import Contact from "./pages/Contact";
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
import Library from "./pages/Library";
import LibraryOld from "./pages/LibraryOld";

// Sports
import Sports from "./pages/Sports";
import SportsOld from "./pages/SportsOld";

// Drama
import Drama from "./pages/Drama";
import DramaOld from "./pages/DramaOld";

// Town
import Town from "./pages/Town";
import TownOld from "./pages/TownOld";

// Issue বিভাগ
import Issue from "./pages/Issue";
import IssueOld from "./pages/IssueOld";
import Photos from "./pages/Photos";
import Videos from "./pages/Videos";

import FieldApplication from "./pages/FieldApplication";
import LeaveApplication from "./pages/LeaveApplication";
import JadunathMajumdar from "./pages/JadunathMajumdar";

// Right Sidebar Pages
import LibraryDiv from "./pages/leftSidebar/LibraryDiv";
import SportsDiv from "./pages/leftSidebar/SportsDiv";
import DramaDiv from "./pages/leftSidebar/DramaDiv";
import TownClubDiv from "./pages/leftSidebar/TownClubDiv";
import KidsZoneDiv from "./pages/leftSidebar/KidsZoneDiv";
import LifeMember from "./pages/leftSidebar/members/LifeMember";
import AnnualMember from "./pages/leftSidebar/members/AnnualMember";
import GeneralMember from "./pages/leftSidebar/members/GeneralMember";
import VoterList from "./pages/leftSidebar/VoterList";
import LibraryMember from "./pages/leftSidebar/members/LibraryMember";
import SportsMember from "./pages/leftSidebar/members/SportsMember";
import DramaMember from "./pages/leftSidebar/members/DramaMember";
import TownClubMember from "./pages/leftSidebar/members/TownClubMember";
import KidsMember from "./pages/leftSidebar/members/KidsMember";

// Committee Secretary Pages
import CommitteePresidentList from "./pages/committeeList/PresidentList";
import CommitteeSecretaryList from "./pages/committeeList/SecretaryList";
import LibrarySecretary from "./pages/committeeList/LibrarySecretary";
import SportsSecretary from "./pages/committeeList/SportsSecretary";
import DramaSecretary from "./pages/committeeList/DramaSecretary";
import TownSecretary from "./pages/committeeList/TownSecretary";
import KidsSecretary from "./pages/committeeList/KidsSecretary";

//rightsidebar 
import ContactPage from "./pages/rightSidebar/ContactPage";
import PrimarySchoolPage from "./pages/rightSidebar/PrimarySchoolPage";
import AnnualReportPage from "./pages/rightSidebar/AnnualReportPage";
import OpenLibertyStagePage from "./pages/rightSidebar/OpenLibertyStagePage";
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
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="/library-page" element={<LibraryPage />} />
          <Route path="/sports-page" element={<SportsPage />} />
          <Route path="/drama-page" element={<DramaPage />} />
          <Route path="/townclub-page" element={<TownClubPage />} />
          <Route path="/kids-page" element={<KidsPage />} />
      <Route path="/committee" element={<Committee />} />
      <Route path="/committee-old" element={<CommitteeOld />} />
 {/* Library */}
          <Route path="/library" element={<Library />} />
          <Route path="/lib-old" element={<LibraryOld />} />

          {/* Sports */}
          <Route path="/sports" element={<Sports />} />
          <Route path="/sports-old" element={<SportsOld />} />

          {/* Drama */}
          <Route path="/drama" element={<Drama />} />
          <Route path="/drama-old" element={<DramaOld />} />

          {/* Town */}
          <Route path="/town" element={<Town />} />
          <Route path="/town-old" element={<TownOld />} />

          {/* Issue */}
          <Route path="/issue" element={<Issue />} />
          <Route path="/issue-old" element={<IssueOld />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/videos" element={<Videos />} />

          <Route path="/field-application" element={<FieldApplication />} />
          <Route path="/leave-application" element={<LeaveApplication />} />
          <Route path="/jadunathmajumdar" element={<JadunathMajumdar />} />

          <Route path="/library-division" element={<LibraryDiv />} />
          <Route path="/sports-division" element={<SportsDiv />} />
<Route path="/drama-division" element={<DramaDiv />} />
<Route path="/townclub-division" element={<TownClubDiv />} />
<Route path="/kids-division" element={<KidsZoneDiv />} />
<Route path="/life-member" element={<LifeMember />} />
<Route path="/annual-member" element={<AnnualMember />} />
<Route path="/general-member" element={<GeneralMember />} />
<Route path="/voter-list" element={<VoterList />} />
<Route path="/library-member" element={<LibraryMember />} />
<Route path="/sports-member" element={<SportsMember />} />
<Route path="/drama-member" element={<DramaMember />} />
<Route path="/town-member" element={<TownClubMember />} />
<Route path="/kids-member" element={<KidsMember />} />
<Route path="/president-lists" element={<CommitteePresidentList />} />
<Route path="/secretary-lists" element={<CommitteeSecretaryList />} />
<Route path="/library-secretary" element={<LibrarySecretary />} />
<Route path="/sports-secretary" element={<SportsSecretary />} />
<Route path="/drama-secretary" element={<DramaSecretary />} />
<Route path="/town-secretary" element={<TownSecretary />} />
<Route path="/kids-secretary" element={<KidsSecretary />} />
<Route path="/contact" element={<ContactPage />} />
<Route path="/primary-school" element={<PrimarySchoolPage />} />
<Route path="/annual-report" element={<AnnualReportPage />} />
<Route path="/open-liberty-stage" element={<OpenLibertyStagePage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;