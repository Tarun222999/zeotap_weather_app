

Real-Time Data Processing System for
 Weather Monitoring with Rollups and Aggregates

## Architecure
![diagram-export-10-23-2024-7_47_21-PM](https://github.com/user-attachments/assets/2816dde6-8389-4511-97ad-d8df698fbe8f)

##Visual Overview


1.Weather Report Overview based on Selected City

![Screenshot 2024-10-23 191710](https://github.com/user-attachments/assets/719c2479-9947-44f8-b254-ec7a895fd856)

2.Modal To add User Thresholds

![Screenshot 2024-10-23 191734](https://github.com/user-attachments/assets/ba5203a0-d15e-4b75-a553-d16fc9490dd5)


## Features

1.Weather Daily Summary and Current Weather Report In Real Time

2.User Defined Thresholds to send Emails from the server

3.websocket server to emit the events in real time
 


## Tech Stack


**Language:** Javascript

**Server:** Node, Express,Websockets,Nodemailer

**Database:** Mongodb

**Frontend:** React,Tailwind,ShadcnUI





## Run Locally

Clone the project

```bash
 https://github.com/Tarun222999/zeotap_weather_app
```
Move to the backend folder
```bash
 cd backend 
```

Add the .env file in backend folder
```bash
PORT=
MONGO_URI=
WEATHER_API_KEY=
NODE_CODE_SENDING_EMAIL_ADDRESS=
NODE_CODE_SENDING_EMAIL_PASSWORD=
```


Install dependencies in  backend

```bash
  npm install
```

Start the server by running

```bash
  npm run dev
```

Move to the frontend folder
```bash
 cd frontend 
```




Install dependencies in  frontend

```bash
  npm install
```

Start the client by running

```bash
  npm run dev
```
