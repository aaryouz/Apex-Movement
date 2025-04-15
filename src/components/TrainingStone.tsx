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
      className={`w-full h-32 rounded-lg flex flex-col items-center justify-center ${
        isCompleted 
          ? "bg-apex-accent text-apex-black" 
          : "bg-apex-stone text-apex-darkGold hover:bg-apex-stone/80"
      } transition-colors`}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", duration: 0.4 }}
    >
      <span className="text-3xl mb-2">{stone.icon}</span>
      <h3 className="text-sm font-medium">{stone.name}</h3>
    </motion.button>
  );
};

export default TrainingStone;
