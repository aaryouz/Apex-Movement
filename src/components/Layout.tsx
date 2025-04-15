import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export const Layout = () => {
  return (
    <div className="min-h-screen bg-apex-black text-apex-gold">
      <main className="max-w-2xl mx-auto">
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
};

export default Layout;
