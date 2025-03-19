
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
    <div className={cn("parameter-card bg-white border-gray-300", className)}>
      <div className="flex justify-between items-start mb-2">
        <span className="parameter-label">{label}</span>
        <div className="text-muted-foreground/80">{icon}</div>
      </div>
      
      <div className="flex items-baseline space-x-1 mt-auto">
        <span className="parameter-value" style={color ? { color } : undefined}>
          {value}
        </span>
        <span className="text-sm font-medium text-muted-foreground">
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
  );
};

export default ParameterCard;
