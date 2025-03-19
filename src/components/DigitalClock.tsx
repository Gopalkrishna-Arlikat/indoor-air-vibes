
import { useState, useEffect } from 'react';

const DigitalClock = ({ className }: { className?: string }) => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className={`flex flex-col items-end animate-slide-down ${className}`}>
      <div className="text-4xl font-semibold tracking-tight">{formatTime(time)}</div>
      <div className="text-sm text-muted-foreground">{formatDate(time)}</div>
    </div>
  );
};

export default DigitalClock;
