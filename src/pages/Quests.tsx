
import { motion } from "framer-motion";
import { useMovement } from "@/context/MovementContext";
import QuestCard from "@/components/QuestCard";
import { Plus } from "lucide-react";

const Quests = () => {
  const { stones, quests, currentUser, toggleActiveQuest, updateQuestProgress } = useMovement();
  
  // Split quests into active, completed, and other
  const activeQuests = quests.filter(quest => 
    currentUser.activeQuests.includes(quest.id) && !quest.completed
  );
  
  const completedQuests = quests.filter(quest => quest.completed);
  
  const otherQuests = quests.filter(quest => 
    !currentUser.activeQuests.includes(quest.id) && !quest.completed
  );
  
  return (
    <div className="min-h-[calc(100vh-64px)] pb-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-apex-gold mb-2">Active Quests</h1>
        <p className="text-apex-darkGold">Track specific skills and movement goals</p>
      </header>
      
      {activeQuests.length > 0 && (
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-bold text-apex-gold mb-3">Active Quests</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeQuests.map(quest => (
              <QuestCard
                key={quest.id}
                quest={quest}
                stones={stones}
                isActive={true}
                onToggleActive={() => toggleActiveQuest(quest.id)}
                onUpdateProgress={(progress) => updateQuestProgress(quest.id, progress)}
              />
            ))}
          </div>
        </motion.div>
      )}
      
      {otherQuests.length > 0 && (
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2 className="text-xl font-bold text-apex-gold mb-3">Available Quests</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherQuests.map(quest => (
              <QuestCard
                key={quest.id}
                quest={quest}
                stones={stones}
                isActive={false}
                onToggleActive={() => toggleActiveQuest(quest.id)}
                onUpdateProgress={(progress) => updateQuestProgress(quest.id, progress)}
              />
            ))}
          </div>
        </motion.div>
      )}
      
      {completedQuests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-apex-gold mb-3">Completed Quests</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedQuests.map(quest => (
              <QuestCard
                key={quest.id}
                quest={quest}
                stones={stones}
                isActive={false}
                onToggleActive={() => toggleActiveQuest(quest.id)}
                onUpdateProgress={(progress) => updateQuestProgress(quest.id, progress)}
              />
            ))}
          </div>
        </motion.div>
      )}
      
      <motion.button
        className="fixed right-4 bottom-20 w-12 h-12 rounded-full bg-apex-gold text-apex-black flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Plus size={24} />
      </motion.button>
    </div>
  );
};

export default Quests;
