
import { useState } from 'react';
import { Vector3 } from 'three';
import Globe from '@/components/Globe';
import WeatherPanel from '@/components/WeatherPanel';
import { useWeather } from '@/hooks/useWeather';

const Index = () => {
  const [selectedPosition, setSelectedPosition] = useState<Vector3 | undefined>();
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);
  const { weatherData, loading, error, fetchWeather } = useWeather();

  const handleLocationClick = (lat: number, lon: number, position: Vector3) => {
    console.log(`Location clicked: ${lat}, ${lon}`);
    setSelectedPosition(position);
    setCoordinates({ lat, lon });
    fetchWeather(lat, lon);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Background stars effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 right-1/2 w-1 h-1 bg-white rounded-full animate-pulse delay-1500"></div>
      </div>

      <div className="container mx-auto px-4 py-8 h-screen relative z-10">
        <div className="grid lg:grid-cols-3 gap-8 h-full">
          {/* Header */}
          <div className="lg:col-span-3 text-center mb-4">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              Earth Weather Explorer
            </h1>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Discover real-time weather conditions anywhere on Earth. Click on any location to explore!
            </p>
          </div>

          {/* Globe */}
          <div className="lg:col-span-2 h-[500px] lg:h-[600px] rounded-xl overflow-hidden shadow-2xl border border-blue-400/20">
            <Globe 
              onLocationClick={handleLocationClick}
              selectedPosition={selectedPosition}
            />
          </div>

          {/* Weather Panel */}
          <div className="lg:col-span-1 flex flex-col justify-center">
            <WeatherPanel 
              weatherData={weatherData}
              loading={loading}
              error={error}
              coordinates={coordinates}
            />
          </div>
        </div>
      </div>

      {/* Floating instructions */}
      <div className="absolute bottom-6 left-6 bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm border border-white/20">
        <p>🌍 Drag to rotate • 🔍 Scroll to zoom • 📍 Click to explore</p>
      </div>
    </div>
  );
};

export default Index;
