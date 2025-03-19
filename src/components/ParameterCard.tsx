
import React from 'react';
import { cn } from "@/lib/utils";
import { AspectRatio } from "./ui/aspect-ratio";

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
      "parameter-card bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden", 
      className
    )}>
      <AspectRatio ratio={16/9}>
        <div className="flex flex-col justify-between h-full p-2 sm:p-3">
          <div className="flex justify-between items-start mb-1">
            <span className="parameter-label text-xs sm:text-sm truncate mr-2">{label}</span>
            <div className="text-muted-foreground/80 flex-shrink-0">{icon}</div>
          </div>
          
          <div className="flex items-baseline mt-auto">
            <span className="parameter-value text-base sm:text-lg md:text-xl truncate mr-1" style={color ? { color } : undefined}>
              {value}
            </span>
            <span className="text-xs sm:text-sm font-medium text-muted-foreground flex-shrink-0">
              {unit}
            </span>
          </div>
          
          {trend && (
            <div className="mt-1">
              {trend === 'up' && <span className="text-xs text-air-good">↑ Rising</span>}
              {trend === 'down' && <span className="text-xs text-air-good">↓ Falling</span>}
              {trend === 'stable' && <span className="text-xs text-muted-foreground">→ Stable</span>}
            </div>
          )}
        </div>
      </AspectRatio>
    </div>
  );
};

export default ParameterCard;
