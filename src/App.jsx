import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { useContext } from "react";
import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Login from "./components/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Tasks from "./pages/Tasks";
import AdminPanel from "./pages/AdminPanel";
import InventoryPage from "./pages/InventoryPage";
import "./index.css";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/inventory"
        element={
          <ProtectedRoute>
            <InventoryPage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            {user?.role === "admin" ? <AdminPanel /> : <Navigate to="/home" />}
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function AppContent() {
  const location = useLocation();
  const showNavbar = location.pathname !== "/login";

  return (
    <>
      <Navbar showMinimal={!showNavbar} />
      <div className="app-container">
        <AppRoutes />
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <TaskProvider>
          <Router>
            <AppContent />
          </Router>
        </TaskProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
