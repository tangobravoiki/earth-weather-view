
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Eye, Droplets, Thermometer } from "lucide-react";

interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  feelsLike: number;
  icon: string;
}

interface WeatherPanelProps {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  coordinates: { lat: number; lon: number } | null;
}

const getWeatherIcon = (iconCode: string) => {
  const iconMap: { [key: string]: any } = {
    '01d': Sun,
    '01n': Sun,
    '02d': Cloud,
    '02n': Cloud,
    '03d': Cloud,
    '03n': Cloud,
    '04d': Cloud,
    '04n': Cloud,
    '09d': CloudRain,
    '09n': CloudRain,
    '10d': CloudRain,
    '10n': CloudRain,
    '11d': CloudRain,
    '11n': CloudRain,
    '13d': CloudSnow,
    '13n': CloudSnow,
    '50d': Cloud,
    '50n': Cloud,
  };
  
  return iconMap[iconCode] || Cloud;
};

export default function WeatherPanel({ weatherData, loading, error, coordinates }: WeatherPanelProps) {
  if (!coordinates && !loading && !error) {
    return (
      <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
        <div className="text-center text-gray-600">
          <Cloud className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2">Weather Information</h3>
          <p>Click anywhere on the globe to get weather data for that location</p>
        </div>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-16 w-full" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 bg-red-50/90 backdrop-blur-sm border-red-200 shadow-xl">
        <div className="text-center text-red-600">
          <Cloud className="mx-auto mb-4 h-12 w-12" />
          <h3 className="text-lg font-semibold mb-2">Error Loading Weather</h3>
          <p className="text-sm">{error}</p>
          <p className="text-xs mt-2 text-gray-500">Try clicking another location</p>
        </div>
      </Card>
    );
  }

  if (!weatherData) return null;

  const WeatherIcon = getWeatherIcon(weatherData.icon);

  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-xl transition-all duration-300">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-1">{weatherData.location}</h2>
          <p className="text-sm text-gray-500">
            {coordinates?.lat.toFixed(2)}°, {coordinates?.lon.toFixed(2)}°
          </p>
        </div>

        {/* Main weather display */}
        <div className="flex items-center justify-center space-x-6">
          <WeatherIcon className="h-16 w-16 text-blue-500" />
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900">
              {Math.round(weatherData.temperature)}°C
            </div>
            <div className="text-lg text-gray-600 capitalize">
              {weatherData.description}
            </div>
            <div className="text-sm text-gray-500">
              Feels like {Math.round(weatherData.feelsLike)}°C
            </div>
          </div>
        </div>

        {/* Weather details grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-blue-50/50 rounded-lg">
            <Droplets className="h-5 w-5 text-blue-500" />
            <div>
              <div className="text-sm font-medium text-gray-900">{weatherData.humidity}%</div>
              <div className="text-xs text-gray-500">Humidity</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-green-50/50 rounded-lg">
            <Wind className="h-5 w-5 text-green-500" />
            <div>
              <div className="text-sm font-medium text-gray-900">{weatherData.windSpeed} m/s</div>
              <div className="text-xs text-gray-500">Wind Speed</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-purple-50/50 rounded-lg">
            <Eye className="h-5 w-5 text-purple-500" />
            <div>
              <div className="text-sm font-medium text-gray-900">{(weatherData.visibility / 1000).toFixed(1)} km</div>
              <div className="text-xs text-gray-500">Visibility</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-orange-50/50 rounded-lg">
            <Thermometer className="h-5 w-5 text-orange-500" />
            <div>
              <div className="text-sm font-medium text-gray-900">{weatherData.pressure} hPa</div>
              <div className="text-xs text-gray-500">Pressure</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
