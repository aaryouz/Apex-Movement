
import { motion } from "framer-motion";
import { useMovement } from "@/context/MovementContext";
import SkillBadge from "@/components/SkillBadge";
import { PieChart, Pie, Cell, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";

const SkillMap = () => {
  const { stones, trainingLogs, currentUser } = useMovement();
  
  // Calculate frequency for each stone
  const stoneFrequency = stones.map(stone => {
    const count = trainingLogs.filter(log => log.completedStones.includes(stone.id)).length;
    return {
      name: stone.name,
      value: count,
      id: stone.id,
      category: stone.category
    };
  });
  
  // Prepare radar chart data based on user skills
  const skillRadarData = currentUser.skills.map(skill => ({
    subject: skill.name,
    value: skill.level,
    fullMark: 5
  }));
  
  // Prepare data for category focus
  const categoryCounts: Record<string, { count: number, total: number }> = {};
  
  // Count stones by category
  stones.forEach(stone => {
    if (!categoryCounts[stone.category]) {
      categoryCounts[stone.category] = { count: 0, total: 0 };
    }
    categoryCounts[stone.category].total += 1;
  });
  
  // Count completed stones by category
  trainingLogs.forEach(log => {
    log.completedStones.forEach(stoneId => {
      const stone = stones.find(s => s.id === stoneId);
      if (stone && categoryCounts[stone.category]) {
        categoryCounts[stone.category].count += 1;
      }
    });
  });
  
  // Convert to array for visualization
  const categoryData = Object.entries(categoryCounts).map(([category, data]) => ({
    name: category,
    value: data.count,
    percentage: data.total > 0 ? (data.count / data.total) * 100 : 0
  }));
  
  // Sort by value
  categoryData.sort((a, b) => b.value - a.value);
  
  // Colors for pie chart
  const COLORS = ['#9c9781', '#8B5CF6', '#F97316', '#14B8A6', '#F43F5E', '#3B82F6', '#9CA3AF', '#F59E0B'];
  
  return (
    <div className="min-h-[calc(100vh-64px)] pb-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-apex-gold mb-2">Your Skill Map</h1>
        <p className="text-apex-darkGold">Visualize your movement practice patterns</p>
      </header>
      
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-apex-stone/10 p-4 rounded-lg border border-apex-stone">
          <h2 className="text-xl font-bold text-apex-gold mb-3">Movement Focus</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stoneFrequency}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={false}
                >
                  {stoneFrequency.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-apex-stone/10 p-4 rounded-lg border border-apex-stone">
          <h2 className="text-xl font-bold text-apex-gold mb-3">Skill Assessment</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={90} data={skillRadarData}>
                <PolarGrid stroke="#9c9781" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#9c9781' }} />
                <Radar
                  name="Skills"
                  dataKey="value"
                  stroke="#dbd4b4"
                  fill="#dbd4b4"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h2 className="text-xl font-bold text-apex-gold mb-3">Training Categories</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {categoryData.map((category) => (
            <div 
              key={category.name}
              className="bg-apex-stone/10 p-3 rounded-lg border border-apex-stone"
            >
              <div className="flex justify-between items-center mb-1">
                <h3 className="capitalize text-apex-gold">{category.name}</h3>
                <span className="text-sm text-apex-darkGold">{category.value} sessions</span>
              </div>
              
              <div className="w-full bg-apex-black rounded-full h-2.5">
                <div 
                  className="bg-apex-accent h-2.5 rounded-full" 
                  style={{ width: `${Math.min(100, category.percentage)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <h2 className="text-xl font-bold text-apex-gold mb-4">Your Skills</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {currentUser.skills.map((skill) => (
            <SkillBadge key={skill.id} skill={skill} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SkillMap;
