// src/hooks/useForecast.tsx
import { useState, useEffect } from "react";
import { Coordinates, ForecastData } from "../types/weather";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const useForecast = (coordinates: Coordinates) => {
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForecast = async () => {
      if (!coordinates.lat || !coordinates.lon) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const hourlyResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&lang=vi&appid=${API_KEY}`
        );
        
        if (!hourlyResponse.ok) {
          throw new Error(`Hourly forecast API error: ${hourlyResponse.statusText}`);
        }
        
        const hourlyData = await hourlyResponse.json();
        
        const dailyResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${coordinates.lat}&lon=${coordinates.lon}&cnt=8&units=metric&lang=vi&appid=${API_KEY}`
        );
        
        if (!dailyResponse.ok) {
          throw new Error(`Daily forecast API error: ${dailyResponse.statusText}`);
        }
        
        const dailyData = await dailyResponse.json();
        
        const hourlyForecasts = hourlyData.list.map((item: any) => ({
          dt: item.dt,
          temperature: Math.round(item.main.temp),
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          humidity: item.main.humidity,
          windSpeed: item.wind.speed,
          date: new Date(item.dt * 1000),
          isDaily: false
        }));
        
        const dailyForecasts = dailyData.list.map((item: any) => ({
          dt: item.dt,
          temperature: Math.round(item.temp.day),
          min_temp: Math.round(item.temp.min),
          max_temp: Math.round(item.temp.max),
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          humidity: item.humidity,
          windSpeed: item.speed,
          date: new Date(item.dt * 1000),
          isDaily: true
        }));
        
        setForecast({
          city: dailyData.city.name,
          forecasts: hourlyForecasts,
          dailyForecasts: dailyForecasts
        });
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error("Forecast error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [coordinates.lat, coordinates.lon]);

  return { forecast, loading, error };
};

export default useForecast;