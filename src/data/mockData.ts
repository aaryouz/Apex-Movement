export type Stone = {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: Category;
};

export type Category = 
  | "mobility" 
  | "strength" 
  | "coordination" 
  | "balance" 
  | "power" 
  | "rhythm" 
  | "core" 
  | "gymnastics";

export type TrainingLog = {
  date: string;
  completedStones: string[];
  notes?: string;
};

export type Skill = {
  id: string;
  name: string;
  category: Category;
  description: string;
  level: number; // 1-5
};

export type Quest = {
  id: string;
  name: string;
  description: string;
  targetDate?: string;
  completed: boolean;
  relatedStones: string[];
  progress: number; // 0-100
};

export type User = {
  id: string;
  name: string;
  bio: string;
  joinDate: string;
  skills: Skill[];
  activeQuests: string[];
  focusCategories: Category[];
};

// Training Stones
export const stones: Stone[] = [
  {
    id: "mobility",
    name: "Mobility",
    description: "Joint range of motion, tissue elasticity, and freedom of movement.",
    icon: "🔄",
    category: "mobility"
  },
  {
    id: "strength",
    name: "Strength",
    description: "Force production, static and isometric holds, and resistance.",
    icon: "💪",
    category: "strength"
  },
  {
    id: "rhythm",
    name: "Rhythm",
    description: "Timing, coordination with music, and cyclical movements.",
    icon: "🎵",
    category: "rhythm"
  },
  {
    id: "coordination",
    name: "Coordination",
    description: "Inter-limb timing, proprioception, and spatial awareness.",
    icon: "🤹",
    category: "coordination"
  },
  {
    id: "core",
    name: "Core",
    description: "Trunk stability, rotation power, and spinal alignment.",
    icon: "⚙️",
    category: "core"
  },
  {
    id: "sprint",
    name: "Sprint",
    description: "Explosive acceleration, top speed mechanics, and running form.",
    icon: "⚡",
    category: "power"
  },
  {
    id: "handstand",
    name: "Handstand",
    description: "Inverted balance, shoulder stability, and body alignment.",
    icon: "🙌",
    category: "balance"
  },
  {
    id: "gymnastics",
    name: "Gymnastics",
    description: "Bodyweight skills, apparatus work, and acrobatic movements.",
    icon: "🤸",
    category: "gymnastics"
  }
];

// Sample User
export const currentUser: User = {
  id: "user1",
  name: "Alex",
  bio: "Martial artist, dancer, and movement explorer. Balancing power with gymnastics.",
  joinDate: "2024-01-15",
  skills: [
    {
      id: "skill1",
      name: "Handstand",
      category: "balance",
      description: "Freestanding handstand with control",
      level: 3
    },
    {
      id: "skill2",
      name: "Cossack Squat",
      category: "mobility",
      description: "Deep lateral squat with full range of motion",
      level: 4
    },
    {
      id: "skill3",
      name: "Muscle Up",
      category: "strength",
      description: "Transition from hang to support on rings",
      level: 2
    },
    {
      id: "skill4",
      name: "Breakdance Footwork",
      category: "rhythm",
      description: "Basic 6-step and variations",
      level: 3
    },
    {
      id: "skill5",
      name: "Sprint Start",
      category: "power",
      description: "Explosive acceleration from blocks",
      level: 3
    }
  ],
  activeQuests: ["quest1", "quest3"],
  focusCategories: ["balance", "power", "gymnastics"]
};

// Sample Quests
export const quests: Quest[] = [
  {
    id: "quest1",
    name: "10s Handstand Hold",
    description: "Achieve a consistent 10-second freestanding handstand",
    targetDate: "2024-06-15",
    completed: false,
    relatedStones: ["handstand", "core", "strength"],
    progress: 70
  },
  {
    id: "quest2",
    name: "Full Side Split",
    description: "Achieve a full flat side split with proper alignment",
    targetDate: "2024-05-30",
    completed: false,
    relatedStones: ["mobility"],
    progress: 60
  },
  {
    id: "quest3",
    name: "5s Sprint Start",
    description: "Perfect a 5-second explosive sprint start sequence",
    targetDate: "2024-07-01",
    completed: false,
    relatedStones: ["sprint", "power", "coordination"],
    progress: 40
  },
  {
    id: "quest4",
    name: "Gymnastics Sequence",
    description: "Create a 60-second original gymnastics sequence",
    completed: true,
    relatedStones: ["gymnastics", "coordination", "mobility"],
    progress: 100
  }
];

// Training Logs
const generatePastLogs = () => {
  const logs: TrainingLog[] = [];
  const today = new Date();
  
  // Generate logs for the past 30 days
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    // Skip some days randomly
    if (i > 0 && Math.random() > 0.75) continue;
    
    const completedStones = stones
      .filter(() => Math.random() > 0.4) // Randomly select completed stones
      .map(stone => stone.id);
      
    logs.push({
      date: date.toISOString().split('T')[0],
      completedStones,
      notes: i % 5 === 0 ? "Felt great today, making progress on handstands" : undefined
    });
  }
  
  return logs;
};

export const trainingLogs = generatePastLogs();

// Get today's log or create a new one
export const getTodayLog = (): TrainingLog => {
  const today = new Date().toISOString().split('T')[0];
  const existingLog = trainingLogs.find(log => log.date === today);
  
  if (existingLog) {
    return existingLog;
  }
  
  return {
    date: today,
    completedStones: [],
  };
};

// Helper functions to update data
export const toggleStone = (stoneId: string, date: string = new Date().toISOString().split('T')[0]): TrainingLog => {
  const logIndex = trainingLogs.findIndex(log => log.date === date);
  let log: TrainingLog;
  
  if (logIndex >= 0) {
    log = {...trainingLogs[logIndex]};
    
    if (log.completedStones.includes(stoneId)) {
      log.completedStones = log.completedStones.filter(id => id !== stoneId);
    } else {
      log.completedStones = [...log.completedStones, stoneId];
    }
    
    trainingLogs[logIndex] = log;
  } else {
    log = {
      date,
      completedStones: [stoneId]
    };
    trainingLogs.push(log);
  }
  
  return log;
};
