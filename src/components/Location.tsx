
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
      bg-white text-black border border-black animate-slide-down relative
      before:content-[''] before:absolute before:inset-0 
      before:rounded-full before:p-[2px] before:-z-10
      before:bg-gradient-to-r before:from-[#D3E4FD] before:via-[#FFDEE2] before:to-[#E5DEFF]
      before:animate-pulse-slow
      ${className}
    `}>
      <MapPin className={`mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-[#0EA5E9]`} />
      <span className={`font-medium text-xs sm:text-sm text-black truncate max-w-[120px] sm:max-w-none`}>{location}</span>
    </div>
  );
};

export default Location;
