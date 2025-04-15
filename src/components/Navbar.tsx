import { Link, useLocation } from "react-router-dom";
import { CalendarDays, FlameKindling } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { to: "/", label: "Today", icon: FlameKindling },
    { to: "/calendar", label: "Calendar", icon: CalendarDays },
  ];

  return (
    <div className="sticky bottom-0 w-full bg-apex-black border-t border-apex-stone py-2 px-4 z-50">
      <nav className="max-w-5xl mx-auto">
        <ul className="flex justify-center gap-16 items-center">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            const Icon = item.icon;
            
            return (
              <li key={item.to} className="relative">
                <Link
                  to={item.to}
                  className={`flex flex-col items-center text-sm p-2 relative ${
                    isActive ? "text-apex-accent" : "text-apex-darkGold"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute inset-0 bg-apex-stone rounded-md -z-10"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  <Icon size={24} className="mb-1" />
                  <span className="text-xs">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
