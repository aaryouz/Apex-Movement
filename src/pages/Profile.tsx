
import { motion } from "framer-motion";
import { useMovement } from "@/context/MovementContext";
import { User, BarChart3, ChevronRight } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const Profile = () => {
  const { currentUser, stones, trainingLogs } = useMovement();
  
  // Calculate stats
  const totalTrainingSessions = trainingLogs.length;
  const mostRecentSession = trainingLogs.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];
  
  // Calculate stone training frequency
  const stoneFrequency = stones.map(stone => {
    const count = trainingLogs.filter(log => 
      log.completedStones.includes(stone.id)
    ).length;
    
    return {
      name: stone.name,
      id: stone.id,
      count,
      percentage: totalTrainingSessions > 0 
        ? Math.round((count / totalTrainingSessions) * 100) 
        : 0
    };
  }).sort((a, b) => b.count - a.count);
  
  // Get top 5 stones
  const topStones = stoneFrequency.slice(0, 5);
  
  // Calculate streak
  let currentStreak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const sortedDates = trainingLogs
    .map(log => new Date(log.date))
    .sort((a, b) => b.getTime() - a.getTime());
  
  if (sortedDates.length > 0) {
    // Check if we have a log for today
    const lastDate = sortedDates[0];
    lastDate.setHours(0, 0, 0, 0);
    
    if (lastDate.getTime() === today.getTime()) {
      currentStreak = 1;
      
      // Check consecutive previous days
      for (let i = 1; i < sortedDates.length; i++) {
        const prevDate = new Date(today);
        prevDate.setDate(today.getDate() - i);
        prevDate.setHours(0, 0, 0, 0);
        
        const found = sortedDates.some(date => {
          const d = new Date(date);
          d.setHours(0, 0, 0, 0);
          return d.getTime() === prevDate.getTime();
        });
        
        if (found) {
          currentStreak++;
        } else {
          break;
        }
      }
    }
  }
  
  // Pie chart for focus categories
  const focusData = currentUser.focusCategories.map(category => ({
    name: category,
    value: 1
  }));
  
  const COLORS = ['#9c9781', '#8B5CF6', '#F97316', '#14B8A6', '#F43F5E', '#3B82F6'];
  
  return (
    <div className="min-h-[calc(100vh-64px)] pb-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-apex-gold mb-2">Your Profile</h1>
        <p className="text-apex-darkGold">Movement patterns and personal stats</p>
      </header>
      
      <motion.div
        className="bg-apex-stone/10 p-4 rounded-lg border border-apex-stone mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-4 mb-3">
          <div className="w-16 h-16 bg-apex-stone rounded-full flex items-center justify-center">
            <User size={32} className="text-apex-gold" />
          </div>
          
          <div>
            <h2 className="text-xl font-bold text-apex-gold">{currentUser.name}</h2>
            <p className="text-sm text-apex-darkGold">Since {new Date(currentUser.joinDate).toLocaleDateString()}</p>
          </div>
        </div>
        
        <p className="text-apex-darkGold mb-4">{currentUser.bio}</p>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-apex-stone p-3 rounded-md">
            <span className="block text-sm text-apex-darkGold">Sessions</span>
            <span className="text-xl font-bold text-apex-gold">{totalTrainingSessions}</span>
          </div>
          
          <div className="bg-apex-stone p-3 rounded-md">
            <span className="block text-sm text-apex-darkGold">Current Streak</span>
            <span className="text-xl font-bold text-apex-gold">{currentStreak} days</span>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="bg-apex-stone/10 p-4 rounded-lg border border-apex-stone">
          <h2 className="text-lg font-bold text-apex-gold mb-3">Training Focus</h2>
          
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={focusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  dataKey="value"
                  nameKey="name"
                  label={({ name }) => name}
                >
                  {focusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-apex-stone/10 p-4 rounded-lg border border-apex-stone">
          <h2 className="text-lg font-bold text-apex-gold mb-3">Top Training Stones</h2>
          
          <div className="space-y-2">
            {topStones.map((stone) => (
              <div key={stone.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-apex-gold">{stones.find(s => s.id === stone.id)?.icon}</span>
                  <span className="text-apex-gold">{stone.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-apex-darkGold">{stone.count} sessions</span>
                  <div className="w-16 bg-apex-black h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-apex-accent"
                      style={{ width: `${stone.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="bg-apex-stone/10 p-4 rounded-lg border border-apex-stone flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart3 className="text-apex-darkGold" />
            <span className="text-apex-gold">Training Analytics</span>
          </div>
          <ChevronRight className="text-apex-darkGold" />
        </div>
        
        <div className="bg-apex-stone/10 p-4 rounded-lg border border-apex-stone flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User className="text-apex-darkGold" />
            <span className="text-apex-gold">Account Settings</span>
          </div>
          <ChevronRight className="text-apex-darkGold" />
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
