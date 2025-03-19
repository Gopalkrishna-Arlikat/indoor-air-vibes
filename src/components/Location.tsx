
import { MapPin } from 'lucide-react';

type LocationProps = {
  location: string;
  className?: string;
};

const Location = ({ location, className }: LocationProps) => {
  return (
    <div className={`inline-flex items-center px-4 py-2 rounded-full glass-card animate-slide-down ${className}`}>
      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
      <span className="font-medium text-sm">{location}</span>
    </div>
  );
};

export default Location;
