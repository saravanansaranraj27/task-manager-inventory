import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import ProtectedRoute from "../components/ProtectedRoute";
import AppLayout from "../layouts/AppLayout";
import { USER_ROLES } from "../constants/app";

const Login = lazy(() => import("../pages/Login"));
const Home = lazy(() => import("../pages/Home"));
const Intro = lazy(() => import("../pages/Intro"));
const Profile = lazy(() => import("../pages/Profile"));
const Tasks = lazy(() => import("../pages/Tasks"));
const AdminPanel = lazy(() => import("../pages/AdminPanel"));
const InventoryPage = lazy(() => import("../pages/InventoryPage"));

function ProtectedPage({ children, requiredRole }) {
  return (
    <ProtectedRoute requiredRole={requiredRole}>{children}</ProtectedRoute>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedPage>
                <Home />
              </ProtectedPage>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedPage>
                <Home />
              </ProtectedPage>
            }
          />
          <Route
            path="/intro"
            element={
              <ProtectedPage>
                <Intro />
              </ProtectedPage>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedPage>
                <Tasks />
              </ProtectedPage>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedPage>
                <Profile />
              </ProtectedPage>
            }
          />
          <Route
            path="/inventory"
            element={
              <ProtectedPage>
                <InventoryPage />
              </ProtectedPage>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedPage requiredRole={USER_ROLES.ADMIN}>
                <AdminPanel />
              </ProtectedPage>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
}
