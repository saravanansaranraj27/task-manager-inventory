import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import BackToTop from "../components/BackToTop";

function AppLayout() {
  const location = useLocation();
  const showNavbar = location.pathname !== "/login";

  return (
    <>
      <Navbar showMinimal={!showNavbar} />
      <main className="app-shell">
        <Outlet />
      </main>
      <BackToTop />
    </>
  );
}

export default AppLayout;
