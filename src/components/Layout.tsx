
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

export const Layout = () => {
  return (
    <div className="min-h-screen bg-apex-black text-apex-gold flex flex-col">
      <motion.div 
        className="fixed inset-0 overflow-hidden -z-10 opacity-20 movement-flow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5 }}
      />
      
      <main className="flex-1 flex flex-col max-w-5xl w-full mx-auto p-4 sm:p-6">
        <Outlet />
      </main>
      
      <Navbar />
    </div>
  );
};
