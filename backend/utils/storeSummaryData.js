import Weather from '../models/weatherModel.js';
import DailyWeatherSummary from '../models/weatherSummaryModel.js'

import { getIo } from '../config/socketConfig.js';

// Function to calculate daily weather aggregates for a city
const calculateDailySummary = async (city) => {
    try {
        // Get today's date (only YYYY-MM-DD part)
        const today = new Date().toISOString().split('T')[0];

        const startOfDay = Math.floor(new Date(`${today}T00:00:00Z`).getTime() / 1000); // Convert to seconds
        const endOfDay = Math.floor(new Date(`${today}T23:59:59Z`).getTime() / 1000); // Convert to seconds

        // Fetch all weather data for the city and today, using Unix timestamps for comparison
        const weatherData = await Weather.find({
            city: city,
            dt: {
                $gte: startOfDay,
                $lt: endOfDay
            }
        });




        if (weatherData.length === 0) {
            console.log(`No data available for ${city} on ${today}`);
            return;
        }



        // Calculate aggregates
        const temperatures = weatherData.map(data => data.main.temp);
        const conditions = weatherData.map(data => data.weather[0].main); // Get weather conditions

        const avg_temp = temperatures.reduce((acc, temp) => acc + temp, 0) / temperatures.length;
        const max_temp = Math.max(...temperatures);
        const min_temp = Math.min(...temperatures);

        // Determine dominant condition
        const conditionFrequency = conditions.reduce((acc, condition) => {
            acc[condition] = (acc[condition] || 0) + 1;
            return acc;
        }, {});
        const dominant_condition = Object.keys(conditionFrequency).reduce((a, b) => conditionFrequency[a] > conditionFrequency[b] ? a : b);

        // Store daily summary
        const dailySummary = new DailyWeatherSummary({
            city,
            date: new Date(today),
            avg_temp,
            max_temp,
            min_temp,
            dominant_condition
        });

        await dailySummary.save();

        // Emit the new weather data to all connected clients
        const io = getIo(); // Get the initialized 'io' instance
        io.emit('dailySummaryUpdate', dailySummary); // Emit the event with the weather data
        console.log(`Daily summary for ${city} saved successfully!`);

    } catch (error) {
        console.error('Error calculating daily summary:', error);
    }
};

export default calculateDailySummary;
