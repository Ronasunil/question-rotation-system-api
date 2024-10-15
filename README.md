# question-rotation-system

# Project Setup Instructions

This document provides step-by-step instructions on how to set up and run the project.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Redis](https://redis.io/download)
- [Node.js](https://nodejs.org/en/download/)

## Setup Instructions

1. **Install Redis**

   - Make sure Redis is installed on your machine. You can follow the installation instructions on the Redis website.

2. **Start the Redis Server**

   - Once installed, start the Redis server by running the following command in your terminal:
     ```bash
     redis-server
     ```

3. **Configure Environment Variables**

   - Copy the sample environment configuration file:
     ```bash
     cp config.env.sample config.env
     ```
   - Edit the `config.env` file to set your environment variables as needed.

4. **Install Dependencies**

   - Navigate to your project directory and run the following command to install all necessary dependencies:
     ```bash
     npm install
     ```

5. **Seed the Database**
   - To add the necessary data to the database, run the following command:
     ```bash
     npm run seed
     ```

## API Endpoints

Once the setup is complete, you can use the following API endpoints:

1. **Configure Cycling Duration**

   - Use the following GET request to configure cycling duration:
     ```http
     GET http://localhost:3000/api/v1/cycles/:cycleId
     ```
   - Replace `:cycleId` with the actual cycle ID you wish to configure.

2. **Get Questions**
   - Use the following GET request to retrieve questions for a specific user:
     ```http
     GET http://localhost:3000/api/v1/questions/user/670e551271a312c778446457
     ```

## Conclusion

Follow the above steps to successfully set up the project and utilize the API endpoints. If you encounter any issues, please refer to the documentation or reach out for support.
