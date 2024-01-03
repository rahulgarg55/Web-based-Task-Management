/*
  Task Routes

  This file defines the routes for managing tasks using the Express.js framework.
  It includes routes for creating, updating, deleting, and fetching tasks.

  Routes:
  - POST /tasks: Create a new task.
  - PUT /tasks/:id: Update a task by its ID.
  - DELETE /tasks/:id: Delete a task by its ID.
  - GET /tasks/:id: Get a task by its ID.
  - GET /tasks: Get all tasks.

*/
const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const {
    createTask,
    updateTaskById,
    deleteTaskById,
    getTaskById,
    getAllTasks,
} = require('../controllers/taskController');

// Error handling middleware
router.use((err, req, res, next) => {
    if (err instanceof createError.HttpError) {
        return res.status(err.statusCode).json({ error: err.message });
    }
    res.status(500).json({ error: 'Internal Server Error' });
});

// routes
router.post('/tasks', createTask)
.put('/tasks/:id', updateTaskById)
.delete('/tasks/:id', deleteTaskById)
.get('/tasks/:id', getTaskById)
.get('/tasks', getAllTasks);

module.exports = router;

