import { useState } from "react";
import { motion } from "framer-motion";
import { useMovement } from "@/context/MovementContext";
import { ChevronLeft, ChevronRight, Check, Plus } from "lucide-react";
import { Stone } from "@/data/mockData";

const Calendar = () => {
  const { trainingLogs, stones, toggleStone } = useMovement();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const startOffset = firstDay.getDay();
    const days = [];
    
    // Add empty slots for alignment
    for (let i = 0; i < startOffset; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      const dateString = date.toISOString().split('T')[0];
      days.push(dateString);
    }
    
    return days;
  };
  
  const calendarDays = generateCalendarDays();
  
  const changeMonth = (offset: number) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + offset);
      return newMonth;
    });
  };
  
  const formattedMonth = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });
  
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  return (
    <div className="min-h-[calc(100vh-64px)] p-4">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => changeMonth(-1)}
            className="p-2 text-apex-darkGold hover:text-apex-gold"
          >
            <ChevronLeft size={24} />
          </button>
          
          <h2 className="text-xl font-medium text-apex-gold">{formattedMonth}</h2>
          
          <button 
            onClick={() => changeMonth(1)}
            className="p-2 text-apex-darkGold hover:text-apex-gold"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center text-sm text-apex-darkGold font-medium">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="aspect-square"></div>;
            }
            
            const log = trainingLogs.find(log => log.date === day);
            const isToday = day === new Date().toISOString().split('T')[0];
            const hasTraining = log && log.completedStones.length > 0;
            
            return (
              <div 
                key={day}
                className={`
                  aspect-square rounded-lg p-1 relative cursor-pointer
                  ${isToday ? 'border-2 border-apex-accent' : ''}
                  ${hasTraining 
                    ? 'bg-apex-accent text-apex-black' 
                    : 'bg-apex-stone/20 text-apex-darkGold hover:bg-apex-stone/30'
                  }
                `}
                onClick={() => setSelectedDate(day)}
              >
                <div className="flex justify-between items-start h-full">
                  <span className="text-sm">{new Date(day).getDate()}</span>
                  {hasTraining && <Check size={16} className="text-apex-black" />}
                </div>
                {log && log.completedStones.length > 0 && (
                  <div className="absolute bottom-1 left-1 right-1 flex flex-wrap gap-0.5 text-xs">
                    {log.completedStones.map(stoneId => {
                      const stone = stones.find(s => s.id === stoneId);
                      return stone ? (
                        <span key={stoneId} title={stone.name}>{stone.icon}</span>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Workout Selection Dialog */}
      {selectedDate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-apex-black border-2 border-apex-gold rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-apex-gold text-lg font-medium">
                Log Workout for {new Date(selectedDate).toLocaleDateString()}
              </h3>
              <button 
                onClick={() => setSelectedDate(null)}
                className="text-apex-darkGold hover:text-apex-gold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {stones.map(stone => {
                const isCompleted = trainingLogs
                  .find(log => log.date === selectedDate)?
                  .completedStones.includes(stone.id) ?? false;

                return (
                  <button
                    key={stone.id}
                    onClick={() => toggleStone(stone.id, selectedDate)}
                    className={`
                      p-3 rounded-lg flex items-center gap-2
                      ${isCompleted 
                        ? 'bg-apex-accent text-apex-black' 
                        : 'bg-apex-stone/20 text-apex-darkGold hover:bg-apex-stone/30'
                      }
                    `}
                  >
                    <span className="text-xl">{stone.icon}</span>
                    <span className="flex-1 text-left">{stone.name}</span>
                    {isCompleted && <Check size={16} />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
