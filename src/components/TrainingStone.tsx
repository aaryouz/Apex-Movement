
import { motion } from "framer-motion";
import { Stone } from "@/data/mockData";

type TrainingStoneProps = {
  stone: Stone;
  isCompleted: boolean;
  onToggle: () => void;
};

const TrainingStone = ({ stone, isCompleted, onToggle }: TrainingStoneProps) => {
  return (
    <motion.button
      onClick={onToggle}
      className={`relative stone-ring rounded-full w-24 h-24 flex flex-col items-center justify-center ${
        isCompleted 
          ? "bg-apex-stone text-apex-accent border-2 border-apex-accent" 
          : "bg-apex-black text-apex-darkGold border-2 border-apex-stone"
      }`}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      <span className="text-2xl mb-1">{stone.icon}</span>
      <h3 className="text-sm font-medium">{stone.name}</h3>
      
      {isCompleted && (
        <motion.div 
          className="absolute inset-0 rounded-full border-4 border-apex-accent opacity-30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0.3, 0.1, 0.3], scale: 1 }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      )}
    </motion.button>
  );
};

export default TrainingStone;
