import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";
import NotePage from "./pages/NotePage";  // You already have this

function App() {
  return (
    <Router>
      <Routes>

        {/* Redirect root to notes */}
        <Route path="/" element={<Navigate to="/notes" />} />

        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Route (Home Page or Notes Page) */}
        <Route
          path="/notes/*"
          element={
            <ProtectedRoute>
              <NotePage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
