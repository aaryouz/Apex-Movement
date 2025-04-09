
import { motion } from "framer-motion";
import { Stone, TrainingLog } from "@/data/mockData";

type DateCellProps = {
  date: string;
  log?: TrainingLog;
  stones: Stone[];
  onClick?: () => void;
  active?: boolean;
};

const DateCell = ({ date, log, stones, onClick, active = false }: DateCellProps) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const isToday = new Date().toISOString().split('T')[0] === date;
  
  const completedStones = log?.completedStones || [];
  const completionCount = completedStones.length;
  const maxStones = stones.length;
  const completionPercentage = maxStones > 0 ? (completionCount / maxStones) * 100 : 0;
  
  // Determine cell appearance based on completion
  let cellAppearance = "bg-apex-black border-apex-stone";
  if (completionCount > 0) {
    if (completionPercentage >= 75) {
      cellAppearance = "bg-apex-stone border-apex-accent";
    } else if (completionPercentage >= 40) {
      cellAppearance = "bg-apex-stone/60 border-apex-darkGold";
    } else {
      cellAppearance = "bg-apex-stone/30 border-apex-stone";
    }
  }
  
  if (active) {
    cellAppearance = "bg-apex-stone border-apex-accent";
  }
  
  if (isToday) {
    cellAppearance += " ring-2 ring-apex-gold";
  }
  
  return (
    <motion.div 
      className={`relative aspect-square rounded-md flex flex-col items-center justify-center cursor-pointer overflow-hidden border ${cellAppearance}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className={`text-sm font-medium ${completionCount > 0 ? "text-apex-gold" : "text-apex-darkGold"}`}>
        {day}
      </span>
      
      {completionCount > 0 && (
        <div className="flex mt-1 gap-0.5">
          {completionCount > 3 ? (
            <span className="text-xs text-apex-accent">
              {completionCount}/{maxStones}
            </span>
          ) : (
            completedStones.slice(0, 3).map((stoneId) => (
              <span key={stoneId} className="w-1.5 h-1.5 rounded-full bg-apex-accent"/>
            ))
          )}
        </div>
      )}
    </motion.div>
  );
};

export default DateCell;
