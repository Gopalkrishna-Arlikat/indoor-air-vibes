
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
        <div className="flex flex-col h-full p-2 sm:p-3">
          <div className="flex justify-between items-center mb-1">
            <div className="parameter-label text-xs sm:text-sm truncate max-w-[70%]">{label}</div>
            <div className="text-muted-foreground/80 flex-shrink-0">{icon}</div>
          </div>
          
          <div className="flex items-baseline mt-auto">
            <div className="parameter-value text-base sm:text-lg md:text-xl truncate mr-1" style={color ? { color } : undefined}>
              {value}
            </div>
            <div className="text-xs sm:text-sm font-medium text-muted-foreground whitespace-nowrap">
              {unit}
            </div>
          </div>
          
          {trend && (
            <div className="mt-1">
              {trend === 'up' && <span className="text-xs text-air-good whitespace-nowrap">↑ Rising</span>}
              {trend === 'down' && <span className="text-xs text-air-good whitespace-nowrap">↓ Falling</span>}
              {trend === 'stable' && <span className="text-xs text-muted-foreground whitespace-nowrap">→ Stable</span>}
            </div>
          )}
        </div>
      </AspectRatio>
    </div>
  );
};

export default ParameterCard;
