
import { MapPin } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

type LocationProps = {
  location: string;
  className?: string;
};

const Location = ({ location, className }: LocationProps) => {
  const isMobile = useIsMobile();
  
  if (!location) return null;
  
  return (
    <div className={`
      inline-flex items-center px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full 
      bg-white text-black border border-black/70 animate-slide-down
      ${className}
    `}>
      <MapPin className={`mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#0EA5E9]`} />
      <span className={`font-medium text-xs sm:text-sm md:text-base lg:text-lg text-black truncate max-w-[120px] sm:max-w-none`}>{location}</span>
    </div>
  );
};

export default Location;
