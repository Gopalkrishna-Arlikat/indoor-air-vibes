
import { useState, useEffect } from 'react';
import ParameterCard from './ParameterCard';
import AirQualityStatus from './AirQualityStatus';
import Location from './Location';
import DigitalClock from './DigitalClock';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Thermometer, 
  Droplets, 
  Cloud, 
  Wind, 
  Gauge, 
  Sun, 
  Volume2, 
  FlaskConical, 
  AlertCircle
} from 'lucide-react';

const generateRandomData = () => {
  return {
    temperature: (20 + Math.random() * 5).toFixed(1),
    humidity: Math.floor(30 + Math.random() * 40),
    co2: Math.floor(400 + Math.random() * 600),
    voc: Math.floor(100 + Math.random() * 300),
    pm25: (Math.random() * 20).toFixed(1),
    pm10: (Math.random() * 40).toFixed(1),
    pressure: Math.floor(1000 + Math.random() * 20),
    co: (Math.random() * 5).toFixed(1),
    light: Math.floor(200 + Math.random() * 800),
    noise: Math.floor(30 + Math.random() * 30)
  };
};

const calculateAirQuality = (data: ReturnType<typeof generateRandomData>) => {
  if (
    Number(data.co2) < 600 && 
    Number(data.pm25) < 5 && 
    Number(data.voc) < 150 && 
    Number(data.co) < 1
  ) {
    return 'great';
  } else if (
    Number(data.co2) < 800 && 
    Number(data.pm25) < 10 && 
    Number(data.voc) < 250 && 
    Number(data.co) < 2
  ) {
    return 'good';
  } else if (
    Number(data.co2) < 1000 && 
    Number(data.pm25) < 15 && 
    Number(data.voc) < 350 && 
    Number(data.co) < 3
  ) {
    return 'moderate';
  } else if (
    Number(data.co2) < 1200 && 
    Number(data.pm25) < 25 && 
    Number(data.voc) < 500 && 
    Number(data.co) < 4
  ) {
    return 'bad';
  } else {
    return 'harmful';
  }
};

