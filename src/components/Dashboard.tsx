
import { useState, useEffect } from 'react';
import ParameterCard from './ParameterCard';
import AirQualityStatus from './AirQualityStatus';
import Location from './Location';
import DigitalClock from './DigitalClock';
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
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateRandomData();
      setData(newData);
      setAirQuality(calculateAirQuality(newData) as any);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex bg-gradient-to-br from-background to-secondary/50 p-8 overflow-hidden">
      {/* Left Section - Air Quality Status */}
      <div className="flex-1 pr-10 flex flex-col justify-between overflow-hidden">
        <div className="flex justify-between items-start">
          <Location location="Reception, Gravity's Office" className="mt-6" />
          <DigitalClock className="mt-6" />
        </div>
        
        <div className="flex flex-col items-start justify-center flex-1 pl-4">
          <AirQualityStatus status={airQuality} className="mb-8" />
          <p className="text-xl text-muted-foreground font-light animate-slide-up">
            Breathe better, live longer.
          </p>
        </div>
        
        <div className="flex justify-end">
          <p className="text-sm text-muted-foreground/70 animate-slide-up">
            Powered by SensorMagics™
          </p>
        </div>
      </div>
      
      {/* Separator */}
      <div className="mx-4 border-r border-border/40 h-full"></div>
      
      {/* Right Section - Parameter Cards */}
      <div className="w-2/5 grid grid-cols-2 gap-5 overflow-y-auto pr-2 pl-4">
        <ParameterCard 
          icon={<Thermometer size={20} />} 
          label="Temperature" 
          value={data.temperature} 
          unit="°C"
          trend="stable"
        />
        <ParameterCard 
          icon={<Droplets size={20} />} 
          label="Humidity" 
          value={data.humidity} 
          unit="%"
          trend="up"
        />
        <ParameterCard 
          icon={<Cloud size={20} />} 
          label="CO₂" 
          value={data.co2} 
          unit="ppm"
          color={Number(data.co2) > 1000 ? '#ff9f0a' : undefined}
          trend="up"
        />
        <ParameterCard 
          icon={<FlaskConical size={20} />} 
          label="VOC" 
          value={data.voc} 
          unit="ppb"
          trend="stable"
        />
        <ParameterCard 
          icon={<Wind size={20} />} 
          label="PM2.5" 
          value={data.pm25} 
          unit="μg/m³"
          color={Number(data.pm25) > 12 ? '#ff9f0a' : undefined}
          trend="down"
        />
        <ParameterCard 
          icon={<Wind size={20} />} 
          label="PM10" 
          value={data.pm10} 
          unit="μg/m³"
          trend="down"
        />
        <ParameterCard 
          icon={<Gauge size={20} />} 
          label="Barometric Pressure" 
          value={data.pressure} 
          unit="hPa"
          trend="stable"
        />
        <ParameterCard 
          icon={<AlertCircle size={20} />} 
          label="Carbon Monoxide" 
          value={data.co} 
          unit="ppm"
          color={Number(data.co) > 2 ? '#ff453a' : undefined}
          trend="stable"
        />
        <ParameterCard 
          icon={<Sun size={20} />} 
          label="Light" 
          value={data.light} 
          unit="lux"
          trend="down"
        />
        <ParameterCard 
          icon={<Volume2 size={20} />} 
          label="Noise" 
          value={data.noise} 
          unit="dB"
          trend="stable"
        />
      </div>
    </div>
  );
};

export default Dashboard;
