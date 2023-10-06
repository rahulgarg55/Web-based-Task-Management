/*
  Task Controller

  This file contains controllers for handling tasks, including creation, updating, deletion,
  retrieval by ID, and retrieval of all tasks. It also includes a utility function for
  formatting date strings.

  Controllers:
  - createTask: Create a new task.
  - updateTaskById: Update a task by its ID.
  - deleteTaskById: Delete a task by its ID.
  - getTaskById: Retrieve a task by its ID.
  - getAllTasks: Retrieve all tasks.

*/

const Task = require('../models/Task');
const createError = require('http-errors');

const formatDate = (dateString) => {
  try {
    const [day, month, year] = dateString.split('-');
    return `${day}-${month}-${year}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString; 
  }
};


const createTask = async (req, res, next) => {
  try {
    console.log('Received request to create task:', req.body);
    if (!req.body.title || !req.body.description || !req.body.dueDate) {
      throw createError(400, 'Title, description, and dueDate are required');
    }

    const task = await Task.create(req.body);
    task.dueDate = formatDate(task.dueDate);

    res.status(201).json(task);
  } catch (error) {
    if (error instanceof createError.HttpError) {
      return next(error);
    } else {
      return next(createError(500, 'Error creating task'));
    }
  }
};


// Update a task by ID
const updateTaskById = async (req, res, next) => {
  try {
    // Check if required parameters exist in the request body
    if (!req.body.title || !req.body.description || !req.body.dueDate) {
      throw createError(400, 'Title, description, and dueDate are required');
    }

    const taskId = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { ...req.body, status: req.body.status },
      {
        new: true,
      }
    );

    if (!updatedTask) {
      throw createError(404, 'Task not found');
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    if (error instanceof createError.HttpError) {
      return next(error);
    } else {
      return next(createError(500, 'Error updating task'));
    }
  }
};

// Delete a task by ID
const deleteTaskById = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      throw createError(404, 'Task not found');
    }

    res.status(204).send();
  } catch (error) {
    if (error instanceof createError.HttpError) {
      return next(error);
    } else {
      return next(createError(500, 'Error deleting task'));
    }
  }
};

// Get a task by ID
const getTaskById = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) {
      throw createError(404, 'Task not found');
    }

    res.status(200).json(task);
  } catch (error) {
    if (error instanceof createError.HttpError) {
      return next(error);
    } else {
      return next(createError(500, 'Error fetching task'));
    }
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    if (error instanceof createError.HttpError) {
      return next(error);
    } else {
      return next(createError(500, 'Error fetching tasks'));
    }
  }
};

module.exports = {
  createTask,
  updateTaskById,
  deleteTaskById,
  getTaskById,
  getAllTasks, 
};