import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Thermometer } from "lucide-react";
import TemperatureThresholdModal from './components/thresholdComponent';

const socket = io('http://localhost:8000');

const App = () => {
  const [city, setCity] = useState('Delhi');
  const [weatherData, setWeatherData] = useState(null);
  const [dailySummary, setDailySummary] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/weather/${city}`);
        setWeatherData(response.data.current);
        setDailySummary(response.data.dailySummary);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [city]);

  useEffect(() => {
    socket.on('weatherUpdate', (newWeatherData) => {
      console.log(newWeatherData.city)
      if (newWeatherData.city === city) {
        console.log(newWeatherData)
        setWeatherData(newWeatherData);
      }
    });

    socket.on('dailySummaryUpdate', (newSummaryData) => {
      if (newSummaryData.city === city) {
        setDailySummary(newSummaryData);
      }
    });

    return () => {
      socket.off('weatherUpdate');
      socket.off('dailySummaryUpdate');
    };
  }, [city]);

  const cities = [
    "Delhi", "Mumbai", "Chennai", "Bangalore", "Kolkata", "Hyderabad"
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col items-center space-y-8">
          <div className="flex items-center justify-between w-full space-y-3">
            <h1 className="text-4xl font-bold text-blue-100">
              Weather Dashboard
            </h1>
            <TemperatureThresholdModal selectedCity={city} />
          </div>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="w-48 bg-slate-900 border-slate-800 ">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-800">
              {cities.map((cityName) => (
                <SelectItem key={cityName} value={cityName} className="hover:bg-slate-800 text-gray-100">
                  {cityName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Current Weather Card */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-blue-100">
                <span>Current Weather</span>
                {weatherData?.weather?.[0]?.icon && (
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt={weatherData.weather[0].description}
                    className="w-16 h-16"
                  />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {weatherData ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Thermometer className="h-5 w-5 text-blue-400" />
                      <div>
                        <p className="text-sm text-slate-400">Temperature</p>
                        <p className="text-3xl font-bold text-blue-100">
                          {Math.round(weatherData.main.temp_c)}°C
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Feels Like</p>
                      <p className="text-3xl font-bold text-blue-100">
                        {Math.round(weatherData.main.feels_like) - 273}°C
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Condition</p>
                    <p className="text-xl capitalize text-blue-100">
                      {weatherData.weather[0].description}
                    </p>
                  </div>
                  <div className="text-sm text-slate-400 space-y-1">
                    <p>Location: {weatherData.coord.lon}°, {weatherData.coord.lat}°</p>
                    <p>Last Updated: {new Date(weatherData.dt * 1000).toLocaleString()}</p>
                  </div>
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center">
                  <p className="text-slate-400">Loading weather data...</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Daily Summary Card */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-blue-100">
                <span>Daily Summary</span>
                {dailySummary?.dominant_icon && (
                  <img
                    src={`https://openweathermap.org/img/wn/${dailySummary.dominant_icon}@2x.png`}
                    alt="Dominant weather condition"
                    className="w-16 h-16"
                  />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {dailySummary ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-400">Average</p>
                      <p className="text-3xl font-bold text-blue-100">
                        {Math.round(dailySummary.avg_temp)}°C
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Maximum</p>
                      <p className="text-3xl font-bold text-blue-100">
                        {Math.round(dailySummary.max_temp)}°C
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Minimum</p>
                    <p className="text-3xl font-bold text-blue-100">
                      {Math.round(dailySummary.min_temp)}°C
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Dominant Weather</p>
                    <p className="text-xl capitalize text-blue-100">
                      {dailySummary.dominant_condition}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center">
                  <p className="text-slate-400">Loading summary...</p>
                </div>
              )}
            </CardContent>
          </Card>


        </div>
      </div>
    </div>
  );
};

export default App;