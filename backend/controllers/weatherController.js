import Weather from "../models/weatherModel.js";
import DailyWeatherSummary from "../models/weatherSummaryModel.js";
export const weatherResult = async (req, res) => {
    const { city } = req.params;

    try {
        // Fetch current weather data
        const currentWeather = await Weather.findOne({ city }).sort({ dt: -1 });

        // Fetch daily summary data
        const today = new Date().toISOString().split('T')[0];
        const dailySummary = await DailyWeatherSummary.findOne({ city, date: today });

        res.status(200).json({
            current: currentWeather,
            dailySummary: dailySummary
        });
    } catch (error) {
        res.status(500).send('Error fetching weather data');
    }
}