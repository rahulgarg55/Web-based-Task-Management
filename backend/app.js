/*

  This is the main file for the Task Manager API built with Express.js and MongoDB.
  It includes configuration for MongoDB connection, middleware setup, and route handling.

*/

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors'); 
const taskRoutes = require('./routes/taskRoutes');

const mongoURI = 'mongodb://127.0.0.1:27017/taskmanager';


mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

    app.use(cors()); 
app.use(bodyParser.json());

app.use('/', taskRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
