const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = 'mongodb://127.0.0.1:27017/taskmanager';

// Connect to MongoDB
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

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/', taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
