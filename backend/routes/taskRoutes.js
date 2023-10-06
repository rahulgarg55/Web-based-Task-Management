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
