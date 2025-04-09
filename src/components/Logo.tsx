
import { motion } from "framer-motion";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
};

const Logo = ({ size = "md", animated = true }: LogoProps) => {
  const sizesMap = {
    sm: "h-8",
    md: "h-12",
    lg: "h-20",
  };
  
  return (
    <div className="flex items-center gap-2">
      <div className={`relative ${sizesMap[size]}`}>
        <img 
          src="/lovable-uploads/b2ce79c8-d067-4d35-9976-b38a22d22191.png" 
          alt="Apex Movement Logo" 
          className={`${sizesMap[size]} object-contain ${animated ? 'animate-pulse-subtle' : ''}`}
        />
      </div>
      <div className="flex flex-col">
        <motion.h1 
          className={`font-display font-extrabold tracking-tighter leading-none text-apex-gold ${
            size === "sm" ? "text-lg" : size === "md" ? "text-2xl" : "text-4xl"
          }`}
          initial={animated ? { opacity: 0, y: 5 } : false}
          animate={animated ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.5 }}
        >
          APEX MOVEMENT
        </motion.h1>
        <motion.p 
          className={`text-apex-darkGold font-medium italic leading-tight ${
            size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base"
          }`}
          initial={animated ? { opacity: 0, y: 5 } : false}
          animate={animated ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Move Like You Own the World
        </motion.p>
      </div>
    </div>
  );
};

export default Logo;
