import React, { useState } from "react";
import useWeather from "hooks/useWeather";
import useForecast from "hooks/useForecast";
import { Box, Page, Header, Text, Select } from "zmp-ui";
import vnProvinces from "static/vn_province.json";
import { Province } from "types/weather";
import { 
  FaTemperatureLow, 
  FaTint, 
  FaCompress, 
  FaWind,
  FaClock,
  FaSun,
  FaMoon,
  FaCalendarAlt
} from "react-icons/fa";

const WeatherPage = () => {
  const [selectedProvince, setSelectedProvince] = useState<Province | undefined>(
    vnProvinces.find(p => p.name === "Hà Nội")
  );
  
  const { weather, loading: weatherLoading, error: weatherError } = useWeather({
    lat: selectedProvince?.coord?.lat || 0,
    lon: selectedProvince?.coord?.lon || 0
  });

  const { forecast, loading: forecastLoading, error: forecastError } = useForecast({
    lat: selectedProvince?.coord?.lat || 0,
    lon: selectedProvince?.coord?.lon || 0
  });

  const handleProvinceChange = (value: string | number) => {
    const province = vnProvinces.find(p => p.name === value);
    if (province) {
      setSelectedProvince(province);
    }
  };

  const formatTime = (timestamp: number | undefined) => {
    if (!timestamp) return '';
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatHour = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDay = (date: Date) => {
    const days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    return days[date.getDay()];
  };

  const regionGroups = vnProvinces.reduce((groups, province) => {
    const region = province.region || "Khác";
    if (!groups[region]) {
      groups[region] = [];
    }
    groups[region].push(province);
    return groups;
  }, {} as Record<string, Province[]>);

  const getHourlyForecasts = () => {
    if (!forecast) return [];
    
    const now = new Date();
    return forecast.forecasts
      .filter(f => {
        const forecastTime = new Date(f.dt * 1000);
        return forecastTime > now && forecastTime < new Date(now.getTime() + 24 * 60 * 60 * 1000);
      })
      .slice(0, 8);
  };

  const getDayForecasts = () => {
    if (!forecast || !forecast.forecasts) return [];
  
    const dailyForecasts = forecast.forecasts.reduce((acc, curr) => {
      const date = new Date(curr.dt * 1000).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = {
          dt: curr.dt,
          temperature: curr.temperature,
          min_temp: curr.temperature,
          max_temp: curr.temperature,
          description: curr.description,
          icon: curr.icon,
        };
      } else {
        acc[date].min_temp = Math.min(acc[date].min_temp, curr.temperature);
        acc[date].max_temp = Math.max(acc[date].max_temp, curr.temperature);
      }
  
      return acc;
    }, {} as Record<string, any>);
  
    return Object.values(dailyForecasts).slice(1, 6);
  };

  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Header title="Thời tiết" className="bg-green-700 text-white text" />
      <Box className="py-4 overflow-x-hidden scrollable-content bg-sky-200">
        <Box className="mx-auto max-w-48">
          <Select
            value={selectedProvince?.name}
            onChange={handleProvinceChange}
            closeOnSelect={true}
            placeholder="Chọn tỉnh thành"
          >
            {Object.entries(regionGroups).map(([region, provinces]) => (
              <Select.OtpGroup key={region} label={region}>
                {provinces.map((province) => (
                  <Select.Option 
                    key={province.name} 
                    value={province.name}
                    title={province.name}
                  />
                ))}
              </Select.OtpGroup>
            ))}
          </Select>
        </Box>
        
        {weather && (
          <Box className="mt-4 py-4 justify-center">
            <Box className="flex-col items-center mb-2 justify-items-center">
                <img
                  src={`http://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                  alt="Weather Icon"
                  className="w-40 h-40 mt-[-3rem] mb-[-2rem]"
                />
                <Text className="text-2xl mb-2 font-medium text-neutral-700">
                  {weather.description.charAt(0).toUpperCase() + weather.description.slice(1)}
                </Text>
                <Box className="flex items-center">
                  <FaTemperatureLow className="mr-2 text-3xl font-medium text-red-600" />
                  <Text className="text-5xl mb-2 font-semibold text-neutral-700">{weather.temperature}°</Text>
                </Box>
            </Box>
            
            {/* Current weather grid */}
            <Box className="grid grid-rows-3 grid-cols-2 gap-2 px-3 mb-4">
              <Box className="flex-col items-center justify-items-center bg-gradient-to-b from-white to-sky-100 rounded-lg shadow-lg py-1">
                <Text className="text-base text-slate-700">
                  Thời gian
                </Text>
                <Box className="flex items-center justify-center">
                  <FaClock className="text-lime-500 mr-2" />
                  <Text className="text-lg text-zinc-800 font-medium">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </Box>
              </Box>

              <Box className="flex-col items-center justify-items-center bg-gradient-to-b from-white to-sky-100 rounded-lg shadow-lg py-1">
                <Text className="text-base text-slate-700">
                  Độ ẩm
                </Text>
                <Box className="flex items-center justify-center">
                  <FaTint className="text-blue-500 mr-2" />
                  <Text className="text-lg text-zinc-800 font-medium">
                    {weather.humidity}%
                  </Text>
                </Box>
              </Box>
              
              <Box className="flex-col items-center justify-items-center rounded-lg shadow-lg py-1 bg-gradient-to-b from-white to-sky-100">
                <Text className="text-base text-slate-700 ">
                  Áp suất
                </Text>
                <Box className="flex items-center justify-center">
                  <FaCompress className="text-zinc-500 mr-2" />
                  <Text className="text-lg text-zinc-800 font-medium">
                    {weather.pressure} hPa
                  </Text>
                </Box>
              </Box>
              
              <Box className="flex-col items-center justify-items-center bg-gradient-to-b from-white to-sky-100 rounded-lg shadow-lg py-1">
                <Text className="text-base text-slate-700 ">
                  Tốc độ gió
                </Text>
                <Box className="flex items-center justify-center">
                  <FaWind className="text-cyan-500 mr-2" />
                  <Text className="text-lg text-zinc-800 font-medium">
                    {weather.windSpeed} m/s
                  </Text>
                </Box>
              </Box>

              <Box className="flex-col items-center justify-items-center bg-gradient-to-b from-white to-sky-100 rounded-lg shadow-lg py-1">
                <Text className="text-base text-slate-700 ">
                  Mặt trời mọc
                </Text>
                <Box className="flex items-center justify-center">
                  <FaSun className="text-yellow-500 mr-2" />
                  <Text className="text-lg text-zinc-800 font-medium">
                    {formatTime(weather.sunrise)}
                  </Text>
                </Box>
              </Box>

              <Box className="flex-col items-center justify-items-center bg-gradient-to-b from-white to-sky-100 rounded-lg shadow-lg py-1">
                <Text className="text-base text-slate-700 ">
                  Mặt trời lặn
                </Text>
                <Box className="flex items-center justify-center">
                  <FaMoon className="text-indigo-500 mr-2" />
                  <Text className="text-lg text-zinc-800 font-medium">
                    {formatTime(weather.sunset)}
                  </Text>
                </Box>
              </Box>
            </Box>
            
            {forecast && (
              <Box className="mt-6">
                <Text className="pl-3 text-xl mb-2 text-neutral-700 flex items-center">
                  <FaClock className="mr-2 text-blue-600" />
                  Dự báo 24 giờ tới
                </Text>
                <Box className="flex overflow-x-auto py-2 px-2 scrollable-content">
                  {getHourlyForecasts().map((hourForecast, index) => (
                    <Box key={index} className="flex-shrink-0 w-20 bg-white rounded-lg shadow-md p-2 ml-1 mr-1 flex flex-col items-center">
                      <Text className="text-xs font-medium text-gray-700">
                        {formatHour(hourForecast.dt)}
                      </Text>
                      <img
                        src={`http://openweathermap.org/img/wn/${hourForecast.icon}.png`}
                        alt="Weather Icon"
                        className="w-10 h-10"
                      />
                      <Text className="text-sm font-semibold text-gray-800">{hourForecast.temperature}°</Text>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
            
            {/* 5-day forecast section */}
            {forecast && (
              <Box className="mt-6 px-3">
                <Text className="text-xl mb-2 text-neutral-700 flex items-center">
                  <FaCalendarAlt className="mr-2 text-green-600" />
                  Dự báo 5 ngày tới
                </Text>
                <Box className="flex flex-col gap-2">
                  {getDayForecasts().map((dayForecast, index) => (
                    <Box 
                      key={index} 
                      className="bg-white rounded-lg shadow-md p-3 flex items-center justify-between"
                    >
                      <Box className="flex items-center">
                        <Box className="mr-2 w-16 text-center">
                          <Text className="text-sm font-medium text-gray-700">
                            {formatDay(new Date(dayForecast.dt * 1000))}
                          </Text>
                          <Text className="text-xs text-gray-500">
                            {new Date(dayForecast.dt * 1000).getDate()}/{new Date(dayForecast.dt * 1000).getMonth() + 1}
                          </Text>
                        </Box>
                        
                        <img
                          src={`http://openweathermap.org/img/wn/${dayForecast.icon}.png`}
                          alt="Weather Icon"
                          className="w-12 h-12 mr-2"
                        />
                        
                        <Box className="flex-1">
                          <Text className="text-sm font-medium text-gray-700">
                            {dayForecast.description.charAt(0).toUpperCase() + dayForecast.description.slice(1)}
                          </Text>
                        </Box>
                      </Box>
                      
                      <Box className="flex flex-col items-center">
                        <Text className="text-lg font-semibold text-gray-800">{dayForecast.temperature}°</Text>
                        <Box className="flex gap-3">
                          <Text className="text-xs text-blue-500">{dayForecast.min_temp}°</Text>
                          <Text className="text-xs text-red-500">{dayForecast.max_temp}°</Text>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
            
            <Text className="text-sm mt-6 text-center text-gray-500">
              Vị trí: {selectedProvince?.coord?.lat.toFixed(2)}°N, {selectedProvince?.coord?.lon.toFixed(2)}°E
            </Text>
          </Box>
        )}
      </Box>
    </Page>
  );
};

export default WeatherPage;