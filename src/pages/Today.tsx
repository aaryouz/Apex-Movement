import { useState } from "react";
import { motion } from "framer-motion";
import { useMovement } from "@/context/MovementContext";
import TrainingStone from "@/components/TrainingStone";
import { CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

const Today = () => {
  const { stones, todayLog, toggleStone } = useMovement();
  
  const handleToggleStone = (stoneId: string) => {
    toggleStone(stoneId);
  };
  
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });
  
  // Get completion stats
  const completedCount = todayLog.completedStones.length;
  const totalCount = stones.length;
  
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col p-4">
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl text-apex-gold">{formattedDate}</h2>
          <Link to="/calendar" className="text-apex-darkGold hover:text-apex-gold transition-colors">
            <CalendarDays size={24} />
          </Link>
        </div>
        <p className="text-apex-darkGold mt-1 text-sm">
          {completedCount}/{totalCount} movements completed
        </p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-2 gap-4 justify-items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
      >
        {stones.map((stone) => (
          <TrainingStone
            key={stone.id}
            stone={stone}
            isCompleted={todayLog.completedStones.includes(stone.id)}
            onToggle={() => handleToggleStone(stone.id)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Today;
