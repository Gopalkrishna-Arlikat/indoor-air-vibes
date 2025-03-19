
import React from 'react';
import { cn } from "@/lib/utils";

type ParameterCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit: string;
  trend?: 'up' | 'down' | 'stable';
  color?: string;
  className?: string;
};

const ParameterCard = ({
  icon,
  label,
  value,
  unit,
  trend,
  color,
  className
}: ParameterCardProps) => {
  return (
    <div className={cn(
      "parameter-card flex flex-col h-full w-full p-2 sm:p-3", 
      className
    )}>
      <div className="flex justify-between items-center mb-1">
        <span className="parameter-label text-[10px] sm:text-xs truncate max-w-[80%]">{label}</span>
        <div className="text-muted-foreground/80 text-[10px] sm:text-base flex-shrink-0">{icon}</div>
      </div>
      
      <div className="flex items-baseline space-x-1 mt-auto">
        <span className="parameter-value text-sm sm:text-lg md:text-xl font-semibold truncate" style={color ? { color } : undefined}>
          {value}
        </span>
        <span className="text-[8px] sm:text-xs font-medium text-muted-foreground flex-shrink-0">
          {unit}
        </span>
      </div>
      
      {trend && (
        <div className="mt-1">
          {trend === 'up' && <span className="text-[8px] sm:text-xs text-air-good">↑ Rising</span>}
          {trend === 'down' && <span className="text-[8px] sm:text-xs text-air-good">↓ Falling</span>}
          {trend === 'stable' && <span className="text-[8px] sm:text-xs text-muted-foreground">→ Stable</span>}
        </div>
      )}
    </div>
  );
};

export default ParameterCard;
