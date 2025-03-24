// src/types/weather.ts
export interface Coordinates {
  lat: number;
  lon: number;
}

export interface Province {
  name: string;
  coord: Coordinates;
  region?: string;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  description: string;
  icon: string;
  windSpeed?: number;
  pressure?: number;
  feelsLike?: number;
  sunrise?: number;
  sunset?: number;
  temp_min?: number;
  temp_max?: number;
  time?: number;
}

export interface ForecastItem {
  dt: number;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  date: Date;
  isDaily?: boolean;
  min_temp?: number;
  max_temp?: number;
}

export interface ForecastData {
  city: string;
  forecasts: ForecastItem[];
  dailyForecasts?: ForecastItem[];
}
export interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}