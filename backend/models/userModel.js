import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true }, // City user is interested in
    temperatureLimit: { type: Number, required: true }, // Threshold temperature (e.g., 35°C)
    curLimit: { type: Number, default: 0 }, // Tracks how many times the limit is exceeded
    direction: { type: String, enum: ['above', 'below'], required: true } // Whether to trigger on 'above' or 'below' the threshold
});

const User = mongoose.model('User', userSchema);
export default User;