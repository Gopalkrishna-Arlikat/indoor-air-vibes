
import { MapPin } from 'lucide-react';

type LocationProps = {
  location: string;
  className?: string;
};

const Location = ({ location, className }: LocationProps) => {
  return (
    <div className={`
      inline-flex items-center px-4 py-2 rounded-full 
      bg-white text-black border border-black animate-slide-down relative
      before:content-[''] before:absolute before:inset-0 
      before:rounded-full before:p-[2px] before:-z-10
      before:bg-gradient-to-r before:from-[#D3E4FD] before:via-[#FFDEE2] before:to-[#E5DEFF]
      before:animate-pulse-slow shadow-lg
      ${className}
    `}>
      <MapPin className="mr-2 h-4 w-4 text-black" />
      <span className="font-medium text-sm text-black">{location}</span>
    </div>
  );
};

export default Location;
