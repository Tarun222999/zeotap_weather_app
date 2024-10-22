import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema({
    name: String,
    coord: {
        lon: Number,
        lat: Number,
    },
    main: {
        temp: Number,
        temp_c: Number,
        feels_like: Number,
    },
    weather: [
        {
            id: Number,
            main: String,
            description: String,
        }
    ],
    dt: Number, // Unix timestamp
    city: String, // City name (e.g., Delhi, Mumbai, etc.)
});

const Weather = mongoose.model('Weather', weatherSchema);

export default Weather;
