
import { motion } from "framer-motion";
import { Quest, Stone } from "@/data/mockData";
import { Check, Target } from "lucide-react";

type QuestCardProps = {
  quest: Quest;
  stones: Stone[];
  isActive: boolean;
  onToggleActive: () => void;
  onUpdateProgress: (progress: number) => void;
};

const QuestCard = ({ 
  quest, 
  stones, 
  isActive, 
  onToggleActive, 
  onUpdateProgress 
}: QuestCardProps) => {
  const relatedStones = stones.filter(stone => 
    quest.relatedStones.includes(stone.id)
  );
  
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    onUpdateProgress(value);
  };
  
  return (
    <motion.div 
      className={`border rounded-lg p-4 ${
        isActive 
          ? "border-apex-accent bg-gradient-to-b from-apex-stone to-apex-black" 
          : "border-apex-stone bg-apex-black"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-apex-gold">{quest.name}</h3>
        
        <motion.button
          onClick={onToggleActive}
          className={`p-2 rounded-md ${
            isActive ? "bg-apex-accent text-apex-black" : "bg-apex-stone text-apex-darkGold"
          }`}
          whileTap={{ scale: 0.95 }}
        >
          {quest.completed ? <Check size={16} /> : <Target size={16} />}
        </motion.button>
      </div>
      
      <p className="text-sm text-apex-darkGold mb-4">{quest.description}</p>
      
      {quest.targetDate && (
        <div className="mb-4 text-xs text-apex-darkGold">
          Target: {new Date(quest.targetDate).toLocaleDateString()}
        </div>
      )}
      
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-apex-darkGold">Progress</span>
          <span className="text-apex-gold">{quest.progress}%</span>
        </div>
        
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={quest.progress} 
          onChange={handleProgressChange}
          className="w-full h-2 bg-apex-stone rounded-md appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, hsl(var(--accent)) 0%, hsl(var(--accent)) ${quest.progress}%, hsl(var(--secondary)) ${quest.progress}%, hsl(var(--secondary)) 100%)`
          }}
        />
      </div>
      
      {relatedStones.length > 0 && (
        <div className="mt-3">
          <span className="text-xs text-apex-darkGold block mb-1">Related Stones:</span>
          <div className="flex flex-wrap gap-1">
            {relatedStones.map(stone => (
              <span 
                key={stone.id} 
                className="text-xs bg-apex-stone px-2 py-1 rounded text-apex-gold"
              >
                {stone.icon} {stone.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default QuestCard;
