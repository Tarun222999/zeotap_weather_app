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


import { addUser } from "./controllers/userController.js";
import { weatherResult } from "./controllers/weatherController.js";
const app = express();
const server = http.createServer(app);

// Initialize Socket.io with the server
initializeSocket(server);

connectDB()




app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/weather/:city', weatherResult);

app.post('/add-user', addUser);
const port = process.env.PORT || 8000
server.listen(port, () => {
    console.log('listening at 8000')
})