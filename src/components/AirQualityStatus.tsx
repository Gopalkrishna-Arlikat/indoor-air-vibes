
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

type AirStatus = 'great' | 'good' | 'moderate' | 'bad' | 'harmful';

type AirQualityStatusProps = {
  status: AirStatus;
  className?: string;
};

const statusMessages = {
  great: 'Indoor Air Quality Is Great',
  good: 'Indoor Air Quality Is Good',
  moderate: 'Indoor Air Quality Is Moderate',
  bad: 'Indoor Air Quality Is Poor',
  harmful: 'Indoor Air Quality Is Harmful'
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

  // Split the message to highlight only the last word
  const message = statusMessages[currentStatus];
  const lastSpaceIndex = message.lastIndexOf(' ');
  const textBeforeLastWord = message.substring(0, lastSpaceIndex + 1);
  const lastWord = message.substring(lastSpaceIndex + 1);

  return (
    <div className={cn("transition-all duration-300", className)}>
      <h1 
        className={cn(
          "text-5xl font-bold tracking-tight",
          visible ? "animate-fade-in" : "opacity-0"
        )}
      >
        {textBeforeLastWord}
        <span className={statusColors[currentStatus]}>{lastWord}</span>
      </h1>
    </div>
  );
};

export default AirQualityStatus;
