import { getIo } from "../config/socketConfig.js";
import Weather from "../models/weatherModel.js";
import fetchWeatherData from './fetchWeatherData.js'

const storeWeatherData = async (lat, lon, city) => {
    try {
        const data = await fetchWeatherData(lat, lon);

        // Prepare the document to store in MongoDB
        const weatherDocument = new Weather({
            name: data.name,
            coord: data.coord,
            main: {
                temp: data.main.temp,
                temp_c: data.main.temp - 273.15, // Temperature in Celsius
                feels_like: data.main.feels_like,
            },
            weather: data.weather,
            dt: data.dt,
            city: city, // City name (e.g., Delhi, Mumbai, etc.)
        });

        // Save the document to MongoDB
        await weatherDocument.save();
        console.log(`Weather data for ${city} saved successfully!`);
        // Emit the new weather data to all connected clients
        const io = getIo(); // Get the initialized 'io' instance
        io.emit('weatherUpdate', weatherDocument); // Emit the event with the weather data

        return weatherDocument

    } catch (error) {
        console.error('Error storing weather data:', error);
    }
};

export default storeWeatherData;
