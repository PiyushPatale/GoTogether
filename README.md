# GoTogether

**GoTogether** is a **web application** implemented on a **MERN Stack**.



## Features

- **Car Share Booking System** for customers:
  - Overview of Car Share System on landing page
    - Details about the system
    - FAQs
  - Ability to Create and Search trip as he want to go from one location to another
  - Account registration to keep track of customer's bookings
  - **Booking System:**
    - Search for available cars by a specified date range
    - Filter available cars in specified date range by car attributes and pickup/return location
    - Make bookings with desired car and time
    - View all of customer's bookings
    - Pickup and return car on booking dashboard when it's time, changing booking status
- **Car Share Admin System** for staff members:
  - Create/modify locations/car pickup/return spots with address
  - Create/modify user accounts
  - Create/modify cars bookings
  - View all of customers' bookings
  - Cancel customer's bookings but only when there is internal server error if occured in customer account.



## Installation

1. Make sure Node.js is installed on your machine.
2. MongoDB setup:
   1. Make sure MongoDB is installed and running on your machine.
   2. Leave credentials as blank.
   3. In your environment, export the MongoDB URI as variable `MONGO_URI` with `mongodb://localhost:27017` as the value
3. Clone repository from https://github.com/PiyushPatale/GoTogether to your desired folder.
4. To compile the backend code, run `npm install` in `backend/`.
5. To compile the frontend code, run `npm install` in `frontend/`.

### To run

1. Make sure MongoDB URI is set up as mentioned above.
2. To start the backend server, run `npm run server` in `backend/`.
3. To start the frontend server, run `npm start` in `frontend/`.

### Uninstallation

1. Stop the backend and frontend servers if they are still running.
2. Remove the folder containing the repository files and compiled source code.



## Code Structure

- `backend/` contains code for **Express.js** and also code for maintaining mongodb connection.
  - `api/` contains code for REST APIs, separated by models.
    - `controllers/` contains code for model db controllers.
    - `models/` contains code/schema for models.
    - `routes/` contains code for routing urls to `controllers`.
  - `app.js` contains code for **Express.js** configs such as routings, mongodb connection, CORS handling, etc.
  - `app_server.js` contains code for managing **Express.js** core configs such as listening port and http/s protocol.

- `frontend/` contains code for **React.js** for the frontend of the web application