const Dashboard = () => {
  const [data, setData] = useState(generateRandomData());
  const [airQuality, setAirQuality] = useState<'great' | 'good' | 'moderate' | 'bad' | 'harmful'>(
    'great'
  );
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateRandomData();
      setData(newData);
      setAirQuality(calculateAirQuality(newData) as any);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  if (isMobile) {
    return (
      <div className="flex flex-col bg-white min-h-screen p-4 overflow-auto">
        {/* Mobile Layout */}
        <div className="flex justify-between items-start mb-4">
          <Location location="Reception, Gravity's Office" className="mb-0" />
          <DigitalClock className="scale-75 origin-top-right" />
        </div>
        
        <AirQualityStatus status={airQuality} className="my-4" />
        
        <div className="grid grid-cols-2 gap-3 p-5 sm:p-6 overflow-y-auto flex-1 pb-12">
          <ParameterCard 
            icon={<Thermometer className="h-3 w-3 sm:h-4 sm:w-4" />} 
            label="Temperature" 
            value={data.temperature} 
            unit="°C"
            trend="stable"
            className="h-20 sm:h-24 md:h-28 w-full aspect-[4/3]"
          />
          <ParameterCard 
            icon={<Droplets className="h-3 w-3 sm:h-4 sm:w-4" />} 
            label="Humidity" 
            value={data.humidity} 
            unit="%"
            trend="up"
            className="h-20 sm:h-24 md:h-28 w-full aspect-[4/3]"
          />
          <ParameterCard 
            icon={<Cloud className="h-3 w-3 sm:h-4 sm:w-4" />} 
            label="CO₂" 
            value={data.co2} 
            unit="ppm"
            color={Number(data.co2) > 1000 ? '#ff9f0a' : undefined}
            trend="up"
            className="h-20 sm:h-24 md:h-28 w-full aspect-[4/3]"
          />
          <ParameterCard 
            icon={<FlaskConical className="h-3 w-3 sm:h-4 sm:w-4" />} 
            label="VOC" 
            value={data.voc} 
            unit="ppb"
            trend="stable"
            className="h-20 sm:h-24 md:h-28 w-full aspect-[4/3]"
          />
          <ParameterCard 
            icon={<Wind className="h-3 w-3 sm:h-4 sm:w-4" />} 
            label="PM2.5" 
            value={data.pm25} 
            unit="μg/m³"
            color={Number(data.pm25) > 12 ? '#ff9f0a' : undefined}
            trend="down"
            className="h-20 sm:h-24 md:h-28 w-full aspect-[4/3]"
          />
          <ParameterCard 
            icon={<Wind className="h-3 w-3 sm:h-4 sm:w-4" />} 
            label="PM10" 
            value={data.pm10} 
            unit="μg/m³"
            trend="down"
            className="h-20 sm:h-24 md:h-28 w-full aspect-[4/3]"
          />
          <ParameterCard 
            icon={<Gauge className="h-3 w-3 sm:h-4 sm:w-4" />} 
            label="Pressure" 
            value={data.pressure} 
            unit="hPa"
            trend="stable"
            className="h-20 sm:h-24 md:h-28 w-full aspect-[4/3]"
          />
          <ParameterCard 
            icon={<AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />} 
            label="Carbon Monoxide" 
            value={data.co} 
            unit="ppm"
            color={Number(data.co) > 2 ? '#ff453a' : undefined}
            trend="stable"
            className="h-20 sm:h-24 md:h-28 w-full aspect-[4/3]"
          />
          <ParameterCard 
            icon={<Sun className="h-3 w-3 sm:h-4 sm:w-4" />} 
            label="Light" 
            value={data.light} 
            unit="lux"
            trend="down"
            className="h-20 sm:h-24 md:h-28 w-full aspect-[4/3]"
          />
          <ParameterCard 
            icon={<Volume2 className="h-3 w-3 sm:h-4 sm:w-4" />} 
            label="Noise" 
            value={data.noise} 
            unit="dB"
            trend="stable"
            className="h-20 sm:h-24 md:h-28 w-full aspect-[4/3]"
          />
        </div>
        
        <div className="text-center pt-2 pb-4">
          <p className="text-base animate-slide-up">
            <span className="text-gray-500">Powered by </span>
            <span className="text-[#0EA5E9] font-medium">SensorMagics™</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-white p-0 overflow-hidden">
      {/* Left Section - Air Quality Status */}
      <div className="w-3/5 md:w-1/2 lg:w-3/5 px-4 md:px-8 flex flex-col justify-between overflow-hidden">
        <div className="flex justify-between items-start">
          <div className="invisible">
            {/* Placeholder to maintain spacing */}
            <Location location="" className="mt-6" />
          </div>
          <DigitalClock className="mt-6" />
        </div>
        
        <div className="flex flex-col items-start justify-center flex-1 pl-4 md:pl-6 lg:pl-10 xl:pl-12 mt-[-8vh]">
          <Location location="Reception, Gravity's Office" className="mb-3 md:mb-4 lg:mb-5 animate-scale-in" />
          <AirQualityStatus status={airQuality} className="mb-2 md:mb-3 lg:mb-4" />
          <p className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground font-light animate-slide-up">
            Breathe better, live longer.
          </p>
        </div>
        
        <div className="text-left pl-4 md:pl-6 lg:pl-10 xl:pl-12 pb-6">
          <p className="text-base md:text-lg lg:text-xl animate-slide-up">
            <span className="text-gray-500">Powered by </span>
            <span className="text-[#0EA5E9] font-semibold">SensorMagics™</span>
          </p>
        </div>
      </div>
      
      {/* Separator */}
      <div className="border-r border-gray-400 h-full"></div>
      
      {/* Right Section - Parameter Cards */}
      <div className="w-2/5 md:w-1/2 lg:w-2/5 flex flex-col overflow-hidden">
        <div className="grid grid-cols-2 gap-3 md:gap-4 p-5 md:p-6 lg:p-8 overflow-y-auto flex-1 py-8">
          <ParameterCard 
            icon={<Thermometer className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />} 
            label="Temperature" 
            value={data.temperature} 
            unit="°C"
            trend="stable"
            className="md:h-28 lg:h-32 xl:h-36 aspect-[4/3]"
          />
          <ParameterCard 
            icon={<Droplets className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />} 
            label="Humidity" 
            value={data.humidity} 
            unit="%"
            trend="up"
            className="md:h-28 lg:h-32 xl:h-36 aspect-[4/3]"
          />
          <ParameterCard 
            icon={<Cloud className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />} 
            label="CO₂" 
            value={data.co2} 
            unit="ppm"
            color={Number(data.co2) > 1000 ? '#ff9f0a' : undefined}
            trend="up"
            className="md:h-28 lg:h-32 xl:h-36 aspect-[4/3]"
          />
          <ParameterCard 
            icon={<FlaskConical className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />} 
            label="VOC" 
            value={data.voc} 
            unit="ppb"
            trend="stable"
            className="md:h-28 lg:h-32 xl:h-36 aspect-[4/3]"
          />
          <ParameterCard 
            icon={<Wind className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />} 
            label="PM2.5" 
            value={data.pm25} 
            unit="μg/m³"
            color={Number(data.pm25) > 12 ? '#ff9f0a' : undefined}
            trend="down"
            className="md:h-28 lg:h-32 xl:h-36 aspect-[4/3]"
          />
          <ParameterCard 
            icon={<Wind className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />} 
            label="PM10" 
            value={data.pm10} 
            unit="μg/m³"
            trend="down"
            className="md:h-28 lg:h-32 xl:h-36 aspect-[4/3]"
          />
          <ParameterCard 
            icon={<Gauge className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />} 
            label="Barometric Pressure" 
            value={data.pressure} 
            unit="hPa"
            trend="stable"
            className="md:h-28 lg:h-32 xl:h-36 aspect-[4/3]"
          />
          <ParameterCard 
            icon={<AlertCircle className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />} 
            label="Carbon Monoxide" 
            value={data.co} 
            unit="ppm"
            color={Number(data.co) > 2 ? '#ff453a' : undefined}
            trend="stable"
            className="md:h-28 lg:h-32 xl:h-36 aspect-[4/3]"
          />
          <ParameterCard 
            icon={<Sun className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />} 
            label="Light" 
            value={data.light} 
            unit="lux"
            trend="down"
            className="md:h-28 lg:h-32 xl:h-36 aspect-[4/3]"
          />
          <ParameterCard 
            icon={<Volume2 className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />} 
            label="Noise" 
            value={data.noise} 
            unit="dB"
            trend="stable"
            className="md:h-28 lg:h-32 xl:h-36 aspect-[4/3]"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
