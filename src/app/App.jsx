import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { TaskProvider } from "../context/TaskContext";
import { ThemeProvider } from "../context/ThemeContext";
import LoadingSpinner from "../components/LoadingSpinner";
import AppRoutes from "./routes";

function AppContent() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoad(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return isInitialLoad ? (
    <LoadingSpinner label="Initializing..." />
  ) : (
    <AppRoutes />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <TaskProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TaskProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
