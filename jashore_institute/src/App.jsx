import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";
import PageLayout from "./layouts/PageLayout";
import AdminLayout from "./layouts/AdminLayout";
// 🔐 NEW IMPORTS (ADD THESE)
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./auth/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Notice from "./pages/notice/Notice";
import History from "./pages/aboutus/History";
import Mission from "./pages/aboutus/Mission";
import PresidentList from "./pages/oldPresnSecList/PresidentList";
import SecretaryList from "./pages/oldPresnSecList/SecretaryList";
import LibraryPage from "./pages/olddivsecretary/LibraryPage";
import SportsPage from "./pages/olddivsecretary/SportsPage";
import DramaPage from "./pages/olddivsecretary/DramaPage";
import TownClubPage from "./pages/olddivsecretary/TownClubPage";
import KidsPage from "./pages/olddivsecretary/KidsPage";
import Committee from "./pages/committee/Committee";
import CommitteeOld from "./pages/committee/CommitteeOld";
import Library from "./pages/subcommittee/Library";
import LibraryOld from "./pages/subcommittee/LibraryOld";
import Sports from "./pages/subcommittee/Sports";
import SportsOld from "./pages/subcommittee/SportsOld";
import Drama from "./pages/subcommittee/Drama";
import DramaOld from "./pages/subcommittee/DramaOld";
import Town from "./pages/subcommittee/Town";
import TownOld from "./pages/subcommittee/TownOld";
import Issue from "./pages/subcommittee/Issue";
import IssueOld from "./pages/subcommittee/IssueOld";
import Photos from "./pages/aboutus/Photos";
import Videos from "./pages/aboutus/Videos";
import FieldApplication from "./pages/application/FieldApplication";
import LeaveApplication from "./pages/application/LeaveApplication";
import JadunathMajumdar from "./pages/aboutus/JadunathMajumdar";
import LibraryDetails from "./pages/aboutus/LibraryDetails";
import OldCommitteeList from "./pages/committee/OldCommitteeList";

// Sidebar pages
import LibraryDiv from "./pages/leftSidebar/LibraryDiv";
import SportsDiv from "./pages/leftSidebar/SportsDiv";
import DramaDiv from "./pages/leftSidebar/DramaDiv";
import TownClubDiv from "./pages/leftSidebar/TownClubDiv";
import KidsZoneDiv from "./pages/leftSidebar/KidsZoneDiv";

// Members
import DonorMember from "./pages/leftSidebar/members/DonorMember";
import LifetimeMember from "./pages/leftSidebar/members/LifetimeMember";
import GeneralMember from "./pages/leftSidebar/members/GeneralMember";
import VoterList from "./pages/leftSidebar/VoterList";
import LibraryMember from "./pages/leftSidebar/members/LibraryMember";
import SportsMember from "./pages/leftSidebar/members/SportsMember";
import DramaMember from "./pages/leftSidebar/members/DramaMember";
import TownClubMember from "./pages/leftSidebar/members/TownClubMember";
import KidsMember from "./pages/leftSidebar/members/KidsMember";

// Committee list
import CommitteePresidentList from "./pages/committeeList/PresidentList";
import CommitteeSecretaryList from "./pages/committeeList/SecretaryList";
import LibrarySecretary from "./pages/committeeList/LibrarySecretary";
import SportsSecretary from "./pages/committeeList/SportsSecretary";
import DramaSecretary from "./pages/committeeList/DramaSecretary";
import TownSecretary from "./pages/committeeList/TownSecretary";
import KidsSecretary from "./pages/committeeList/KidsSecretary";

// Right sidebar
import ContactPage from "./pages/rightSidebar/ContactPage";
import PrimarySchoolPage from "./pages/rightSidebar/PrimarySchoolPage";
import AnnualReportPage from "./pages/rightSidebar/AnnualReportPage";
import OpenLibertyStagePage from "./pages/rightSidebar/OpenLibertyStagePage";

