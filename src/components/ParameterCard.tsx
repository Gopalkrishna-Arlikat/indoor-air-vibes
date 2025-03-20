
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
      "parameter-card bg-white border-gray-300 w-full", 
      className
    )}>
      <div className="flex justify-between items-start">
        <span className="parameter-label text-xs sm:text-sm">{label}</span>
        <div className="text-muted-foreground/80 text-base sm:text-lg">{icon}</div>
      </div>
      
      <div className="flex items-baseline space-x-1 mt-2 mb-2">
        <span className="parameter-value text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl" style={color ? { color } : undefined}>
          {value}
        </span>
        <span className="text-xs sm:text-sm font-medium text-muted-foreground">
          {unit}
        </span>
      </div>
      
      {trend && (
        <div>
          {trend === 'up' && <span className="text-xs sm:text-sm text-air-good">↑ Rising</span>}
          {trend === 'down' && <span className="text-xs sm:text-sm text-air-good">↓ Falling</span>}
          {trend === 'stable' && <span className="text-xs sm:text-sm text-muted-foreground">→ Stable</span>}
        </div>
      )}
    </div>
  );
};

export default ParameterCard;
