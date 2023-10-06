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
const {
    createTask,
    updateTaskById,
    deleteTaskById,
    getTaskById,
    getAllTasks,
} = require('../controllers/taskController');

const createError = require('http-errors');

router.use((err, req, res, next) => {
    if (err instanceof createError.HttpError) {
        res.status(err.statusCode).json({ error: err.message });
    } else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/tasks', createTask);

router.put('/tasks/:id', updateTaskById);

router.delete('/tasks/:id', deleteTaskById);

router.get('/tasks/:id', getTaskById);

router.get('/tasks', getAllTasks);

module.exports = router;
