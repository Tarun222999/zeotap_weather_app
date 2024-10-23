import User from '../models/userModel.js'; // Assuming this is the User model
import { sendThresholdAlert } from './sendThresholdEmails.js';

export async function checkWeatherAndNotify(city, weatherData) {
    try {
        const users = await User.find({ city });

        users.forEach(async (user) => {
            const currentTemp = weatherData.main.temp_c; // Assuming the temperature is in Celsius
            const thresholdExceeded =
                (user.direction === 'above' && currentTemp > user.temperatureLimit) ||
                (user.direction === 'below' && currentTemp < user.temperatureLimit);

            if (thresholdExceeded) {
                // Increment curLimit if the condition is met
                user.curLimit += 1;
                await user.save();

                // Check if limit is exceeded, send alert
                if (user.curLimit > 2) {
                    sendThresholdAlert(user.email, city, currentTemp, user.temperatureLimit);
                    user.curLimit = 0; // Reset after alert
                    await user.save();
                }
            }
        });
    } catch (error) {
        console.log(error)
    }

}