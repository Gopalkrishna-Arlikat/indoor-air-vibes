
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

type AirStatus = 'great' | 'good' | 'moderate' | 'bad' | 'harmful';

type AirQualityStatusProps = {
  status: AirStatus;
  className?: string;
};

const statusMessages = {
  great: 'Great',
  good: 'Good',
  moderate: 'Moderate',
  bad: 'Poor',
  harmful: 'Harmful'
};

const statusColors = {
  great: 'text-air-great',
  good: 'text-air-good',
  moderate: 'text-air-moderate',
  bad: 'text-air-bad',
  harmful: 'text-air-harmful'
};

const AirQualityStatus = ({ status, className }: AirQualityStatusProps) => {
  const [visible, setVisible] = useState(true);
  const [currentStatus, setCurrentStatus] = useState<AirStatus>(status);
  
  useEffect(() => {
    if (status !== currentStatus) {
      const changeStatus = async () => {
        setVisible(false);
        
        // Wait for fade-out animation
        await new Promise(resolve => setTimeout(resolve, 300));
        
        setCurrentStatus(status);
        setVisible(true);
      };
      
      changeStatus();
    }
  }, [status, currentStatus]);

  const statusText = statusMessages[currentStatus];

  return (
    <div className={cn("transition-all duration-300", className)}>
      <h1 className="text-5xl font-bold tracking-tight leading-tight">
        Indoor Air Quality Is<br />
        <span 
          className={cn(
            statusColors[currentStatus],
            "transition-opacity duration-300",
            visible ? "animate-fade-in" : "opacity-0"
          )}
        >
          {statusText}
        </span>
      </h1>
    </div>
  );
};

export default AirQualityStatus;
