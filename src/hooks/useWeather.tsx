import { useState, useEffect } from "react";
import { Coordinates, WeatherData } from "../types/weather";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const useWeather = (coordinates: Coordinates) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!coordinates.lat || !coordinates.lon) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&lang=vi&appid=${API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error(`Weather API error: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        setWeather({
          temperature: Math.round(data.main.temp),
          humidity: data.main.humidity,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          windSpeed: data.wind.speed,
          pressure: data.main.pressure,
          feelsLike: Math.round(data.main.feels_like),
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          temp_min: Math.round(data.main.temp_min),
          temp_max: Math.round(data.main.temp_max),
          time: data.dt,
        });
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [coordinates.lat, coordinates.lon]);

  return { weather, loading, error };
};

export default useWeather;