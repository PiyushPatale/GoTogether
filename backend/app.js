/* backend main app file with config */
const express = require('express');
const app = express();
const mongoose = require('mongoose');
var cors = require('cors')
const logger = require('morgan');
const parser = require('body-parser');
//const dotenv = //require('dotenv').config();
const passport = require("passport");
const users_routes = require('./api/routes/users');
const locations_routes = require('./api/routes/locations');
const bookings_routes = require('./api/routes/bookings');
const cars_routes = require('./api/routes/cars');
// dotenv.config();
const port = 7000;

app.use(cors());
app.use(express.json()); 

const db_uri = "mongodb+srv://sankalp:Sankalp@gotogether.wx8ww5v.mongodb.net/test?retryWrites=true&w=majority&appName=GoTogether"

// MongoDB Connection
const connectToMongo = async()=>{
    try{
        const databaseInstance=await mongoose.connect(db_uri);
        console.log(`MongoDB Connected !! DB Host : ${databaseInstance.connection.host}`);
    }
    catch(error){
        console.log("Database Connection Failed : " ,error);
        process.exit(1)
    }
}

connectToMongo();
mongoose.Promise = global.Promise;

app.listen(port , ()=>{
    console.log("App is running on " + port);
});


// Logger
app.use(logger('dev'));

// Parser and set file upload limit
app.use(parser.urlencoded({ limit: '4mb', extended: true }));
app.use(parser.json({limit: '4mb'}));

// CORS Handling
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

// Passport Middleware
app.use(passport.initialize());
require("./config/passport")(passport);

// Routes
app.use('/api/users', users_routes);
app.use('/api/locations', locations_routes);
app.use('/api/bookings', bookings_routes);
app.use('/api/cars', cars_routes);

// Error Handling
app.use((req, res, next) => {
    const error = new Error("Not Found 2");
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
            status: error.status
        }
    });
});

module.exports = app;
