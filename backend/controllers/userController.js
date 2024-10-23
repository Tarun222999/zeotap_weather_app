

import User from "../models/userModel.js"
export const addUser = async (req, res) => {
    const { name, email, city, temperatureLimit, direction } = req.body;

    try {
        const newUser = new User({ name, email, city, temperatureLimit, direction });
        await newUser.save();
        res.status(201).json({ message: 'User added with temperature threshold.' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding user.' });
    }
}