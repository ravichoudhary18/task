import { Outlet } from "react-router-dom";
import { PublicRoute } from "../auth/authorization";

export default function PublicLayout() {
  return (
    <PublicRoute>
      <div className="relative min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 overflow-hidden">
          <Outlet />
      </div>
    </PublicRoute>
  );
}
