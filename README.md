# Distributed Notification and Alert System

## Overview
This project implements a backend notification system to handle real-time, scheduled, and personalized notifications. It supports various delivery channels and user preferences.

## Features
- **Real-Time Notifications**: High-priority notifications processed immediately.
- **Scheduled Notifications**: Stored in MongoDB and delivered based on `send_time`.
- **User Preferences**: Quiet hours, notification limits, and preferred channels.
- **Analytics API**: Provides stats on notifications sent, failed, and retried.
- **Dockerized Deployment**: Deploy with a single `docker-compose up`.

## Tech Stack
- **Backend**: Node.js
- **Database**: MongoDB
- **Messaging**: Kafka
- **Search**: Elasticsearch
- **Containerization**: Docker

## Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo.git
   cd your-repo

 ##Install dependencies:

bash
Copy code

npm install

Navigate to the src directory: After setting up the project, navigate to the src directory to start implementing or running the backend services:

cd src

##Run the application: You can run the application using the following command:

npm start

Dockerized Deployment
You can also run the application using Docker. This will start all necessary services in containers:

##Build and run the containers:

docker-compose up
To stop the containers, use:

bash
Copy code
docker-compose down
Configuration
Ensure that the .env file is properly configured with database and Kafka connection details.
The system uses MongoDB for data storage, so ensure MongoDB is accessible.

##License


In this version, I added a step after setting up the repository to ensure users are aware of navigating to the `src` directory. This will help guide them effectively through the setup process.

