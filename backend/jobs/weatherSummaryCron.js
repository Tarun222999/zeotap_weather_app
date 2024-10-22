import cron from 'node-cron'
import calculateDailySummary from '../utils/storeSummaryData.js';

// '59 23 * * *' '*/1 * * * *'
// Schedule daily aggregation at 11:59 PM
cron.schedule('59 23 * * *', async () => {
    console.log('Running daily aggregation...');

    const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
    for (const city of cities) {
        await calculateDailySummary(city);
    }
});