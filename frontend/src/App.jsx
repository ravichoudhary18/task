import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./auth/login/LoginPage";
import RegisterPage from "./auth/register/RegisterPage";
import Task from "./tasks/Tasks";

import PrivateLayout from "./layouts/PrivateLayout";
import PublicLayout from "./layouts/PublicLayout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Private routes */}
        <Route element={<PrivateLayout />}>
          <Route path="/task" element={<Task />} />
          {/* add more protected routes here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
