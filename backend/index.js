import dotenv from "dotenv";
dotenv.config()
import connectDB from './config/dbConfig.js'
import express from 'express'
import cors from 'cors'
import http from 'http'

import { initializeSocket } from "./config/socketConfig.js";
//wather cron job
import './jobs/weatherCron.js'

//summary cron job
import './jobs/weatherSummaryCron.js'


const app = express();
const server = http.createServer(app);

// Initialize Socket.io with the server
initializeSocket(server);

connectDB()




app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/weather/:city', async (req, res) => {
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
});


const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log('listening at 8000')
})