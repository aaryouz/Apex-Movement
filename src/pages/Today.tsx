
import { useState } from "react";
import { motion } from "framer-motion";
import { useMovement } from "@/context/MovementContext";
import TrainingStone from "@/components/TrainingStone";
import { CalendarDays, Save } from "lucide-react";
import Logo from "@/components/Logo";
import { Link } from "react-router-dom";

const Today = () => {
  const { stones, todayLog, toggleStone, addTrainingNote } = useMovement();
  const [notes, setNotes] = useState(todayLog.notes || "");
  
  const handleToggleStone = (stoneId: string) => {
    toggleStone(stoneId);
  };
  
  const handleSaveNotes = () => {
    addTrainingNote(todayLog.date, notes);
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
  const percentComplete = Math.round((completedCount / totalCount) * 100);
  
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col">
      <header className="flex flex-col items-center mb-8 mt-4">
        <Logo />
      </header>
      
      <motion.div 
        className="mb-6 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex justify-center items-center gap-2">
          <h2 className="text-2xl text-apex-gold">{formattedDate}</h2>
          <Link to="/calendar">
            <CalendarDays className="text-apex-darkGold hover:text-apex-gold transition-colors" />
          </Link>
        </div>
        <p className="text-apex-darkGold mt-1">
          {completedCount > 0 ? `${completedCount}/${totalCount} stones completed (${percentComplete}%)` : "No stones completed yet"}
        </p>
      </motion.div>
      
      <div className="flex-1">
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
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
        
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-apex-gold">Training Notes</h3>
            <button 
              onClick={handleSaveNotes}
              className="flex items-center gap-1 bg-apex-stone px-3 py-1 rounded-md text-apex-gold text-sm hover:bg-apex-accent hover:text-apex-black transition-colors"
            >
              <Save size={14} />
              <span>Save</span>
            </button>
          </div>
          
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How did your training feel today? Any breakthroughs?"
            className="w-full h-24 px-3 py-2 bg-apex-stone text-apex-gold border border-apex-darkGold rounded-md resize-none focus:outline-none focus:border-apex-accent"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Today;
