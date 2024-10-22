import mongoose from "mongoose";

const dailyWeatherSummarySchema = new mongoose.Schema({
  city: String,
  date: { type: Date, required: true },
  avg_temp: Number,
  max_temp: Number,
  min_temp: Number,
  dominant_condition: String
});

const DailyWeatherSummary = mongoose.model('DailyWeatherSummary', dailyWeatherSummarySchema);

export default DailyWeatherSummary;