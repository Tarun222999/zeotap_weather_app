import axios from "axios";
import dotenv from 'dotenv'
dotenv.config()
// Fetch weather data from OpenWeatherMap API for a specific city
const fetchWeatherData = async (lat, lon) => {
    try {
        const apiKey = process.env.WEATHER_API_KEY; // Replace with your OpenWeatherMap API key
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        const response = await axios.get(url);
        return response.data; // Return the fetched weather data
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};

export default fetchWeatherData;
