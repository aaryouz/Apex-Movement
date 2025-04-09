
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { 
  stones, 
  trainingLogs as initialTrainingLogs, 
  currentUser as initialUser,
  quests as initialQuests,
  toggleStone as toggleStoneUtil,
  TrainingLog,
  Stone,
  User,
  Quest
} from "../data/mockData";

type MovementContextType = {
  stones: Stone[];
  trainingLogs: TrainingLog[];
  currentUser: User;
  quests: Quest[];
  todayLog: TrainingLog;
  toggleStone: (stoneId: string, date?: string) => void;
  updateQuestProgress: (questId: string, progress: number) => void;
  toggleActiveQuest: (questId: string) => void;
  addTrainingNote: (date: string, note: string) => void;
};

const MovementContext = createContext<MovementContextType | undefined>(undefined);

export const MovementProvider = ({ children }: { children: ReactNode }) => {
  const [trainingLogs, setTrainingLogs] = useState<TrainingLog[]>(initialTrainingLogs);
  const [user, setUser] = useState<User>(initialUser);
  const [quests, setQuests] = useState<Quest[]>(initialQuests);
  
  // Get or create today's log
  const getTodayLog = (): TrainingLog => {
    const today = new Date().toISOString().split('T')[0];
    return trainingLogs.find(log => log.date === today) || { date: today, completedStones: [] };
  };
  
  const [todayLog, setTodayLog] = useState<TrainingLog>(getTodayLog());
  
  // Update today's log when training logs change
  useEffect(() => {
    setTodayLog(getTodayLog());
  }, [trainingLogs]);
  
  const toggleStone = (stoneId: string, date?: string) => {
    const updatedLog = toggleStoneUtil(stoneId, date);
    
    setTrainingLogs(prevLogs => {
      const existingLogIndex = prevLogs.findIndex(log => log.date === updatedLog.date);
      
      if (existingLogIndex >= 0) {
        return prevLogs.map(log => 
          log.date === updatedLog.date ? updatedLog : log
        );
      } else {
        return [...prevLogs, updatedLog];
      }
    });
  };
  
  const updateQuestProgress = (questId: string, progress: number) => {
    setQuests(prevQuests => 
      prevQuests.map(quest => 
        quest.id === questId 
          ? { ...quest, progress, completed: progress >= 100 } 
          : quest
      )
    );
  };
  
  const toggleActiveQuest = (questId: string) => {
    setUser(prevUser => {
      const activeQuests = [...prevUser.activeQuests];
      
      if (activeQuests.includes(questId)) {
        return {
          ...prevUser,
          activeQuests: activeQuests.filter(id => id !== questId)
        };
      } else {
        return {
          ...prevUser,
          activeQuests: [...activeQuests, questId]
        };
      }
    });
  };
  
  const addTrainingNote = (date: string, note: string) => {
    setTrainingLogs(prevLogs => 
      prevLogs.map(log => 
        log.date === date 
          ? { ...log, notes: note } 
          : log
      )
    );
  };
  
  return (
    <MovementContext.Provider 
      value={{
        stones,
        trainingLogs,
        currentUser: user,
        quests,
        todayLog,
        toggleStone,
        updateQuestProgress,
        toggleActiveQuest,
        addTrainingNote
      }}
    >
      {children}
    </MovementContext.Provider>
  );
};

export const useMovement = () => {
  const context = useContext(MovementContext);
  if (context === undefined) {
    throw new Error("useMovement must be used within a MovementProvider");
  }
  return context;
};
