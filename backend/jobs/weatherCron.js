import cron from 'node-cron'
import storeWeatherData from '../utils/storeWeatherData.js'
import { checkWeatherAndNotify } from '../utils/notifyUsers.js';
// Define coordinates for the Indian metro cities
const cities = [
    { name: 'Delhi', lat: 28.6139, lon: 77.2090 },
    { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
    { name: 'Chennai', lat: 13.0827, lon: 80.2707 },
    { name: 'Bangalore', lat: 12.9716, lon: 77.5946 },
    { name: 'Kolkata', lat: 22.5726, lon: 88.3639 },
    { name: 'Hyderabad', lat: 17.3850, lon: 78.4867 }
];

// Schedule a cron job to run every 2 minutes
cron.schedule('*/2 * * * *', async () => {
    console.log('Cron job running every 2 minutes...');


    for (const city of cities) {
        const weatherData = await storeWeatherData(city.lat, city.lon, city.name); // Fetch weather data for each city
        await checkWeatherAndNotify(city.name, weatherData); // Check thresholds and send alerts
    }
});
