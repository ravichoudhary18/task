import { Outlet } from "react-router-dom";
import { ProtectedRoute } from "../auth/authorization";
import Header from "../components/header/Header";

export default function PrivateLayout() {
  return (
    <ProtectedRoute>
      <div className="flex flex-col md:flex-row h-screen bg-gray-100">
        {/* Sidebar can be added here if needed */}
        <div className="flex flex-col flex-1 min-h-0">
          {/* Navbar */}
          <Header />

          {/* Main content */}
          <main className="flex-1 p-4 md:p-6 overflow-y-auto min-h-0">
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
