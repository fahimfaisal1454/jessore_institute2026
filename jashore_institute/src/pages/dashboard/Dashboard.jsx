import Sidebar from "../../components/dashboard/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">
          Jashore Institute Dashboard
        </h1>

        <p className="text-gray-600">
          Welcome to the admin panel. Manage your website content from here.
        </p>
      </div>
    </div>
  );
}