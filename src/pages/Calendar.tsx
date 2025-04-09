
import { useState } from "react";
import { motion } from "framer-motion";
import { useMovement } from "@/context/MovementContext";
import DateCell from "@/components/DateCell";
import TrainingStone from "@/components/TrainingStone";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Calendar = () => {
  const { stones, trainingLogs, toggleStone } = useMovement();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Get the day of week for the first day (0 = Sunday, 6 = Saturday)
    const startOffset = firstDay.getDay();
    
    // Generate array for the days in month + empty slots for alignment
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
  
  // Find log for selected date
  const selectedLog = trainingLogs.find(log => log.date === selectedDate);
  
  const handleToggleStone = (stoneId: string) => {
    toggleStone(stoneId, selectedDate);
  };
  
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  return (
    <div className="min-h-[calc(100vh-64px)] pb-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-apex-gold mb-2">Movement Calendar</h1>
        <p className="text-apex-darkGold">Track your training consistency and patterns</p>
      </header>
      
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
            <ChevronLeft />
          </button>
          
          <h2 className="text-xl font-medium text-apex-gold">{formattedMonth}</h2>
          
          <button 
            onClick={() => changeMonth(1)}
            className="p-2 text-apex-darkGold hover:text-apex-gold"
          >
            <ChevronRight />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-1">
          {weekDays.map(day => (
            <div key={day} className="text-center text-xs text-apex-darkGold">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="bg-transparent"></div>;
            }
            
            const log = trainingLogs.find(log => log.date === day);
            
            return (
              <DateCell 
                key={day} 
                date={day} 
                log={log} 
                stones={stones}
                onClick={() => setSelectedDate(day)}
                active={selectedDate === day}
              />
            );
          })}
        </div>
      </motion.div>
      
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-apex-stone/10 p-4 rounded-lg border border-apex-stone"
        >
          <h3 className="text-lg font-bold text-apex-gold mb-3">
            {new Date(selectedDate).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric"
            })}
          </h3>
          
          {selectedLog?.notes && (
            <div className="mb-4 p-3 bg-apex-stone rounded-md">
              <p className="text-sm text-apex-gold italic">{selectedLog.notes}</p>
            </div>
          )}
          
          <div className="grid grid-cols-4 gap-2">
            {stones.map((stone) => (
              <div 
                key={stone.id}
                className={`p-2 border rounded-md flex items-center gap-2 cursor-pointer
                  ${selectedLog?.completedStones.includes(stone.id)
                    ? "bg-apex-stone/80 border-apex-accent text-apex-gold" 
                    : "bg-apex-black border-apex-stone text-apex-darkGold"
                  }`}
                onClick={() => handleToggleStone(stone.id)}
              >
                <span>{stone.icon}</span>
                <span className="text-sm">{stone.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Calendar;
