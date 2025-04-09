
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-apex-black">
      <Logo size="lg" />
      
      <motion.div 
        className="text-center mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-5xl font-bold text-apex-gold mb-4">404</h1>
        <p className="text-xl text-apex-darkGold mb-8">Movement pattern interrupted</p>
        <Link 
          to="/" 
          className="inline-block px-6 py-3 bg-apex-stone text-apex-gold hover:bg-apex-gold hover:text-apex-black transition-colors rounded-md"
        >
          Return to Flow
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
