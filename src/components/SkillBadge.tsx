
import { motion } from "framer-motion";
import { Skill } from "@/data/mockData";

type SkillBadgeProps = {
  skill: Skill;
  onClick?: () => void;
};

const SkillBadge = ({ skill, onClick }: SkillBadgeProps) => {
  // Visual representation of skill level (1-5)
  const levelDots = Array.from({ length: 5 }, (_, i) => i < skill.level);
  
  // Map categories to colors
  const categoryColors: Record<string, string> = {
    mobility: "from-blue-400/20 to-blue-600/10 border-blue-500/30",
    strength: "from-red-400/20 to-red-600/10 border-red-500/30",
    coordination: "from-purple-400/20 to-purple-600/10 border-purple-500/30",
    balance: "from-amber-400/20 to-amber-600/10 border-amber-500/30",
    power: "from-orange-400/20 to-orange-600/10 border-orange-500/30",
    rhythm: "from-pink-400/20 to-pink-600/10 border-pink-500/30",
    core: "from-emerald-400/20 to-emerald-600/10 border-emerald-500/30",
    flow: "from-indigo-400/20 to-indigo-600/10 border-indigo-500/30"
  };
  
  const colorClass = categoryColors[skill.category] || "from-slate-400/20 to-slate-600/10 border-slate-500/30";
  
  return (
    <motion.div
      className={`px-4 py-3 rounded-lg bg-gradient-to-br ${colorClass} border cursor-pointer`}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-bold text-apex-gold">{skill.name}</h3>
        <span className="text-xs uppercase bg-apex-black px-2 py-0.5 rounded text-apex-darkGold">
          {skill.category}
        </span>
      </div>
      
      <p className="text-xs text-apex-darkGold mt-1 mb-2">{skill.description}</p>
      
      <div className="flex gap-1">
        {levelDots.map((isActive, idx) => (
          <span 
            key={idx} 
            className={`w-2 h-2 rounded-full ${
              isActive ? "bg-apex-accent" : "bg-apex-stone"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default SkillBadge;