// ✅ ADMIN CMS (ADD THESE)
import AboutUsForm from "./pages/dashboard/about/AboutUsForm";
import PersonForm from "./pages/dashboard/about/PersonForm";
import PhotoForm from "./pages/dashboard/about/PhotoForm";
import AnnualReportForm from "./pages/dashboard/about/AnnualReportForm";
import ApplicationFormForm from "./pages/dashboard/about/ApplicationFormForm";
import InfoPageForm from "./pages/dashboard/about/InfoPageForm";
import VideoForm from "./pages/dashboard/about/VideoForm";
import ContactMessageAdmin from "./pages/dashboard/about/ContactMessageAdmin";
import ExecutiveCommitteeForm from "./pages/dashboard/committee/ExecutiveCommitteeForm";
import CommitteeMemberForm from "./pages/dashboard/committee/CommitteeMemberForm";
import OldCommitteeForm from "./pages/dashboard/committee/OldCommitteeForm";
import SubCommitteeMemberForm from "./pages/dashboard/committee/SubCommitteeMemberForm";
import SubCommitteeDocumentForm from "./pages/dashboard/committee/SubCommitteeDocumentForm";
import SubCommitteeCategoryForm from "./pages/dashboard/committee/SubCommitteeCategoryForm";
import NoticeForm from "./pages/dashboard/notice/NoticeForm";
import MemberForm from "./pages/dashboard/members/MemberForm";
import VoterForm from "./pages/dashboard/members/VoterForm";
import DivisionForm from "./pages/dashboard/division/DivisionForm";
import OldCommitteeForms from "./pages/dashboard/oldcommittee/OldCommitteeForm";
import OldCommitteeCategory from "./pages/dashboard/oldcommittee/OldCommitteeCategory";
import LibraryForm from "./pages/dashboard/about/LibraryForm";
import CommitteeList from "./pages/dashboard/committee/CommitteeList";
import UserManagement from "./pages/dashboard/users/UserManagement";
import MemberList from "./pages/dashboard/members/MemberList";
import HeroSliderForm from "./pages/dashboard/about/HeroSliderForm";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔐 LOGIN (NO LAYOUT) */}
        <Route path="/login" element={<Login />} />

       {/* 🔐 DASHBOARD (WITH CHILD ROUTES) */}
<Route
  path="/dashboard"
  element={
<ProtectedRoute allowedRoles={["superadmin", "admin"]}>
  <AdminLayout />
</ProtectedRoute>
  }
>
  {/* DEFAULT */}
  <Route index element={<h2 className="p-4">Welcome Admin</h2>} />

  {/* ABOUT CMS */}
  <Route path="about" element={<AboutUsForm />} />
  <Route path="person" element={<PersonForm />} />
  <Route path="photos" element={<PhotoForm />} />
  <Route path="reports" element={<AnnualReportForm />} /> 
  <Route path="forms" element={<ApplicationFormForm />} />
  <Route path="infopages" element={<InfoPageForm />} />
  <Route path="videos" element={<VideoForm />} />
  <Route path="contact" element={<ContactMessageAdmin />} />
  <Route path="committee/executive" element={<ExecutiveCommitteeForm />} />
  <Route path="/dashboard/committee/members" element={<CommitteeMemberForm />} />
<Route path="/dashboard/committee/list" element={<CommitteeList />} />
<Route path="/dashboard/committee/old" element={<OldCommitteeForm />} />
<Route path="/dashboard/committee/sub-members" element={<SubCommitteeMemberForm />} />
<Route path="/dashboard/committee/sub-docs" element={<SubCommitteeDocumentForm />} />
<Route path="committee/sub-categories" element={<SubCommitteeCategoryForm />} />
<Route path="/dashboard/notices" element={<NoticeForm />} />
        <Route path="members" element={<MemberForm />} />
        <Route path="voters" element={<VoterForm />} />
        <Route path="/dashboard/divisions" element={<DivisionForm />} />
        <Route path="/dashboard/old-committee" element={<OldCommitteeForms />} />
        <Route path="/dashboard/old-committee-categories" element={<OldCommitteeCategory />} />
<Route path="/dashboard/library" element={<LibraryForm />} />
<Route path="/dashboard/members/list" element={<MemberList />} />
<Route path="members/edit/:id" element={<MemberForm />} />
<Route path="members/view/:id" element={<MemberForm />} />
<Route path="/dashboard/hero-slider" element={<HeroSliderForm />} />

<Route
  path="users"
  element={
    <ProtectedRoute allowedRoles={["superadmin"]}>
      <UserManagement />
    </ProtectedRoute>
  }
/>

</Route>

        {/* ✅ HOME */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* ✅ ALL PUBLIC PAGES */}
        <Route element={<PageLayout />}>
          <Route path="/history" element={<History />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/president-list" element={<PresidentList />} />
          <Route path="/secretary-list" element={<SecretaryList />} />
          <Route path="/notice" element={<Notice />} />

          <Route path="/library-page" element={<LibraryPage />} />
          <Route path="/sports-page" element={<SportsPage />} />
          <Route path="/drama-page" element={<DramaPage />} />
          <Route path="/townclub-page" element={<TownClubPage />} />
          <Route path="/kids-page" element={<KidsPage />} />

          <Route path="/committee" element={<Committee />} />
          <Route path="/committee-old" element={<CommitteeOld />} />

          <Route path="/library" element={<Library />} />
          <Route path="/lib-old" element={<LibraryOld />} />

          <Route path="/sports" element={<Sports />} />
          <Route path="/sports-old" element={<SportsOld />} />

          <Route path="/drama" element={<Drama />} />
          <Route path="/drama-old" element={<DramaOld />} />

          <Route path="/town" element={<Town />} />
          <Route path="/town-old" element={<TownOld />} />

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

          <Route path="/Donor-member" element={<DonorMember />} />
          <Route path="/lifetime-member" element={<LifetimeMember />} />
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
          <Route path="/library-details" element={<LibraryDetails />} />
          <Route path="/committee-old/:committeeId"element={<OldCommitteeList />}/>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;