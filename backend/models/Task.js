/*
  Task Model

  This file defines the Mongoose schema for tasks. Each task has properties including title,
  description, due date, and status.

  Schema:
  - title: The title of the task (String, required).
  - description: The description of the task (String, required).
  - dueDate: The due date of the task (String, required).
  - status: The status of the task (Boolean, default: false).

*/
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('tasks', taskSchema);
